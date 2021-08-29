import { Inject } from '@nestjs/common';
import { IViewUpdater, ViewUpdaterHandler } from 'event-sourcing-nestjs';

import { ConferenceIdNotFoundError, ConferencesProjection, conferencesProjection, ConferenceWasEdited } from '../../domain';

@ViewUpdaterHandler(ConferenceWasEdited)
export class UpdateConferencesProjectionOnConferenceWasEdited implements IViewUpdater<ConferenceWasEdited> {
  constructor(@Inject(conferencesProjection) private conferences: ConferencesProjection) {}

  async handle(event: ConferenceWasEdited) {
    const conferenceDoesNotExist = !(await this.conferences.exists(event.id));
    if (conferenceDoesNotExist) {
      throw new ConferenceIdNotFoundError(event.id);
    }

    await this.conferences.update({
      id: event.id,
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
