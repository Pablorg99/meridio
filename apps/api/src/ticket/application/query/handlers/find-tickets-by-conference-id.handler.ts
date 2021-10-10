import { TicketDTO } from '@meridio/contracts';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { TicketsProjection, ticketsProjection } from '../../../domain';
import { FindTicketsByConferenceId } from '../find-tickets-by-conference-id.query';

@QueryHandler(FindTicketsByConferenceId)
export class FindTicketsByConferenceIdHandler implements IQueryHandler<FindTicketsByConferenceId, Array<TicketDTO>> {
  constructor(@Inject(ticketsProjection) private tickets: TicketsProjection) {}

  async execute(query: FindTicketsByConferenceId): Promise<Array<TicketDTO>> {
    return this.tickets.find(query.conferenceId);
  }
}
