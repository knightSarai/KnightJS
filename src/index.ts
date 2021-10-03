import User from 'models/User';
import { API_URL } from 'config';

const userCollection = User.bulk();
userCollection.on('change', () => console.log('User Change', userCollection));
userCollection.on('save', () => console.log('User Saved'));
userCollection.on('edit', () => console.log('User Edited'));
userCollection.on('error', () => console.log('error'));

userCollection.fetch(`${API_URL}/users`);
userCollection.fetch(`${API_URL}/users`);
// Todo Add collection model
// Todo find a better way for handleing Sync methods, espacially the url
// `${API_URL}/users/${id}`
//
