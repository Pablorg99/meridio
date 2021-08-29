import { Schema } from 'mongoose';

export const ConferenceSchema = new Schema({
  _id: String,
  name: String,
  slug: String,
  place: String,
  startDate: String,
  endDate: String,
  logoSource: String,
  isLandingPageOpen: Boolean,
  isCallForPapersOpen: Boolean,
  isTicketSalesOpen: Boolean,
});
