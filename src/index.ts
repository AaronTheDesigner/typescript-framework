import { User } from "./Models/User";

const user = new User ({ name: 'another new user', age: 2 });

user.save();

user.events.on('change', () => {
    console.log('change')
})

user.events.trigger('change');