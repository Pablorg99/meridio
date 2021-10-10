import { ticketRepository, ticketsProjection } from '../domain';
import { TicketsMongoProjection } from './projection';
import { TicketMongoRepository } from './repository';

export const ticketProviders = [
  { provide: ticketRepository, useClass: TicketMongoRepository },
  { provide: ticketsProjection, useClass: TicketsMongoProjection },
];
