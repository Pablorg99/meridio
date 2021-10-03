import { TicketDTO } from '@meridio/contracts';

export interface TicketsProjection {
  find(conferenceId: string): Promise<Array<TicketDTO>>;
}
