import User from 'models/User';

const user = User.create();

user.on('change', () => console.log('User Change'));
user.on('save', () => console.log('User Saved'));
user.on('error', () => console.log('error'));

user.set({ id: 1 });

user.fetch();

user.set({ name: 'knight Sarai', age: 24 });

user.save();
