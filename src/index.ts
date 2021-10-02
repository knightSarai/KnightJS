import User from 'models/User';

const user = new User();

user.on('change', () => console.log('User Change'));
user.on('save', () => console.log('User Saved'));
user.on('error', () => console.log('error'));

user.set({ id: 1 });

user.fetch();

user.set({ name: 'knightSarai', age: 24 });

user.save();
