import { IQuery } from '@nestjs/cqrs';

export class FindProposalsByConferenceIdQuery implements IQuery {
  constructor(readonly conferenceId: string) {}
}
