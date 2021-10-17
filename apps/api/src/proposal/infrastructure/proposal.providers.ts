import { proposalRepository, proposalsProjection } from '../domain';
import { ProposalsMongoProjection } from './projection';
import { ProposalMongoRepository } from './repository';

export const proposalProviders = [
  {
    provide: proposalRepository,
    useClass: ProposalMongoRepository,
  },
  { provide: proposalsProjection, useClass: ProposalsMongoProjection },
];
