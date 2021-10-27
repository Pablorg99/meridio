import { Inject } from '@nestjs/common';
import { IViewUpdater, ViewUpdaterHandler } from 'event-sourcing-nestjs';

import { ConferencesProjection, conferencesProjection, ConferenceWasCreated } from '../../domain';

@ViewUpdaterHandler(ConferenceWasCreated)
export class UpdateConferencesProjectionOnConferenceWasCreated implements IViewUpdater<ConferenceWasCreated> {
  constructor(@Inject(conferencesProjection) private conferences: ConferencesProjection) {}

  async handle(event: ConferenceWasCreated) {
    await this.conferences.save({
      id: event.id,
      ownerId: event.ownerId,
      name: event.name,
      slug: event.slug,
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
