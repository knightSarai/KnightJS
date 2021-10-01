class Attributes<T> {
  constructor(private data: T) {}
  get<K extends keyof T>(key: K): T[K] {
    return this.data[key];
  }

  set(props: T): void {
    Object.assign(this.data, props);
  }
}

export default Attributes;
