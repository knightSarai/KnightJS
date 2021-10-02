import Model from 'models/Model';
import Eventing from 'models/Eventing';
import ApiSync from 'models/ApiSync';
import Attributes from 'models/Attributes';

interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

export class User extends Model<UserProps> {
  static create(attrs: UserProps = {}): User {
    return new User(
      new Attributes<UserProps>(attrs),
      new ApiSync<UserProps>(),
      new Eventing()
    );
  }
}

export default User;
