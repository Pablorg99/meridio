import { StorableEvent } from 'event-sourcing-nestjs';

export class UserWasCreated extends StorableEvent {
  eventAggregate = 'user';
  eventVersion = 1;

  readonly id: string;
  readonly fullName: string;
  readonly avatarUrl: string;

  constructor(params: { id: string; fullName: string; avatarUrl }) {
    super();
    this.id = params.id;
    this.fullName = params.fullName;
    this.avatarUrl = params.avatarUrl;
  }
}
