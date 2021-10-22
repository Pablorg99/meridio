import { UserDTO } from '@meridio/contracts';
import { Nullable } from '@meridio/domain';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { UserRepository,userRepository } from '../../domain';
import { GetUsersQuery } from './get-users.query';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  constructor(@Inject(userRepository) private repository: UserRepository) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(query: GetUsersQuery): Promise<Nullable<Array<UserDTO>>> {
    const users = await this.repository.findAll();

    return users.map((user) => ({
      id: user.id.value,
      fullName: user.fullName.value,
      avatarUrl: user.avatarUrl.value,
      roles: user.roles.map((role) => role.value),
    }));
  }
}
