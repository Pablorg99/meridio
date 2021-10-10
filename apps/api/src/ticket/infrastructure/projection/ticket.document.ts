import { Document } from 'mongoose';

export interface TicketDocument extends Document {
  readonly buyerId: string;
  readonly conferenceId: string;
  readonly assistantInfo: {
    fullName: string;
    email: string;
    age?: number;
    country?: string;
    city?: string;
    gender?: string;
  };
}
