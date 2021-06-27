import { Document } from 'mongoose';

export interface ConferenceDocument extends Document {
  readonly name: string;
  readonly url: string;
  readonly place: string;
  readonly startDate: string;
  readonly endDate: string;
  readonly logoSource: string;
}
