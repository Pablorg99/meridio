import { ConferenceDTOMother } from '@meridio/contracts';
import * as faker from 'faker';

import { FindConferenceBySlugHandler, FindConferenceBySlugQuery } from '../../../../../src/conference/application';
import { ConferenceSlugNotFoundError, LandingPageClosedError } from '../../../../../src/conference/domain';
import { ConferencesMockProjection } from '../../../mock/conferences-projection.mock';

describe('FindConferenceBySlugHandler', function () {
  it('should return a conference with the slug of the query', async function () {
    const query = new FindConferenceBySlugQuery(faker.random.word());
    const conferenceDTO = ConferenceDTOMother.withLandingOpenAndSlug(query.slug);
    const conferences = new ConferencesMockProjection({ onFind: conferenceDTO });
    const handler = new FindConferenceBySlugHandler(conferences);

    const foundConference = await handler.execute(query);

    expect(foundConference.slug).toBe(query.slug);
  });

  it("should return a LandingPageNotOpen error when the found conference's landing is not open", async function () {
    const query = new FindConferenceBySlugQuery(faker.random.word());
    const conferenceDTO = ConferenceDTOMother.withLandingClosedAndSlug(query.slug);
    const conferences = new ConferencesMockProjection({ onFind: conferenceDTO });
    const handler = new FindConferenceBySlugHandler(conferences);

    await expect(handler.execute(query)).rejects.toThrowError(LandingPageClosedError);
  });

  it('should return a ConferenceNotFound error when there is no conference with the slug of the query', async function () {
    const query = new FindConferenceBySlugQuery(faker.random.word());
    const conferences = new ConferencesMockProjection({ onFind: null });
    const handler = new FindConferenceBySlugHandler(conferences);

    await expect(handler.execute(query)).rejects.toThrowError(ConferenceSlugNotFoundError);
  });
});
