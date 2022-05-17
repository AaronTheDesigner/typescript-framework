import { Model } from "./Model";
import { Eventing } from './Eventing'
import { Attributes } from './Attributes'
import { ApiSync } from "./ApiSync";
import { Collection } from "./Collection";


export interface UserProps { // describe a custom type
    id?: number;
    name?: string;
    age?: number; // <== question mark makes properties optional
}

const rootUrl = 'http://localhost:3000/users'

export class User extends Model<UserProps> {
    static buildUser(attrs: UserProps): User {
        return new User(
            new Attributes<UserProps>(attrs),
            new Eventing(),
            new ApiSync<UserProps>(rootUrl)
        )
    }

    static buildUserCollection(): Collection<User, UserProps> {
        return new Collection<User, UserProps>(rootUrl, (json: UserProps) => User.buildUser(json))
    }

}