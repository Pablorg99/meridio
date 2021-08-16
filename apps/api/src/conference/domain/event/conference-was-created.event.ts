import { StorableEvent } from 'event-sourcing-nestjs';

export class ConferenceWasCreated extends StorableEvent {
  eventAggregate = 'conference';
  eventVersion = 1;

  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly place: string;
  readonly startDate: number;
  readonly endDate: number;
  readonly logoSource?: string;
  readonly isLandingPageOpen: boolean;
  readonly isCallForPapersOpen: boolean;
  readonly isTicketSalesOpen: boolean;

  constructor(params: {
    id: string;
    name: string;
    slug: string;
    place: string;
    startDate: number;
    endDate: number;
    logoSource?: string;
    isLandingPageOpen: boolean;
    isCallForPapersOpen: boolean;
    isTicketSalesOpen: boolean;
  }) {
    super();
    this.id = params.id;
    this.name = params.name;
    this.slug = params.slug;
    this.place = params.place;
    this.startDate = params.startDate;
    this.endDate = params.endDate;
    this.logoSource = params.logoSource;
    this.isLandingPageOpen = params.isLandingPageOpen;
    this.isCallForPapersOpen = params.isCallForPapersOpen;
    this.isTicketSalesOpen = params.isTicketSalesOpen;
  }
}
