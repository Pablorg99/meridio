import { IQuery } from '@nestjs/cqrs';

export class FindTicketsByConferenceId implements IQuery {
  constructor(readonly conferenceId: string) {}
}
