import { ProposalDTO } from '@meridio/contracts';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { ProposalsProjection, proposalsProjection } from '../../../domain';
import { FindProposalsByConferenceAndOwnerIdQuery } from '../find-proposals-by-conference-and-owner-id.query';

@QueryHandler(FindProposalsByConferenceAndOwnerIdQuery)
export class FindProposalsByConferenceAndOwnerIdHandler
  implements IQueryHandler<FindProposalsByConferenceAndOwnerIdQuery, Array<ProposalDTO>> {
  constructor(@Inject(proposalsProjection) private proposals: ProposalsProjection) {}

  async execute(query: FindProposalsByConferenceAndOwnerIdQuery): Promise<Array<ProposalDTO>> {
    return this.proposals.find(query.conferenceId, query.ownerId);
  }
}
