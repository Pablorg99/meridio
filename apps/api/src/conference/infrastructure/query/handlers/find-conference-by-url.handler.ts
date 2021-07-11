import { ConferenceNotFound, LandingPageClosed } from '../../../domain';
import { ConferencesProjection } from '../../projection/conferences.projection';
import { FindConferenceByUrlQuery } from '../find-conference-by-url.query';

export class FindConferenceByUrlHandler {
  constructor(private conferences: ConferencesProjection) {}

  async execute(query: FindConferenceByUrlQuery) {
    const conference = await this.conferences.findByUrl(query.url);

    if (!conference) {
      throw new ConferenceNotFound(query.url);
    }

    if (!conference.isLandingPageOpen) {
      throw new LandingPageClosed(conference.id);
    }

    return conference;
  }
}
