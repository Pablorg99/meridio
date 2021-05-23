import { Injectable } from '@nestjs/common';
import { StoreEventPublisher } from 'event-sourcing-nestjs';

import { Conference, ConferenceRepository } from '../../domain';

@Injectable()
export class ConferenceMongoRepository implements ConferenceRepository {
  constructor(private publisher: StoreEventPublisher) {}

  async save(conference: Conference): Promise<void> {
    conference = this.publisher.mergeObjectContext(conference);
    conference.commit();
  }
}
