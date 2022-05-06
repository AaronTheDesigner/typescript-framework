import { User } from "./Models/User";

const user = new User ({ name: 'another new user', age: 2 });

console.log(user.get('name'))

user.on('change', () => {
    console.log('user was changed')
});

user.trigger('change')