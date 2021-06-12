import { ConferenceDTO } from '@meridio/contracts';

import { ConferenceWasCreatedProjection } from '../../../../../src/conference/infrastructure/projection';
import { ConferenceWasCreatedMother } from '../../../domain/mother/conference-was-created.mother';
import { ConferencesMockProjection } from '../../../mock/conferences-projection.mock';

describe('ConferenceWasCreatedProjection', function () {
  it('should store a conference dto in the projection from event data', function () {
    const event = ConferenceWasCreatedMother.random();
    const conferences = new ConferencesMockProjection();
    const viewUpdater = new ConferenceWasCreatedProjection(conferences);

    viewUpdater.handle(event);

    const expectedDto: ConferenceDTO = {
      id: event.id,
      name: event.name,
      url: event.url,
      place: event.place,
      startDate: new Date(event.startDate).toISOString().split('T')[0],
      endDate: new Date(event.endDate).toISOString().split('T')[0],
    };

    expect(conferences.saveSpy).toHaveBeenCalledWith(expectedDto);
  });
});
