import { AxiosPromise, AxiosResponse } from 'axios';

export interface ModelAttributes<T> {
  get<K extends keyof T>(key: K): T[K];
  set(props: T): void;
  all(): T;
}

export interface Sync<T> {
  fetch(path: string): AxiosPromise;
  save(path: string, data: T): AxiosPromise;
  edit(path: string, data: T): AxiosPromise;
}

export interface Events {
  on(eventName: string, cb: () => void): void;
  trigger(eventName: string): void;
}

interface HasId {
  id?: number;
}

class Model<T extends HasId> {
  constructor(
    private attributes: ModelAttributes<T>,
    private sync: Sync<T>,
    private events: Events
  ) {}

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  get get() {
    return this.attributes.get;
  }

  set(props: T) {
    this.attributes.set(props);
    this.trigger('change');
  }

  fetch(url: string): void {
    const id = this.attributes.get('id');
    if (typeof id !== 'number') {
      throw new Error("Can't fetch without ID");
    }

    this.sync
      .fetch(url)
      .then((response: AxiosResponse) => this.set(response.data));
  }

  save(url: string): void {
    this.sync
      .save(url, this.attributes.all())
      .then(() => this.trigger('save'))
      .catch(() => this.trigger('error'));
  }

  edit(url: string): void {
    const id = this.attributes.get('id');
    this.sync
      .edit(url, this.attributes.all())
      .then(() => this.trigger('edit'))
      .catch(() => this.trigger('error'));
  }
}

export default Model;
