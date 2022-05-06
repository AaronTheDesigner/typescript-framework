import { User } from "./Models/User";

const user = new User ({ name: 'another new user', age: 2 });

user.sync.save({})