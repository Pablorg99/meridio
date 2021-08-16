export class EditConferenceDTO {
  name: string;
  slug: string;
  place: string;
  startDate: string;
  endDate: string;
  logoFile?: FileList;
  isLandingPageOpen: boolean;
  isCallForPapersOpen: boolean;
  isTicketSalesOpen: boolean;
}
