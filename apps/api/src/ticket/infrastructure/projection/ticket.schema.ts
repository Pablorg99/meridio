import { Schema } from 'mongoose';

export const TicketSchema = new Schema({
  _id: String,
  buyerId: String,
  conferenceId: String,
  assistantInfo: {
    fullName: String,
    email: String,
    age: Number,
    country: String,
    city: String,
    gender: String,
  },
});
