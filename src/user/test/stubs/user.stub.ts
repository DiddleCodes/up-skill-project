import { RegistrationDTO } from 'src/user/users.dto';

// Here we simulate the user DTO and its expected response during the Api Calls
export const createUserStub = (): RegistrationDTO => {
  return {
    name: 'John',
    email: 'johndoe@example.com',
    mobile: '+2347000000000',
    password: 'password',
  };
};

export const createUserResp = () => {
  return {
    name: 'John',
    email: 'johndoe@example.com',
    mobile: '+2347000000000',
  };
};
