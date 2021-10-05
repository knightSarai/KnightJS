import Model from 'models/Model';

export abstract class View<T extends Model<K>, K> {
  constructor(public parent: Element, public model: T) {
    this.renderOnChange();
  }

  abstract template(): string;

  eventsMap(): { [key: string]: () => void } {
    return {};
  }

  renderOnChange(): void {
    this.model.on('change', () => this.render());
  }

  render(): void {
    this.parent.innerHTML = '';
    const tempateElement = document.createElement('template');
    tempateElement.innerHTML = this.template();
    this.bindEvents(tempateElement.content);
    this.parent.append(tempateElement.content);
  }

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
}

export default View;
