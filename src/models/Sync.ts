import axios, { AxiosPromise } from 'axios';

interface HasId {
  id?: number;
}

class Sync<T extends HasId> {
  constructor(public url: string) {}

  fetch(id: number): AxiosPromise {
    return axios.get(`${this.url}/${id}`);
  }

  save(data: T): AxiosPromise {
    const { id } = data;
    if (id) {
      return axios.patch(`${this.url}/${id}`, data);
    }
    return axios.post(`${this.url}`, data);
  }
}

export default Sync;
