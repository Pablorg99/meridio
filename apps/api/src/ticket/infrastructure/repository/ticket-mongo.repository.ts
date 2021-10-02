import { Injectable } from '@nestjs/common';
import { StoreEventPublisher } from 'event-sourcing-nestjs';

import { Ticket, TicketRepository } from '../../domain';

@Injectable()
export class TicketMongoRepository implements TicketRepository {
  constructor(private readonly publisher: StoreEventPublisher) {}

  async save(ticket: Ticket): Promise<void> {
    ticket = this.publisher.mergeObjectContext(ticket);
    ticket.commit();
  }
}
