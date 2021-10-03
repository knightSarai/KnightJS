import Model from 'models/Model';
import Eventing from 'models/Eventing';
import ApiSync from 'models/ApiSync';
import Attributes from 'models/Attributes';
import Collection from './Collection';
import { API_URL } from 'config';

export interface UserProps {
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

  static bulk(): Collection<User, UserProps> {
    return new Collection<User, UserProps>(new Eventing(), (json: UserProps) =>
      User.create(json)
    );
  }
}

export default User;
