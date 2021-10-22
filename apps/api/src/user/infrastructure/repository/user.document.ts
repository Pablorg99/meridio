import { Document } from 'mongoose';

export interface UserDocument extends Document {
  fullName: string;
  avatarUrl: string;
  roles: Array<string>;
}
