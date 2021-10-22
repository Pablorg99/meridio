import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { UserId } from '../../../shared/domain';
import { UserRepository, userRepository } from '../../domain';
import { UserWasDeleted } from '../../domain/event/user-was-deleted.event';

@EventsHandler(UserWasDeleted)
export class UserWasDeletedSaga implements IEventHandler<UserWasDeleted> {
  constructor(@Inject(userRepository) private repository: UserRepository) {}

  async handle(event: UserWasDeleted) {
    const user = await this.repository.find(UserId.fromString(event.id));

    if (!user) {
      return;
    }

    await this.repository.remove(user.id);
  }
}
