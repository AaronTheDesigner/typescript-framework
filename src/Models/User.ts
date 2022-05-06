import { Eventing } from './Eventing'
import { Sync } from './Sync';


export interface UserProps { // describe a custom type
    id?: number;
    name?: string;
    age?: number; // <== question mark makes properties optional
}


export class User {
    events: Eventing = new Eventing();
    
    constructor(private data: UserProps) {}

    get(propName: string): ( number | string ) {
        return this.data[propName];
    }

    set(update: UserProps): void {
        Object.assign(this.data, update); // can update user props with one line
    }

}