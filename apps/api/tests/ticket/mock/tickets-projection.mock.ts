/* eslint-disable @typescript-eslint/no-unused-vars */
import { TicketDTO } from '@meridio/contracts';

import { TicketsProjection } from '../../../src/ticket/domain';

export class TicketsMockProjection implements TicketsProjection {
  readonly saveSpy = jest.fn();
  private readonly onFind: Array<TicketDTO>;

  constructor(params?: { onFind?: Array<TicketDTO> }) {
    this.onFind = params?.onFind || [];
  }

  async save(ticket: TicketDTO): Promise<void> {
    this.saveSpy(ticket);
  }

  async find(conferenceId: string): Promise<Array<TicketDTO>> {
    return this.onFind;
  }
}
