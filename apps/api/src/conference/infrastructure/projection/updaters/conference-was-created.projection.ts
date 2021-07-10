import { Inject } from '@nestjs/common';
import { IViewUpdater, ViewUpdaterHandler } from 'event-sourcing-nestjs';

import { ConferenceWasCreated } from '../../../domain';
import { ConferencesProjection, conferencesProjection } from '../conferences.projection';

@ViewUpdaterHandler(ConferenceWasCreated)
export class ConferenceWasCreatedProjection implements IViewUpdater<ConferenceWasCreated> {
  constructor(@Inject(conferencesProjection) private conferences: ConferencesProjection) {}

  async handle(event: ConferenceWasCreated) {
    await this.conferences.save({
      id: event.id,
      name: event.name,
      url: event.url,
      place: event.place,
      startDate: new Date(event.startDate).toISOString().split('T')[0],
      endDate: new Date(event.endDate).toISOString().split('T')[0],
      logoSource: event.logoSource,
      isLandingPageOpen: event.isLandingPageOpen,
      isCallForPapersOpen: event.isCallForPapersOpen,
      isTicketSalesOpen: event.isTicketSalesOpen,
    });
  }
}
