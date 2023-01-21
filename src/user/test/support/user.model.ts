import { MockModel } from '../../../db/mock.model';
import { createUserResp } from '../stubs/user.stub';
import { User } from '../../users.schema';

export class UserModel extends MockModel<User> {
  protected entityStub = createUserResp() as unknown as User;
}
