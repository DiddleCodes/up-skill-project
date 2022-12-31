import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

import { UserService } from 'src/users/users.service';

import { LoginDTO } from './auth-login.dto';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { UserRegisterDTO } from 'src/dtos/users.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() registerDTO: UserRegisterDTO) {
    const user: any = await this.userService.create(registerDTO);
    const payload = user.email;

    const token = await this.authService.signPayload(payload);
    return { user, token };
  }

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
