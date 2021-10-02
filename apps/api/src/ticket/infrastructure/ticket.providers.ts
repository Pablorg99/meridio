import { ticketRepository } from '../domain';
import { TicketMongoRepository } from './repository';

export const ticketProviders = [{ provide: ticketRepository, useClass: TicketMongoRepository }];
