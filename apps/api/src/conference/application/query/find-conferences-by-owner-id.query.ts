import { IQuery } from '@nestjs/cqrs';

export class FindConferencesByOwnerIdQuery implements IQuery {
  constructor(readonly ownerId: string) {}
}
