import { ProposalDTO } from '@meridio/contracts';

import { ProposalsProjection } from '../../../src/proposal/domain/projection/proposals.projection';

export class ProposalsMockProjection implements ProposalsProjection {
  readonly saveSpy = jest.fn();

  async save(proposal: ProposalDTO): Promise<void> {
    this.saveSpy(proposal);
  }
}
