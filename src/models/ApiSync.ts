import axios, { AxiosPromise } from 'axios';

class ApiSync<T> {
  fetch(url: string): AxiosPromise {
    return axios.get(url);
  }

  save(url: string, data: T): AxiosPromise {
    return axios.post(url, data);
  }

  edit(url: string, data: T): AxiosPromise {
    return axios.patch(url, data);
  }
}

export default ApiSync;
