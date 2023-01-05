import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

import { UserService } from 'src/users/users.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto, RegistrationDTO } from 'src/users/users.dto';

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
  async register(@Body() body: RegistrationDTO) {
    const token = await this.authService.signPayload(body);

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
    const token = await this.authService.signPayload(payload);
    return { user, token };
  }
}
