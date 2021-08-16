import { ConferenceDTO } from '@meridio/contracts';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { ConferenceIdNotFound } from '../../../domain';
import { ConferencesProjection, conferencesProjection } from '../../projection/conferences.projection';
import { FindConferenceByIdQuery } from '../find-conference-by-id.query';

@QueryHandler(FindConferenceByIdQuery)
export class FindConferenceByIdHandler implements IQueryHandler<FindConferenceByIdQuery, ConferenceDTO> {
  constructor(@Inject(conferencesProjection) private conferences: ConferencesProjection) {}

  async execute(query: FindConferenceByIdQuery) {
    const conference = await this.conferences.find(query.id);

    if (!conference) {
      throw new ConferenceIdNotFound(query.id);
    }

    return conference;
  }
}
