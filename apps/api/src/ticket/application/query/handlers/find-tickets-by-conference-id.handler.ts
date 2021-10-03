import { TicketDTO } from '@meridio/contracts';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { TicketsProjection } from '../../../domain';
import { FindTicketsByConferenceId } from '../find-tickets-by-conference-id.query';

@QueryHandler(FindTicketsByConferenceId)
export class FindTicketsByConferenceIdHandler implements IQueryHandler<FindTicketsByConferenceId, Array<TicketDTO>> {
  constructor(private tickets: TicketsProjection) {}

  async execute(query: FindTicketsByConferenceId): Promise<Array<TicketDTO>> {
    return this.tickets.find(query.conferenceId);
  }
}
