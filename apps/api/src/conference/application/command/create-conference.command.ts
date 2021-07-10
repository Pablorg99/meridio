import { ICommand } from '@nestjs/cqrs';

export class CreateConferenceCommand implements ICommand {
  readonly id: string;
  readonly name: string;
  readonly url: string;
  readonly place: string;
  readonly startDate: Date;
  readonly endDate: Date;
  readonly logoFile?: FileList;
  readonly isLandingPageOpen: boolean;
  readonly isCallForPapersOpen: boolean;
  readonly isTicketSalesOpen: boolean;

  constructor(params: {
    id: string;
    name: string;
    url: string;
    place: string;
    startDate: Date;
    endDate: Date;
    logoFile?: FileList;
    isLandingPageOpen: boolean;
    isCallForPapersOpen: boolean;
    isTicketSalesOpen: boolean;
  }) {
    this.id = params.id;
    this.name = params.name;
    this.url = params.url;
    this.place = params.place;
    this.startDate = params.startDate;
    this.endDate = params.endDate;
    this.logoFile = params.logoFile;
    this.isLandingPageOpen = params.isLandingPageOpen;
    this.isCallForPapersOpen = params.isCallForPapersOpen;
    this.isTicketSalesOpen = params.isTicketSalesOpen;
  }
}
