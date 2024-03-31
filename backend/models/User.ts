import { Schema, model, Document } from "mongoose";

const userSchema: Schema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30
  },
  password: { type: String, required: true },
});

export interface IUserDocument extends Document {
  userName: string;
  firstName: string;
  lastName: string;
  password: string;
}

export const User = model<IUserDocument>('User', userSchema);
