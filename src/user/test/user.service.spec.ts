/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { getModelToken } from '@nestjs/mongoose';
import { UserModel } from './support/user.model';
import { IUser, User } from '../users.schema';
import { createUserResp, createUserStub } from './stubs/user.stub';
import { ConfigService } from '@nestjs/config';
import { BadRequestException, HttpException, HttpStatus } from '@nestjs/common';

describe('AuthService', () => {
  let service: UserService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken('User'),
          useClass: UserModel,
        },
        ConfigService,
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  describe('create methods', () => {
    let user: IUser;
    let createSpy: jest.SpyInstance;
    let oneSpy: jest.SpyInstance;

    beforeEach(async () => {
      UserModel.prototype.create = jest.fn().mockImplementationOnce(() => ({
        save: jest.fn().mockReturnValueOnce(createUserResp()),
      }));
    });

    afterEach(() => {
      jest.clearAllMocks();
    });
    describe('create() method', () => {
      test('should create and save user details', async () => {
        user = await service.create(createUserStub());
        createSpy = jest.spyOn(UserModel.prototype, 'create');
        expect(createSpy).toHaveBeenCalledWith(createUserStub());

        expect(user).toEqual(createUserResp());
      });
    });
    describe('createUser() method ', () => {
      test('should throw an error when creating an already existing user', async () => {
        try {
          oneSpy = jest.spyOn(UserModel.prototype, 'findOne');
          user = await service.createUser(createUserStub());
          expect(oneSpy).toHaveBeenCalledWith({
            email: createUserStub().email,
          });
          await expect(user).rejects.toEqual(
            new BadRequestException({
              message: 'user already exists',
              status: HttpStatus.BAD_REQUEST,
            }),
          );
        } catch (error) {
          expect(error).toBeInstanceOf(HttpException);
        }
      });

      test('should create a user details that does not exist', async () => {
        UserModel.prototype.findOne = jest.fn().mockReturnValueOnce(null);
        user = await service.createUser(createUserStub());
        expect(user).toEqual(createUserResp());
      });
    });
  });

  describe('Find methods', () => {
    let users: IUser[];
    describe('getAllUsers()', () => {
      test('should Get all users that exists in the db', async () => {
        users = await service.getAllUsers();
        expect(users).toEqual([createUserResp()]);
      });
      test('should throw an error if no user exists in the db', async () => {
        try {
          UserModel.prototype.find = jest.fn().mockReturnValueOnce([]);
          users = await service.getAllUsers();
          await expect(users).rejects.toEqual(
            new HttpException(' No Users found', HttpStatus.BAD_REQUEST),
          );
          expect(users).toEqual([createUserResp()]);
        } catch (error) {
          expect(error).toBeInstanceOf(HttpException);
        }
      });
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
