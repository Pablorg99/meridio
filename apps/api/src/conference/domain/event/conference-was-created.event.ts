import { StorableEvent } from 'event-sourcing-nestjs';

export class ConferenceWasCreated extends StorableEvent {
  eventAggregate = 'conference';
  eventVersion = 1;

  readonly id: string;
  readonly name: string;
  readonly url: string;
  readonly place: string;
  readonly startDate: number;
  readonly endDate: number;
  readonly logoSource?: string;

  constructor(params: {
    id: string;
    name: string;
    url: string;
    place: string;
    startDate: number;
    endDate: number;
    logoSource?: string;
  }) {
    super();
    this.id = params.id;
    this.name = params.name;
    this.url = params.url;
    this.startDate = params.startDate;
    this.endDate = params.endDate;
    this.logoSource = params.logoSource;
  }
}
