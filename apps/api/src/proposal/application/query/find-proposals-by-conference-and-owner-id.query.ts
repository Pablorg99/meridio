import { IQuery } from '@nestjs/cqrs';

export class FindProposalsByConferenceAndOwnerIdQuery implements IQuery {
  constructor(readonly conferenceId: string, readonly ownerId: string) {}
}
