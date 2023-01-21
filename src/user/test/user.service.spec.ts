/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { getModelToken } from '@nestjs/mongoose';
import { UserModel } from './support/user.model';
import { IUser, User } from '../users.schema';
import { Model } from 'mongoose';
import { createUserResp, createUserStub } from './stubs/user.stub';
import { ConfigService } from '@nestjs/config';
import { BadRequestException, HttpException, HttpStatus } from '@nestjs/common';

describe('AuthService', () => {
  let service: UserService;
  let userModel: UserModel;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken('User'),
          useValue: UserModel,
        },
        ConfigService,
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userModel = module.get(getModelToken('User'));
    // userModel = module.get<UserModel>(UserModel);
  });

  describe('create method should return user details', () => {
    let user: IUser;
    let saveSpy: jest.SpyInstance;
    let constructorSpy: jest.SpyInstance;
    let oneSpy: jest.SpyInstance;

    beforeEach(async () => {
      saveSpy = jest.spyOn(UserModel.prototype, 'save');
      // oneSpy = jest.spyOn(userModel, 'findOne').mockResolvedValue(null);
      // .mockResolvedValue(null);
      constructorSpy = jest.spyOn(UserModel.prototype, 'constructorSpy');
      user = await service.create(createUserStub());
    });
    test('should return user details', async () => {
      // try {
      //expect(oneSpy).toHaveBeenCalled();
      expect(constructorSpy).toHaveBeenCalledWith(createUserStub());
      expect(user).toEqual(createUserResp());
      // await expect(service.createUser(createUserStub())).rejects.toEqual(
      //   new BadRequestException({
      //     message: 'user already exists',
      //     status: HttpStatus.BAD_REQUEST,
      //   }),
      // );
      // } catch (error) {
      //   console.log('random');
      //   console.log(error);
      //   // expect(error).toBeInstanceOf(HttpException);
      // }
    });

    // test('should return requested user details', async () => {
    //   try {
    //     expect(oneSpy).toHaveBeenCalled();
    //     // expect(saveSpy).toHaveBeenCalled();
    //     await expect(service.createUser(createUserStub())).rejects.toEqual(
    //       new BadRequestException({
    //         message: 'user already exists',
    //         status: HttpStatus.BAD_REQUEST,
    //       }),
    //     );
    //   } catch (error) {
    //     console.log('random');
    //     console.log(error);
    //     // expect(error).toBeInstanceOf(HttpException);
    //   }
    // });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
