import { Events } from 'models/Model';
import axios, { AxiosResponse } from 'axios';
import Eventing from './Eventing';

// This class can take any types of model and create a collection out of it

class Collection<T, K> {
  models: T[] = [];
  events: Events = new Eventing();
  constructor(public deserialize: (json: K) => T) {}

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  fetch(url: string): void {
    axios.get(url).then((response: AxiosResponse) => {
      this.models = response.data.map((value: K) => this.deserialize(value));
      this.trigger('change');
    });
  }
}

export default Collection;
