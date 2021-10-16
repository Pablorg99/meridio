import { ProposalDTO } from '@meridio/contracts';

export interface ProposalsProjection {
  save(proposal: ProposalDTO): Promise<void>;
}

export const proposalsProjection = 'proposalsProjection';
