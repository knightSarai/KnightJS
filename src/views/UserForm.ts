import User from 'models/User';

class UserForm {
  constructor(public parent: Element, public model: User) {
    this.renderOnChange();
  }

  renderOnChange(): void {
    this.model.on('change', () => this.render());
  }

  eventsMap(): { [key: string]: () => void } {
    return {
      'click:.age-btn': this.onAgeButtonClick,
      'click:.name-btn': this.onNameButtonClick,
    };
  }

  onAgeButtonClick = (): void => {
    this.model.set({ age: Math.round(Math.random() * 100) });
    console.log(this.model.get('age'));
  };

  onNameButtonClick = (): void => {
    const nameInput = <HTMLInputElement>(
      this.parent.querySelector('.name-input')
    );
    if (nameInput) {
      this.model.set({ name: nameInput.value });
    }
  };

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

  onButtonClick(): void {
    console.log('Hi');
  }

  template(): string {
    return `
            <div>
                <h1>User Form</h1>
                <div>
                    <p>User Name: ${this.model.get('name')}</p>
                    <p>User Age: ${this.model.get('age')}</p>
                </div>
                <input class="name-input"/>
                <button class="name-btn">Change Name</button>
                <button class="age-btn">Set Age</button>
            </div>
        `;
  }

  render(): void {
    this.parent.innerHTML = '';
    const tempateElement = document.createElement('template');
    tempateElement.innerHTML = this.template();
    this.bindEvents(tempateElement.content);
    this.parent.append(tempateElement.content);
  }
}

export default UserForm;
