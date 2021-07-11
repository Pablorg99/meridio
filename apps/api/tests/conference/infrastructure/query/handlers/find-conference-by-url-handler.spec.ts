import { ConferenceDTOMother } from '@meridio/contracts';
import * as faker from 'faker';

import { ConferenceNotFound, LandingPageClosed } from '../../../../../src/conference/domain';
import { FindConferenceByUrlHandler, FindConferenceByUrlQuery } from '../../../../../src/conference/infrastructure';
import { ConferencesMockProjection } from '../../../mock/conferences-projection.mock';

describe('FindConferenceByUrlHandler', function () {
  it('should return a conference with the url of the query', async function () {
    const query = new FindConferenceByUrlQuery(faker.internet.url());
    const conferenceDTO = ConferenceDTOMother.withLandingOpenAndUrl(query.url);
    const conferences = new ConferencesMockProjection({ onFind: conferenceDTO });
    const handler = new FindConferenceByUrlHandler(conferences);

    const foundConference = await handler.execute(query);

    expect(foundConference.url).toBe(query.url);
  });

  it("should return a LandingPageNotOpen error when the found conference's landing is not open", async function () {
    const query = new FindConferenceByUrlQuery(faker.internet.url());
    const conferenceDTO = ConferenceDTOMother.withLandingClosedAndUrl(query.url);
    const conferences = new ConferencesMockProjection({ onFind: conferenceDTO });
    const handler = new FindConferenceByUrlHandler(conferences);

    await expect(handler.execute(query)).rejects.toThrowError(LandingPageClosed);
  });

  it('should return a ConferenceNotFound error when there is no conference with the url of the query', async function () {
    const query = new FindConferenceByUrlQuery(faker.internet.url());
    const conferences = new ConferencesMockProjection({ onFind: null });
    const handler = new FindConferenceByUrlHandler(conferences);

    await expect(handler.execute(query)).rejects.toThrowError(ConferenceNotFound);
  });
});
