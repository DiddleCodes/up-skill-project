import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

//@Schema()
// export class User {
//   _id: string;
//   name:string
//   isAdmin: boolean;
//   email: string;
//   password: string;
// }

export interface IUser extends Document {
  toObject(): unknown;
  name: string;
  email: string;
  password: string;
  //isAdmin: boolean;
}

export interface User extends Document {
  email: string;
  password: string;
}

export interface Payload {
  email: string;
}

export const UserSchema = new mongoose.Schema({
  email: String,
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

//export const UserSchema = SchemaFactory.createForClass(User);
