import { Schema } from 'mongoose';

export const ConferenceSchema = new Schema({
  _id: String,
  name: String,
  url: String,
  place: String,
  startDate: String,
  endDate: String,
  logoSource: String,
});
