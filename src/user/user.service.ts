import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { IUser, Payload } from './users.schema';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { RegistrationDTO, UpdateUserDto, LoginDto } from './users.dto';
import { GenericMatch } from 'src/surveys/surveys.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private userModel: Model<IUser>,
    private configService: ConfigService,
  ) {}

  async signPayload(payload: Payload) {
    const JWT_SECRET_KEY = await this.configService.get('JWT_SECRET_KEY');
    return sign(payload, JWT_SECRET_KEY, { expiresIn: '2d' });
  }
  async validateUser(payload: Payload) {
    return await this.findByPayload(payload);
  }

  async create(payload: GenericMatch) {
    const newUser = await this.userModel.create(payload);
    return await newUser.save();
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

  async createUser(RegisterDTO: RegistrationDTO) {
    console.log('creating');
    const { email } = RegisterDTO;
    const user = await this.userModel.findOne({ email });
    console.log(user);
    if (user) {
      throw new BadRequestException({
        message: 'user already exists',
        status: HttpStatus.BAD_REQUEST,
      });
      // throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
    }

    const createdUser = await this.create(RegisterDTO);
    // console.log(createdUser);
    // return createdUser;

    return this.sanitizeUser(createdUser);
  }

  async findByLogin(UserDTO: LoginDto) {
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
    const sanitized = user;
    delete sanitized['password'];
    return sanitized;
  }
  // the new methods
  async findByPayload(payload) {
    const { email } = payload;
    return await this.userModel.findOne({ email });
  }
}
