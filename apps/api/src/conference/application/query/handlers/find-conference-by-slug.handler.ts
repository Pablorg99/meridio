import { ConferenceDTO } from '@meridio/contracts';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import {
  ConferenceSlug,
  ConferenceSlugNotFoundError,
  ConferencesProjection,
  conferencesProjection,
  Criteria,
  LandingPageClosedError,
} from '../../../domain';
import { FindConferenceBySlugQuery } from '../find-conference-by-slug.query';

@QueryHandler(FindConferenceBySlugQuery)
export class FindConferenceBySlugHandler implements IQueryHandler<FindConferenceBySlugQuery, ConferenceDTO> {
  constructor(@Inject(conferencesProjection) private conferences: ConferencesProjection) {}

  async execute(query: FindConferenceBySlugQuery) {
    const slug = ConferenceSlug.fromString(query.slug);
    const conference = await this.conferences.find(new Criteria({ slug }));

    if (!conference) {
      throw new ConferenceSlugNotFoundError(query.slug);
    }

    if (!conference.isLandingPageOpen) {
      throw new LandingPageClosedError(conference.id);
    }

    return conference;
  }
}
