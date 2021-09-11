import { ConferenceDTO } from '@meridio/contracts';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import {
  ConferenceId,
  ConferenceIdNotFoundError,
  ConferencesProjection,
  conferencesProjection,
  Criteria,
} from '../../../domain';
import { FindConferenceByIdQuery } from '../find-conference-by-id.query';

@QueryHandler(FindConferenceByIdQuery)
export class FindConferenceByIdHandler implements IQueryHandler<FindConferenceByIdQuery, ConferenceDTO> {
  constructor(@Inject(conferencesProjection) private conferences: ConferencesProjection) {}

  async execute(query: FindConferenceByIdQuery) {
    const id = ConferenceId.fromString(query.id);
    const conference = await this.conferences.find(new Criteria({ id }));

    if (!conference) {
      throw new ConferenceIdNotFoundError(query.id);
    }

    return conference;
  }
}
