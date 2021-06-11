
import { Document, Schema } from 'mongoose';

export const ConferenceSchema = new Schema({
  _id: String,
  name: String,
  url: String,
  place: String,
  startDate: Date,
  endDate: Date,
  logoSource: String
});

export interface ConferenceProjection extends Document {
  readonly name: string;
  readonly url: string;
  readonly place: string;
  readonly startDate: Date;
  readonly endDate: Date;
  readonly logoSource: string;
}

export const conferenceProjection = 'conferenceProjection';
