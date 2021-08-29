import { IQuery } from '@nestjs/cqrs';

export class FindConferenceBySlugQuery implements IQuery {
  constructor(readonly slug: string) {}
}
