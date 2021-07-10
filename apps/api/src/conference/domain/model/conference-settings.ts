import { ValueObject } from '@meridio/domain';

export class ConferenceSettings extends ValueObject<{
  isLandingPageOpen: boolean;
  isCallForPapersOpen: boolean;
  isTicketSalesOpen: boolean;
}> {
  static fromValues(isLandingPageOpen: boolean, isCallForPapersOpen: boolean, isTicketSalesOpen: boolean) {
    return new ConferenceSettings({ isLandingPageOpen, isCallForPapersOpen, isTicketSalesOpen });
  }

  get isLandingPageOpen() {
    return this.props.isLandingPageOpen;
  }

  get isCallForPapersOpen() {
    return this.props.isCallForPapersOpen;
  }

  get isTicketSalesOpen() {
    return this.props.isTicketSalesOpen;
  }
}
