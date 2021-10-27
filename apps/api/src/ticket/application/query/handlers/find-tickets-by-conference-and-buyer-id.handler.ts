import { TicketDTO } from '@meridio/contracts';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { TicketsProjection, ticketsProjection } from '../../../domain';
import { FindTicketsByConferenceAndBuyerId } from '../find-tickets-by-conference-and-buyer-id.query';

@QueryHandler(FindTicketsByConferenceAndBuyerId)
export class FindTicketsByConferenceAndBuyerIdQueryHandler
  implements IQueryHandler<FindTicketsByConferenceAndBuyerId, Array<TicketDTO>> {
  constructor(@Inject(ticketsProjection) private tickets: TicketsProjection) {}

  async execute(query: FindTicketsByConferenceAndBuyerId): Promise<Array<TicketDTO>> {
    return this.tickets.find(query.conferenceId, query.buyerId);
  }
}
