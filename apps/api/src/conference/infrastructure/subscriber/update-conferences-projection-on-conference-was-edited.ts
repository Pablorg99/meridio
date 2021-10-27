import { Inject } from '@nestjs/common';
import { IViewUpdater, ViewUpdaterHandler } from 'event-sourcing-nestjs';

import { ConferenceId } from '../../../shared/domain';
import {
  ConferenceIdNotFoundError,
  ConferencesProjection,
  conferencesProjection,
  ConferenceWasEdited,
  Criteria,
} from '../../domain';

@ViewUpdaterHandler(ConferenceWasEdited)
export class UpdateConferencesProjectionOnConferenceWasEdited implements IViewUpdater<ConferenceWasEdited> {
  constructor(@Inject(conferencesProjection) private conferences: ConferencesProjection) {}

  async handle(event: ConferenceWasEdited) {
    const id = ConferenceId.fromString(event.id);
    const conferenceDoesNotExist = !(await this.conferences.exists(new Criteria({ id })));
    if (conferenceDoesNotExist) {
      throw new ConferenceIdNotFoundError(event.id);
    }

    await this.conferences.update({
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
