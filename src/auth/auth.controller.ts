import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

import { UserService } from 'src/users/users.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { LoginDTO } from './auth-login.dto';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { UserRegisterDTO } from 'src/dtos/users.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @ApiResponse({
    status: 200,
    description: 'A user has been succesfully registered',
  })
  @UseGuards()
  @Post('/register')
  async register(@Body() registerDTO: UserRegisterDTO) {
    const user: any = await this.userService.create(registerDTO);
    const payload = user.email;

    const token = await this.authService.signPayload(payload);
    return { user, token };
  }

  @ApiResponse({
    status: 200,
    description: 'User Logged in successfully',
  })
  @UseGuards()
  @Post('/login')
  @UseGuards(AuthGuard('jwt'))
  async login(@Body() loginDTO: LoginDTO) {
    const user: any = await this.userService.findByLogin(loginDTO);

    const payload = {
      email: user.email,
    };
    const token = await this.authService.signPayload(payload);
    return { user, token };
  }
}
