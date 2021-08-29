import { IQuery } from '@nestjs/cqrs';

export class FindConferenceByIdQuery implements IQuery {
  constructor(readonly id: string) {}
}
