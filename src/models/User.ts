interface UserProps {
  name?: string;
  age?: number;
}

type Callback = () => void;

export class User {
  events: { [key: string]: Callback[] } = {};

  constructor(private data: UserProps) {}

  get(property: string): UserProps {
    return this.data[property];
  }

  set(props: UserProps): void {
    Object.assign(this.data, props);
  }

  on(eventName: string, cb: Callback): void {
    const handlers = this.events[eventName] || [];
    handlers.push(cb);
    this.events[eventName] = handlers;
  }

  trigger(eventName: string): void {
    const handlers = this.events[eventName];
    if (!handlers || !handlers.length) return;
    handlers.forEach((cb: Callback): void => {
      cb();
    });
  }
}

export default User;
