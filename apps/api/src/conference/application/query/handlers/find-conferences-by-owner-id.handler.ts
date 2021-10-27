import { ConferenceDTO } from '@meridio/contracts';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { UserId } from '../../../../shared/domain';
import { ConferencesProjection, conferencesProjection, Criteria } from '../../../domain';
import { FindConferencesByOwnerIdQuery } from '../find-conferences-by-owner-id.query';

@QueryHandler(FindConferencesByOwnerIdQuery)
export class FindConferencesByOwnerIdHandler
  implements IQueryHandler<FindConferencesByOwnerIdQuery, Array<ConferenceDTO>> {
  constructor(@Inject(conferencesProjection) private conferences: ConferencesProjection) {}

  async execute(query: FindConferencesByOwnerIdQuery) {
    return this.conferences.find(new Criteria({ ownerId: UserId.fromString(query.ownerId) }));
  }
}
