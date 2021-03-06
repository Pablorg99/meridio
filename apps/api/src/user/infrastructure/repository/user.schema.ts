import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  _id: String,
  fullName: String,
  avatarUrl: String,
  roles: [String],
});
