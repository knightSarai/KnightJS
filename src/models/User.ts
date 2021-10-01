import Eventing from 'models/Eventing';
import Sync from 'models/Sync';
import Attributes from 'models/Attributes';
import { API_URL } from 'config';

interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

export class User {
  public events: Eventing = new Eventing();
  public sync: Sync<UserProps> = new Sync<UserProps>(`${API_URL}/users`);
  public attributes: Attributes<UserProps>;

  constructor(attrs: UserProps) {
    this.attributes = new Attributes<UserProps>(attrs);
  }
}

export default User;
