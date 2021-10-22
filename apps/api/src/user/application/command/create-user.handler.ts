import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UserId } from '../../../shared/domain';
import {
  User,
  UserAvatarUrl,
  UserFullName,
  UserIdAlreadyTakenError,
  UserRepository,
  userRepository,
} from '../../domain';
import { CreateUserCommand } from './create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(@Inject(userRepository) private repository: UserRepository) {}

  async execute(command: CreateUserCommand) {
    const userId = UserId.fromString(command.id);

    if (await this.repository.find(userId)) {
      throw UserIdAlreadyTakenError.with(userId);
    }

    const user = User.add({
      id: userId,
      fullName: UserFullName.fromString(command.fullName),
      avatarUrl: UserAvatarUrl.fromUrl(command.avatarUrl),
    });

    await this.repository.save(user);
  }
}
