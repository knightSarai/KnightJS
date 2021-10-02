import Model from 'models/Model';
import Eventing from 'models/Eventing';
import ApiSync from 'models/ApiSync';
import Attributes from 'models/Attributes';
import { API_URL } from 'config';

interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

export class User extends Model<UserProps> {
  static create(attrs: UserProps = {}): User {
    return new User(
      new Attributes<UserProps>(attrs),
      new ApiSync<UserProps>(`${API_URL}/users`),
      new Eventing()
    );
  }
}

export default User;
