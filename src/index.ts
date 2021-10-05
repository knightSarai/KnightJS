import UserForm from 'views/UserForm';
import User from 'models/User';

const userForm = new UserForm(
  document.getElementById('root')!,
  User.create({ name: 'knight', age: 25 })
);

userForm.render();
