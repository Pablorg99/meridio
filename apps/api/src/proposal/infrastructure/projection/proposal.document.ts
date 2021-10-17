import { Document } from 'mongoose';

export interface ProposalDocument extends Document {
  readonly ownerId: string;
  readonly conferenceId: string;
  readonly title: string;
  readonly description: string;
  readonly speakerInfo: {
    fullName: string;
    email: string;
    age?: number;
    country?: string;
    city?: string;
    gender?: string;
  };
}
