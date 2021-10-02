import User from 'models/User';
import { API_URL } from 'config';
const user = User.create({ id: 1 });

user.on('change', () => console.log('User Change', user));
user.on('save', () => console.log('User Saved'));
user.on('edit', () => console.log('User Edited'));
user.on('error', () => console.log('error'));

user.fetch(`${API_URL}/users/${user.get('id')}`);

// Todo Add collection model
// `${API_URL}/users/${id}`
//
