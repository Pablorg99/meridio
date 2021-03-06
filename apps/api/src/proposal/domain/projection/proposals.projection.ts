import { ProposalDTO } from '@meridio/contracts';

export interface ProposalsProjection {
  save(proposal: ProposalDTO): Promise<void>;

  find(conferenceId: string, ownerId?: string): Promise<Array<ProposalDTO>>;
}

export const proposalsProjection = 'proposalsProjection';
