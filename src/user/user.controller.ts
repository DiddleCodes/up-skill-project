import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';

import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto, RegistrationDTO, UpdateUserDto } from 'src/user/users.dto';
import { UserService } from './user.service';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private userService: UserService) {}

  @ApiResponse({
    status: 200,
    description: 'A user has been succesfully registered',
  })
  @UseGuards()
  @Post('/register')
  async register(@Body() body: RegistrationDTO) {
    const token = await this.userService.signPayload(body);

    const user: any = await this.userService.createUser(body);
    return { user, token };
  }

  @ApiResponse({
    status: 200,
    description: 'User Logged in successfully',
  })
  @Post('/login')
  //@UseGuards(AuthGuard('jwt'))
  async login(@Body() body: LoginDto) {
    const user: any = await this.userService.findByLogin(body);

    const payload = {
      email: user.email,
      password: user.password,
    };
    const token = await this.userService.signPayload(payload);
    return { user, token };
  }

  @ApiResponse({
    status: 200,
    description: 'User updated  successfully',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id of a User in the database',
    type: String,
  })
  @Patch('update/:id')
  async updateUser(
    @Res() response,
    @Param('id') _id: string,
    @Body() updateUser: UpdateUserDto,
  ) {
    try {
      const userUpdate = await this.userService.updateUser(_id, updateUser);

      return response.status(HttpStatus.ACCEPTED).json({
        message: 'User updated  successfully ',
        userUpdate,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @ApiResponse({
    status: 200,
    description: 'User gotten  successfully',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id of a User in the database',
    type: String,
  })
  @Get('/:id')
  // eslint-disable-next-line prettier/prettier
  async getUserById(
      @Res() response, 
      @Param('id') _id: string) {
    try {
      const getUser = await this.userService.getUserById(_id);

      return response.status(HttpStatus.FOUND).json({
        message: 'User gotten  successfully ',
        getUser,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @ApiResponse({
    status: 200,
    description: 'Users gotten successfully',
  })
  @Get('/')
  async getAllUsers(@Res() response) {
    try {
      const userData = await this.userService.getAllUsers();
      return response.status(HttpStatus.FOUND).json({
        message: 'All User data gotten successfully',
        userData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
