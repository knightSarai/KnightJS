import axios from 'axios';
import Eventing from 'models/Eventing';
import { API_URL } from 'config';

interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

type Callback = () => void;

export class User {
  public events: Eventing = new Eventing();

  constructor(private data: UserProps) {}

  get(property: string): UserProps {
    return this.data[property];
  }

  set(props: UserProps): void {
    Object.assign(this.data, props);
  }

  fetch(): void {
    axios
      .get(`${API_URL}/users/${this.data.id}`)
      .then((res) => this.set(res.data));
  }

  save(): void {
    const { id } = this.data;
    if (id) {
      axios.put(`${API_URL}/users/${id}`, this.data);
      return;
    }
    axios.post(`${API_URL}/users`, this.data);
  }
}

export default User;
