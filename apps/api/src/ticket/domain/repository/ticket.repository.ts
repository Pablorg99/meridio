import { Ticket } from '../model';

export interface TicketRepository {
  save(ticket: Ticket): Promise<void>;
}

export const ticketRepository = 'ticketRepository';
