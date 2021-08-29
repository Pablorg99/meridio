import { ConferenceDTO } from '@meridio/contracts';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import {
  ConferenceSlugNotFound,
  ConferencesProjection,
  conferencesProjection,
  LandingPageClosed,
} from '../../../domain';
import { FindConferenceBySlugQuery } from '../find-conference-by-slug.query';

@QueryHandler(FindConferenceBySlugQuery)
export class FindConferenceBySlugHandler implements IQueryHandler<FindConferenceBySlugQuery, ConferenceDTO> {
  constructor(@Inject(conferencesProjection) private conferences: ConferencesProjection) {}

  async execute(query: FindConferenceBySlugQuery) {
    const conference = await this.conferences.findBySlug(query.slug);

    if (!conference) {
      throw new ConferenceSlugNotFound(query.slug);
    }

    if (!conference.isLandingPageOpen) {
      throw new LandingPageClosed(conference.id);
    }

    return conference;
  }
}
