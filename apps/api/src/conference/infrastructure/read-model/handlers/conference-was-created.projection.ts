import { Inject } from '@nestjs/common';
import { IViewUpdater, ViewUpdaterHandler } from 'event-sourcing-nestjs';
import { Model } from 'mongoose';

import { ConferenceWasCreated } from '../../../domain';
import { ConferenceProjection, conferenceProjection } from '../conference.projection';

@ViewUpdaterHandler(ConferenceWasCreated)
export class ConferenceWasCreatedProjection implements IViewUpdater<ConferenceWasCreated> {
  constructor(@Inject(conferenceProjection) private projection: Model<ConferenceProjection>) {}

  async handle(event: ConferenceWasCreated): Promise<void> {
    await this.projection.create({
      _id: event.id,
      name: event.name,
      url: event.url,
      place: event.place,
      startDate: event.startDate,
      endDate: event.endDate,
      logoSource: event.logoSource,
    });
  }
}
