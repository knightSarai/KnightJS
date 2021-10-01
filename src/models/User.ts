import axios from 'axios';
import Eventing from 'models/Eventing';
import Sync from 'models/Sync';
import { API_URL } from 'config';

interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

export class User {
  public events: Eventing = new Eventing();
  public sync: Sync<UserProps> = new Sync<UserProps>(`${API_URL}/users`);
  constructor(private data: UserProps) {}

  get(property: keyof UserProps) {
    return this.data[property];
  }

  set(props: UserProps): void {
    Object.assign(this.data, props);
  }
}

export default User;
