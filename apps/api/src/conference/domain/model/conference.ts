import { AggregateRoot } from '@nestjs/cqrs';

import { ConferenceWasCreated } from '../event/conference-was-created.event';
import { ConferenceDateRange } from './conference-date-range';
import { ConferenceId } from './conference-id';
import { ConferenceLogoSource } from './conference-logo-source';
import { ConferenceName } from './conference-name';
import { ConferencePlace } from './conference-place';
import { ConferenceUrl } from './conference-url';

export class Conference extends AggregateRoot {
  private _id: ConferenceId;
  private _name: ConferenceName;
  private _url: ConferenceUrl;
  private _place: ConferencePlace;
  private _dateRange: ConferenceDateRange;
  private _logoSource: ConferenceLogoSource | null;

  private constructor() {
    super();
  }

  public static create(params: {
    id: ConferenceId;
    name: ConferenceName;
    url: ConferenceUrl;
    place: ConferencePlace;
    dateRange: ConferenceDateRange;
    logoSource?: ConferenceLogoSource;
  }) {
    const conference = new Conference();
    const event = Conference.buildConferenceWasCreatedEvent(params);
    conference.apply(event);
    return conference;
  }

  private static buildConferenceWasCreatedEvent(params: {
    id: ConferenceId;
    name: ConferenceName;
    url: ConferenceUrl;
    place: ConferencePlace;
    dateRange: ConferenceDateRange;
    logoSource?: ConferenceLogoSource;
  }) {
    const id = params.id.value;
    const name = params.name.value;
    const url = params.url.value;
    const place = params.place.value;
    const startDate = params.dateRange.startDate;
    const endDate = params.dateRange.endDate;
    const logoSource = params.logoSource?.value;
    const event = new ConferenceWasCreated({ id, name, url, place, startDate, endDate, logoSource });
    return event;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get url() {
    return this._url;
  }

  get place() {
    return this._place;
  }

  get startDate() {
    return this._dateRange.startDate;
  }

  get endDate() {
    return this._dateRange.endDate;
  }

  get logoSource() {
    return this._logoSource;
  }

  private onConferenceWasCreated(event: ConferenceWasCreated) {
    this._id = ConferenceId.fromString(event.id);
    this._name = ConferenceName.fromString(event.name);
    this._url = ConferenceUrl.fromString(event.url);
    this._place = ConferencePlace.fromString(event.place);
    this._dateRange = ConferenceDateRange.fromStartAndEndDate(new Date(event.startDate), new Date(event.endDate));
    this._logoSource = event.logoSource ? ConferenceLogoSource.fromString(event.logoSource) : null;
  }
}
