import { ICommand } from '@nestjs/cqrs';

export class EditConferenceCommand implements ICommand {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
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
    slug: string;
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
    this.slug = params.slug;
    this.place = params.place;
    this.startDate = params.startDate;
    this.endDate = params.endDate;
    this.logoFile = params.logoFile;
    this.isLandingPageOpen = params.isLandingPageOpen;
    this.isCallForPapersOpen = params.isCallForPapersOpen;
    this.isTicketSalesOpen = params.isTicketSalesOpen;
  }
}
