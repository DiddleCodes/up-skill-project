import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schemas/users.schema';

@Module({
  exports: [UserService],
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    //AuthModule
  ],
  controllers: [UsersController],
  providers: [UserService],
})
export class UsersModule {}
