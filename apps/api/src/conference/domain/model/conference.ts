import { Nullable } from '@meridio/domain';
import { AggregateRoot } from '@nestjs/cqrs';

import { ConferenceWasCreated, ConferenceWasEdited } from '../event';
import { ConferenceDateRange } from './conference-date-range';
import { ConferenceId } from './conference-id';
import { ConferenceLogoSource } from './conference-logo-source';
import { ConferenceName } from './conference-name';
import { ConferencePlace } from './conference-place';
import { ConferenceSettings } from './conference-settings';
import { ConferenceSlug } from './conference-slug';

export class Conference extends AggregateRoot {
  private _id: ConferenceId;
  private _name: ConferenceName;
  private _slug: ConferenceSlug;
  private _place: ConferencePlace;
  private _dateRange: ConferenceDateRange;
  private _logoSource: Nullable<ConferenceLogoSource>;
  private _settings: ConferenceSettings;

  private constructor() {
    super();
  }

  public static create(params: {
    id: ConferenceId;
    name: ConferenceName;
    slug: ConferenceSlug;
    place: ConferencePlace;
    dateRange: ConferenceDateRange;
    logoSource?: ConferenceLogoSource;
    settings: ConferenceSettings;
  }) {
    const conference = new Conference();
    const event = Conference.buildConferenceWasCreatedEvent(params);
    conference.apply(event);
    return conference;
  }

  private static buildConferenceWasCreatedEvent(params: {
    id: ConferenceId;
    name: ConferenceName;
    slug: ConferenceSlug;
    place: ConferencePlace;
    dateRange: ConferenceDateRange;
    logoSource?: ConferenceLogoSource;
    settings: ConferenceSettings;
  }) {
    return new ConferenceWasCreated({
      id: params.id.value,
      name: params.name.value,
      slug: params.slug.value,
      place: params.place.value,
      startDate: params.dateRange.startDate,
      endDate: params.dateRange.endDate,
      logoSource: params.logoSource?.value,
      isLandingPageOpen: params.settings.isLandingPageOpen,
      isCallForPapersOpen: params.settings.isCallForPapersOpen,
      isTicketSalesOpen: params.settings.isTicketSalesOpen,
    });
  }

  public update(params: {
    name: ConferenceName;
    slug: ConferenceSlug;
    place: ConferencePlace;
    dateRange: ConferenceDateRange;
    settings: ConferenceSettings;
  }) {
    const event = this.buildConferenceWasEditedEvent(params);
    this.apply(event);
  }

  private buildConferenceWasEditedEvent(params: {
    name: ConferenceName;
    slug: ConferenceSlug;
    place: ConferencePlace;
    dateRange: ConferenceDateRange;
    logoSource?: ConferenceLogoSource;
    settings: ConferenceSettings;
  }) {
    return new ConferenceWasEdited({
      id: this._id.value,
      name: params.name.value,
      slug: params.slug.value,
      place: params.place.value,
      startDate: params.dateRange.startDate,
      endDate: params.dateRange.endDate,
      logoSource: params.logoSource?.value,
      isLandingPageOpen: params.settings.isLandingPageOpen,
      isCallForPapersOpen: params.settings.isCallForPapersOpen,
      isTicketSalesOpen: params.settings.isTicketSalesOpen,
    });
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get slug() {
    return this._slug;
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

  get isLandingPageOpen() {
    return this._settings.isLandingPageOpen;
  }

  get isCallForPapersOpen() {
    return this._settings.isCallForPapersOpen;
  }

  get isTicketSalesOpen() {
    return this._settings.isTicketSalesOpen;
  }

  private onConferenceWasCreated(event: ConferenceWasCreated) {
    this._id = ConferenceId.fromString(event.id);
    this._name = ConferenceName.fromString(event.name);
    this._slug = ConferenceSlug.fromString(event.slug);
    this._place = ConferencePlace.fromString(event.place);
    this._dateRange = ConferenceDateRange.fromStartAndEndDate(new Date(event.startDate), new Date(event.endDate));
    this._logoSource = event.logoSource ? ConferenceLogoSource.fromString(event.logoSource) : null;
    this._settings = ConferenceSettings.fromValues(
      event.isLandingPageOpen,
      event.isCallForPapersOpen,
      event.isTicketSalesOpen
    );
  }

  private onConferenceWasEdited(event: ConferenceWasEdited) {
    this._name = ConferenceName.fromString(event.name);
    this._slug = ConferenceSlug.fromString(event.slug);
    this._place = ConferencePlace.fromString(event.place);
    this._dateRange = ConferenceDateRange.fromStartAndEndDate(new Date(event.startDate), new Date(event.endDate));
    this._logoSource = event.logoSource ? ConferenceLogoSource.fromString(event.logoSource) : null;
    this._settings = ConferenceSettings.fromValues(
      event.isLandingPageOpen,
      event.isCallForPapersOpen,
      event.isTicketSalesOpen
    );
  }
}
