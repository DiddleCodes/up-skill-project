import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginDTO } from 'src/auth/auth-login.dto';

import { IUser } from 'src/schemas/users.schema';
import * as bcrypt from 'bcrypt';
import {
  CreateUsersDto,
  UpdateUserDto,
  UserRegisterDTO,
} from 'src/dtos/users.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private userModel: Model<IUser>,
  ) {}

  async createUser(createUsers: CreateUsersDto): Promise<IUser> {
    const newUser = (await this.userModel.create(createUsers)).save();
    return newUser;
  }

  async updateUser(_id: string, updateDetails: UpdateUserDto): Promise<IUser> {
    const updateUser = await this.userModel.findByIdAndUpdate(
      _id,
      updateDetails,
    );
    if (!updateUser) {
      throw new HttpException(' User does not exist', HttpStatus.NOT_FOUND);
    }
    return updateUser;
  }

  async getAllUsers(): Promise<IUser[]> {
    const users = await this.userModel.find();
    if (!users || users.length == 0) {
      throw new HttpException(' No Users found', HttpStatus.BAD_REQUEST);
    }
    return users;
  }

  async getUserById(_id: string): Promise<IUser> {
    const user = await this.userModel.findById(_id).exec();
    if (!user) {
      throw new HttpException(' User does not exist', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async create(RegisterDTO: UserRegisterDTO) {
    const { email } = RegisterDTO;
    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
    }

    const createdUser = new this.userModel(RegisterDTO);

    await createdUser.save();
    return this.sanitizeUser(createdUser);
  }

  async findByLogin(UserDTO: LoginDTO) {
    const { email, password } = UserDTO;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new HttpException('user doesnt exists', HttpStatus.BAD_REQUEST);
    }
    if (await bcrypt.compare(password, user.password)) {
      return this.sanitizeUser(user);
    } else {
      throw new HttpException(
        'Invalid credentials, please try again',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  sanitizeUser(user: IUser) {
    const sanitized = user.toObject();
    delete sanitized['password'];
    return sanitized;
  }
  // the new methods
  async findByPayload(payload) {
    const { email } = payload;
    return await this.userModel.findOne({ email });
  }
}
