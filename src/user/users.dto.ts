import { ApiProperty, PickType } from '@nestjs/swagger';
import {
  IsEmail,
  IsMobilePhone,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsMongoId()
  _id: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsNotEmpty()
  isAdmin: boolean;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class RegistrationDTO {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'First name',
    example: 'John',
    required: false,
    title: 'firstName',
  })
  name: string;

  @IsString()
  @IsEmail()
  @ApiProperty({
    description: 'Email',
    example: 'johndoes@example.com',
    required: true,
    title: 'email',
  })
  email: string;

  @IsMobilePhone('en-NG')
  @ApiProperty({
    description: 'Phone number',
    example: '+2347030000000',
    required: true,
    title: 'mobile',
  })
  mobile: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @ApiProperty({
    description: 'Password',
    example: 'Password',
    required: true,
    title: 'password',
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;
}

export class LoginDto extends PickType(RegistrationDTO, [
  'email',
  'password',
]) {}
