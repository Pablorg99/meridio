/* eslint-disable @typescript-eslint/no-unused-vars */
import { ProposalDTO } from '@meridio/contracts';

import { ProposalsProjection } from '../../../src/proposal/domain';

export class ProposalsMockProjection implements ProposalsProjection {
  readonly saveSpy = jest.fn();
  private readonly onFind: Array<ProposalDTO>;

  constructor(params?: { onFind?: Array<ProposalDTO> }) {
    this.onFind = params?.onFind || [];
  }

  async save(proposal: ProposalDTO): Promise<void> {
    this.saveSpy(proposal);
  }

  async find(conferenceId: string): Promise<Array<ProposalDTO>> {
    return this.onFind;
  }
}
