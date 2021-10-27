import { IQuery } from '@nestjs/cqrs';

export class FindTicketsByConferenceAndBuyerId implements IQuery {
  constructor(readonly conferenceId: string, readonly buyerId: string) {}
}
