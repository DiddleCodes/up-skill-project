import { Module } from '@nestjs/common';
import { AuthController } from './user.controller';
import { JwtStrategy } from './jwt-strategy';
import { ConfigModule } from '@nestjs/config';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './users.schema';

@Module({
  //imports: [ConfigModule],
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    ConfigModule,
    //AuthModule
  ],
  providers: [UserService, JwtStrategy],
  controllers: [AuthController],
})
export class UserModule {}
