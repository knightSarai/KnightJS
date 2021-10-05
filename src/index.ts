import UserForm from 'views/UserForm';
import User from 'models/User';

const root = document.getElementById('root');

if (root) {
  const userForm = new UserForm(root, User.create({ name: 'knight', age: 25 }));
  userForm.render();
} else {
  throw new Error('Root element not found');
}
