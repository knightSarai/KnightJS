import User from './models/User';

const knight = new User({ name: 'knight', age: 25 });

knight.on('change', () => console.log(knight.get('name')));
console.log(knight);
knight.trigger('change');
knight.set({ name: 'knightSarai' });
knight.trigger('change');
