import { Proposal, ProposalRepository } from '../../../src/proposal/domain';

export class ProposalMockRepository implements ProposalRepository {
  readonly mockSave = jest.fn();

  async save(proposal: Proposal): Promise<void> {
    this.mockSave(proposal);
  }
}
