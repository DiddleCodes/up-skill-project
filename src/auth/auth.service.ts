import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { UserService } from 'src/users/users.service';
import { Payload } from '../users/users.schema';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  async signPayload(payload: Payload) {
    const JWT_SECRET_KEY = await this.configService.get('JWT_SECRET_KEY');
    return sign(payload, JWT_SECRET_KEY, { expiresIn: '2d' });
  }
  async validateUser(payload: Payload) {
    return await this.userService.findByPayload(payload);
  }
}
