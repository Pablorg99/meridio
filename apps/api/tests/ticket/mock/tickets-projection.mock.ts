/* eslint-disable @typescript-eslint/no-unused-vars */
import { TicketDTO } from '@meridio/contracts';

import { TicketsProjection } from '../../../src/ticket/domain';

export class TicketsMockProjection implements TicketsProjection {
  private readonly onFind: Array<TicketDTO>;

  constructor(params?: { onFind?: Array<TicketDTO> }) {
    this.onFind = params?.onFind || [];
  }

  async find(conferenceId: string): Promise<Array<TicketDTO>> {
    return this.onFind;
  }
}
