import {
  IsBoolean,
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateUsersDto {
  @IsString()
  @IsMongoId()
  _id: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsBoolean()
  @IsNotEmpty()
  isAdmin: boolean;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class UpdateUserDto {
  @IsString()
  @IsMongoId()
  _id: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsBoolean()
  @IsNotEmpty()
  isAdmin: boolean;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export interface UserRegisterDTO {
  email: string;
  password: string;
}
