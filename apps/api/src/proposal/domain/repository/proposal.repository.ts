import { Proposal } from '../model';

export interface ProposalRepository {
  save(proposal: Proposal): Promise<void>;
}

export const proposalRepository = 'proposalRepository';
