import { API_URL } from 'config';
import User, { UserProps } from 'models/User';
import View from 'views/View';

class UserForm extends View<User, UserProps> {
  eventsMap(): { [key: string]: () => void } {
    return {
      'click:.age-btn': this.onAgeButtonClick,
      'click:.name-btn': this.onNameButtonClick,
      'click:.save-btn': this.onSaveButtonClick,
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

  onSaveButtonClick = (): void => {
    this.model.save(`${API_URL}/users`);
  };

  template(): string {
    return `
            <div>
                <input placeholder=${this.model.get(
                  'name'
                )} class="name-input"/>
                <button class="name-btn">Change Name</button>
                <button class="age-btn">Set Age</button>
                <button class="save-btn">Save</button>
            </div>
        `;
  }
}

export default UserForm;
