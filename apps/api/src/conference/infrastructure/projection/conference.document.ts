import { Document } from 'mongoose';

export interface ConferenceDocument extends Document {
  readonly ownerId: string;
  readonly name: string;
  readonly slug: string;
  readonly place: string;
  readonly startDate: string;
  readonly endDate: string;
  readonly logoSource: string;
  readonly isLandingPageOpen: boolean;
  readonly isCallForPapersOpen: boolean;
  readonly isTicketSalesOpen: boolean;
}
