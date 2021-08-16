export class ConferenceDTO {
  id: string;
  name: string;
  slug: string;
  place: string;
  startDate: string;
  endDate: string;
  logoSource?: string;
  isLandingPageOpen: boolean;
  isCallForPapersOpen: boolean;
  isTicketSalesOpen: boolean;
}
