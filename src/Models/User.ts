import { Eventing } from './Eventing'
import { Sync } from './Sync';
import { Attributes } from './Attributes';


export interface UserProps { // describe a custom type
    id?: number;
    name?: string;
    age?: number; // <== question mark makes properties optional
}

const rootUrl = 'http://localhost:3000/users'

export class User {
    events: Eventing = new Eventing(); //<== we're not likely to change this, so hard coding is okay
    public sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);
    public attributes: Attributes<UserProps>

    constructor(attrs: UserProps) {
        this.attributes = new Attributes<UserProps>(attrs);
    }

}