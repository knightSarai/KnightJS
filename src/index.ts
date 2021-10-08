import User, { UserProps } from 'models/User';
import Collection from 'models/Collection';
import UserList from 'views/UserList';
import { API_URL } from 'config';

const users = new Collection((json: UserProps) => User.create(json));
users.fetch(`${API_URL}/users`);

users.on('change', () => {
  const root = document.getElementById('root');

  if (root) {
    const userList = new UserList(root, users);
    userList.render();
    console.log(userList);
  } else {
    throw new Error('Root element not found');
  }
});
