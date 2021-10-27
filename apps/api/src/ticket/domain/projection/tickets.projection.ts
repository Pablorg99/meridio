import { TicketDTO } from '@meridio/contracts';

export interface TicketsProjection {
  save(ticket: TicketDTO): Promise<void>;

  find(conferenceId: string, buyerId?: string): Promise<Array<TicketDTO>>;
}

export const ticketsProjection = 'ticketsProjection';
