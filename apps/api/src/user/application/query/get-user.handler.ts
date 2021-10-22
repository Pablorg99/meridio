import { UserDTO } from '@meridio/contracts';
import { Nullable } from '@meridio/domain';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { UserId } from '../../../shared/domain';
import { UserRepository, userRepository } from '../../domain';
import { GetUserQuery } from './get-user.query';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(@Inject(userRepository) private repository: UserRepository) {}

  async execute(query: GetUserQuery): Promise<Nullable<UserDTO>> {
    const user = await this.repository.find(UserId.fromString(query.id));

    if (!user) {
      return null;
    }

    return {
      id: user.id.value,
      fullName: user.fullName.value,
      avatarUrl: user.avatarUrl.value,
      roles: user.roles.map((role) => role.value),
    };
  }
}
