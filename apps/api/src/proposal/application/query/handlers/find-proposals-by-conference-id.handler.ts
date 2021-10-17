import { ProposalDTO } from '@meridio/contracts';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { ProposalsProjection, proposalsProjection } from '../../../domain';
import { FindProposalsByConferenceIdQuery } from '../find-proposals-by-conference-id.query';

@QueryHandler(FindProposalsByConferenceIdQuery)
export class FindProposalsByConferenceIdHandler
  implements IQueryHandler<FindProposalsByConferenceIdQuery, Array<ProposalDTO>> {
  constructor(@Inject(proposalsProjection) private proposals: ProposalsProjection) {}

  async execute(query: FindProposalsByConferenceIdQuery): Promise<Array<ProposalDTO>> {
    return this.proposals.find(query.conferenceId);
  }
}
