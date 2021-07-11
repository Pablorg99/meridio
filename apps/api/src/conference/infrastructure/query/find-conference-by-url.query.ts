import { IQuery } from '@nestjs/cqrs';

export class FindConferenceByUrlQuery implements IQuery {
  constructor(readonly url: string) {}
}
