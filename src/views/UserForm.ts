class UserForm {
  constructor(public parent: Element) {}

  template(): string {
    return `
            <div>
                <h1>User Form</h1>
                <input/>
                <button>Click Me</button>
            </div>
        `;
  }

  render(): void {
    const tempateElement = document.createElement('template');
    tempateElement.innerHTML = this.template();
    this.parent.append(tempateElement.content);
  }
}

export default UserForm;
