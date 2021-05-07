import { ICommand } from '@nestjs/cqrs';

export class CreateConferenceCommand implements ICommand {
  readonly id: string;
  readonly name: string;
  readonly url: string;
  readonly place: string;
  readonly startDate: Date;
  readonly endDate: Date;
  readonly logoFile?: FileList;

  constructor(params: {
    id: string;
    name: string;
    url: string;
    place: string;
    startDate: Date;
    endDate: Date;
    logoFile?: FileList;
  }) {
    this.id = params.id;
    this.name = params.name;
    this.url = params.url;
    this.place = params.place;
    this.startDate = params.startDate;
    this.endDate = params.endDate;
    this.logoFile = params.logoFile;
  }
}
