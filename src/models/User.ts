import Eventing from 'models/Eventing';
import Sync from 'models/Sync';
import Attributes from 'models/Attributes';
import { API_URL } from 'config';
import { AxiosResponse } from 'axios';

interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

export class User {
  public events: Eventing = new Eventing();
  public sync: Sync<UserProps> = new Sync<UserProps>(`${API_URL}/users`);
  public attributes: Attributes<UserProps>;

  constructor(attrs: UserProps = {}) {
    this.attributes = new Attributes<UserProps>(attrs);
  }

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  get get() {
    return this.attributes.get;
  }

  set(props: UserProps) {
    this.attributes.set(props);
    this.trigger('change');
  }

  fetch(): void {
    const id = this.attributes.get('id');
    if (typeof id !== 'number') {
      throw new Error("Can't fetch without ID");
    }
    this.sync.fetch(id).then((response: AxiosResponse) => {
      this.set(response.data);
    });
  }

  save(): void {
    this.sync
      .save(this.attributes.getObject())
      .then(() => this.trigger('save'))
      .catch(() => this.trigger('error'));
  }
}

export default User;
