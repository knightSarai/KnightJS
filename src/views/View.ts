import Model from 'models/Model';

export abstract class View<T extends Model<K>, K> {
  regions: { [key: string]: Element } = {};

  constructor(public parent: Element, public model: T) {
    this.renderOnChange();
  }

  abstract template(): string;

  eventsMap(): { [key: string]: () => void } {
    return {};
  }

  regionsMap(): { [key: string]: string } {
    return {};
  }

  mapRegions(fargment: DocumentFragment): void {
    const regionMap = this.regionsMap();
    for (let key in regionMap) {
      const selector = regionMap[key];

      const element = fargment.querySelector(selector);
      if (element) {
        this.regions[key] = element;
      }
    }
  }

  renderOnChange(): void {
    this.model.on('change', () => this.render());
  }

  onRender(): void {}

  bindEvents(fragment: DocumentFragment): void {
    const eventMap = this.eventsMap();
    for (let eventKey in eventMap) {
      const [eventName, selector] = eventKey.split(':');
      const elements = fragment.querySelectorAll(selector);
      elements.forEach((element) => {
        element.addEventListener(eventName, eventMap[eventKey]);
      });
    }
  }

  render(): void {
    this.parent.innerHTML = '';
    const tempateElement = document.createElement('template');
    tempateElement.innerHTML = this.template();

    this.bindEvents(tempateElement.content);
    this.mapRegions(tempateElement.content);

    this.onRender();
    this.parent.append(tempateElement.content);
  }
}

export default View;
