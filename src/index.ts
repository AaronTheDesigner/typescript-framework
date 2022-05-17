import { User } from "./Models/User";

const user = new User ({ id: 1, name: 'newest name',  age: 82 });

user.on('save', () => {
    console.log(user)
});

user.save();