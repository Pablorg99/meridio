import { CreateConferenceDTOMother } from '@meridio/contracts';
import * as faker from 'faker';

import { ConferenceNotFound } from '../../../../../src/conference/domain';
import { FindConferenceByIdHandler, FindConferenceByIdQuery } from '../../../../../src/conference/infrastructure/query';
import { ConferencesMockProjection } from '../../../mock/conferences-projection.mock';

describe('FindConferenceByIdHandler', function () {
  it('should return a conference with the id of the query', async function () {
    const query = new FindConferenceByIdQuery(faker.datatype.uuid());
    const conferenceDTO = CreateConferenceDTOMother.withId(query.id);
    const conferences = new ConferencesMockProjection({ onFind: conferenceDTO });
    const handler = new FindConferenceByIdHandler(conferences);

    const foundConference = await handler.execute(query);

    expect(conferences.findSpy).toHaveBeenCalledWith(query.id);
    expect(foundConference.id).toBe(query.id);
  });

  it('should throw an error when the conference with the id of the query is not found', async function () {
    const query = new FindConferenceByIdQuery(faker.datatype.uuid());
    const conferences = new ConferencesMockProjection({ onFind: null });
    const handler = new FindConferenceByIdHandler(conferences);

    await expect(handler.execute(query)).rejects.toThrowError(ConferenceNotFound);
  });
});
