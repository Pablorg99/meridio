import { Schema } from 'mongoose';

export const ProposalSchema = new Schema({
  _id: String,
  ownerId: String,
  conferenceId: String,
  title: String,
  description: String,
  speakerInfo: {
    fullName: String,
    email: String,
    age: Number,
    country: String,
    city: String,
    gender: String,
  },
});
