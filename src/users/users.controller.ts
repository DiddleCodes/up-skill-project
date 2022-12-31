import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUsersDto, UpdateUserDto } from 'src/dtos/users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Post('/create-user')
  async createStudent(
    @Res() response,
    @Body()
    createStudent: CreateUsersDto,
  ) {
    try {
      const newUser = await this.usersService.createUser(createStudent);

      return response.status(HttpStatus.CREATED).json({
        message: 'Student has been created successfully',
        newUser,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error encountered creating User',
        error: 'Bad Request',
      });
    }
  }

  @Patch('update/:id')
  async updateStudent(
    @Res() response,
    @Param('id') _id: string,
    @Body() updateUser: UpdateUserDto,
  ) {
    try {
      const userUpdate = await this.usersService.updateUser(_id, updateUser);

      return response.status(HttpStatus.ACCEPTED).json({
        message: 'User updated  successfully ',
        userUpdate,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  // eslint-disable-next-line prettier/prettier
  async getUserById(
      @Res() response, 
      @Param('id') _id: string) {
    try {
      const getUser = await this.usersService.getUserById(_id);

      return response.status(HttpStatus.FOUND).json({
        message: 'User gotten  successfully ',
        getUser,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('')
  async getUsers(@Res() response) {
    try {
      const userData = await this.usersService.getAllUsers();
      return response.status(HttpStatus.FOUND).json({
        message: 'All User data gotten successfully',
        userData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
