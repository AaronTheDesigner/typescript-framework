import { User } from "./Models/User";

const user = User.builduser({ id: 1, name: 'newest name',  age: 82 });

user.on('change', () => {
    console.log(user)
});

user.fetch();