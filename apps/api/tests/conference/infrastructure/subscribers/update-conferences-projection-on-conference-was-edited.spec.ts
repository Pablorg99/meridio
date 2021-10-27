import { ConferenceDTO } from '@meridio/contracts';

import { ConferenceIdNotFoundError } from '../../../../src/conference/domain';
import { UpdateConferencesProjectionOnConferenceWasEdited } from '../../../../src/conference/infrastructure';
import { ConferenceWasEditedMother } from '../../domain/mother/conference-was-edited.mother';
import { ConferencesMockProjection } from '../../mock/conferences-projection.mock';

describe('UpdateConferencesProjectionOnConferenceWasEdited', function () {
  it('should update the right conference with the event data', async function () {
    const event = ConferenceWasEditedMother.random();
    const conferences = new ConferencesMockProjection({ onExists: true });
    const viewUpdater = new UpdateConferencesProjectionOnConferenceWasEdited(conferences);

    await viewUpdater.handle(event);

    const expectedDto: ConferenceDTO = {
      id: event.id,
      ownerId: event.ownerId,
      name: event.name,
      slug: event.slug,
      place: event.place,
      startDate: new Date(event.startDate).toISOString().split('T')[0],
      endDate: new Date(event.endDate).toISOString().split('T')[0],
      isLandingPageOpen: event.isLandingPageOpen,
      isCallForPapersOpen: event.isCallForPapersOpen,
      isTicketSalesOpen: event.isTicketSalesOpen,
    };

    expect(conferences.updateSpy).toHaveBeenCalledWith(expectedDto);
  });

  it('should throw an error if the conference to update does not exist', async function () {
    const event = ConferenceWasEditedMother.random();
    const conferences = new ConferencesMockProjection({ onExists: false });
    const viewUpdater = new UpdateConferencesProjectionOnConferenceWasEdited(conferences);

    await expect(viewUpdater.handle(event)).rejects.toThrowError(ConferenceIdNotFoundError);
  });
});
