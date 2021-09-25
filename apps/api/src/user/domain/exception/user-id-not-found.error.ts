import { UserId } from '../../../shared/domain';

export class UserIdNotFoundError extends Error {
  public static with(userId: UserId): UserIdNotFoundError {
    return new UserIdNotFoundError(`User id ${userId.value} not found`);
  }
}
