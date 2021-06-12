import { Document } from 'mongoose';

export interface ConferenceDocument extends Document {
  readonly name: string;
  readonly url: string;
  readonly place: string;
  readonly startDate: Date;
  readonly endDate: Date;
  readonly logoSource: string;
}
