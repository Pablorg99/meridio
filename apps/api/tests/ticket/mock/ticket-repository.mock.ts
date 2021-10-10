import { Ticket, TicketRepository } from '../../../src/ticket/domain';

export class TicketMockRepository implements TicketRepository {
  readonly mockSave = jest.fn();

  async save(ticket: Ticket): Promise<void> {
    this.mockSave(ticket);
  }
}
