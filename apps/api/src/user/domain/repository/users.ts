import { Nullable } from '@meridio/domain';

import { User } from '../model/user';
import { UserId } from '../model/user-id';
import { Username } from '../model/username';

export interface Users {
  find(userId: UserId): Promise<Nullable<User>>;

  findAll(): Promise<User[]>;

  findOneByUsername(username: Username): Promise<Nullable<User>>;

  save(user: User): void;
}

export const USERS = 'USERS';
