import { Nullable } from '@meridio/domain';

import { UserId } from '../../../shared/domain';
import { User } from '../model';

export interface UserRepository {
  find(userId: UserId): Promise<Nullable<User>>;

  findAll(): Promise<User[]>;

  save(user: User): Promise<void>;

  remove(userId: UserId): Promise<void>;
}

export const userRepository = 'userRepository';
