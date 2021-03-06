import { Nullable } from '@meridio/domain';
import { Injectable } from '@nestjs/common';
import { EventStore, StoreEventPublisher } from 'event-sourcing-nestjs';

import { ConferenceId } from '../../../shared/domain';
import { Conference, ConferenceRepository } from '../../domain';

@Injectable()
export class ConferenceMongoRepository implements ConferenceRepository {
  constructor(private readonly publisher: StoreEventPublisher, private readonly events: EventStore) {}

  async save(conference: Conference): Promise<void> {
    conference = this.publisher.mergeObjectContext(conference);
    conference.commit();
  }

  async find(id: ConferenceId): Promise<Nullable<Conference>> {
    const events = await this.events.getEvents('conference', id.value);
    if (!events.length) {
      return null;
    }
    const conference: Conference = Reflect.construct(Conference, []);
    conference.loadFromHistory(events);
    return conference;
  }
}
