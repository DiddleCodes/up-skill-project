import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export enum UserType {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
  TECHNICIAN = 'TECHNICIAN',
  MOBILE_TEAM = 'MOBILE_UNIT',
  PARTNER = 'PARTNER',
  GARAGE = 'GARAGE',
  VENDOR = 'VENDOR',
}
export const USER_TYPE = {
  ADMIN: UserType.ADMIN,
  CUSTOMER: UserType.CUSTOMER,
};
export interface IUser extends Document {
  //toObject(): unknown;
  name: string;
  email: string;
  password: string;
  mobile: number;
  role: UserType.ADMIN;
  //isAdmin: boolean;
}

export interface User extends Document {
  email: string;
  password: string;
}

export interface Payload {
  email: string;
  password: string;
}

export const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: Number,
  password: String,
});

UserSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashed = await bcrypt.hash(this['password'], 10);
    this['password'] = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});
