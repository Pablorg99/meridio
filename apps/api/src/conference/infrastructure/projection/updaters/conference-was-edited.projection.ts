import { Inject } from '@nestjs/common';
import { IViewUpdater, ViewUpdaterHandler } from 'event-sourcing-nestjs';

import { ConferenceNotFound, ConferenceWasEdited } from '../../../domain';
import { ConferencesProjection, conferencesProjection } from '../conferences.projection';

@ViewUpdaterHandler(ConferenceWasEdited)
export class ConferenceWasEditedProjection implements IViewUpdater<ConferenceWasEdited> {
  constructor(@Inject(conferencesProjection) private conferences: ConferencesProjection) {}

  async handle(event: ConferenceWasEdited) {
    const conferenceDoesNotExists = !(await this.conferences.exists(event.id));
    if (conferenceDoesNotExists) {
      throw new ConferenceNotFound(event.id);
    }

    await this.conferences.update({
      id: event.id,
      name: event.name,
      url: event.url,
      place: event.place,
      startDate: new Date(event.startDate).toISOString().split('T')[0],
      endDate: new Date(event.endDate).toISOString().split('T')[0],
      logoSource: event.logoSource,
    });
  }
}
