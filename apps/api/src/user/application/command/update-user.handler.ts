import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UserId } from '../../../shared/domain';
import { Role, User, UserIdNotFoundError, UserRepository,userRepository } from '../../domain';
import { UpdateUserCommand } from './update-user.command';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(@Inject(userRepository) private repository: UserRepository) {}

  async execute(command: UpdateUserCommand) {
    const userId = UserId.fromString(command.userId);

    const user = await this.repository.find(userId);
    if (!user) {
      throw UserIdNotFoundError.with(userId);
    }

    this.updateRoles(user, command);

    await this.repository.save(user);
  }

  private updateRoles(user: User, command: UpdateUserCommand) {
    user.roles.map((role) => !command.roles.includes(role.value) && user.removeRole(role));
    command.roles.map((role) => user.addRole(Role.fromString(role)));
  }
}
