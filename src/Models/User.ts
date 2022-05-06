import axios, { AxiosResponse } from 'axios';


interface UserProps { // describe a custom type
    id?: number;
    name?: string;
    age?: number; // <== question mark makes properties optional
}

type Callback = () => void // <== type alias for an empty function

export class User {
    events: { [key: string]: Callback[] } = {}; // <== different events unknown, so events will be an object with vague properties

    constructor(private data: UserProps) {}

    get(propName: string): ( number | string ) {
        return this.data[propName];
    }

    set(update: UserProps): void {
        Object.assign(this.data, update); // can update user props with one line
    }

    on(eventName: string, callback: Callback): void { // <=== callback argument features a functional annotation
        const handlers =  this.events[eventName] || [];
        handlers.push(callback);
        this.events[eventName] = handlers;
    }

    trigger(eventName: string): void {
        const handlers = this.events[eventName];

        if(!handlers || handlers.length === 0) {
            return;
        }

        handlers.forEach(callback => {
            callback();
        })
    }

    fetch(): void {
        axios.get(`http://localhost:3000/users/${this.get('id')}`)
        .then((response: AxiosResponse): void => {
            this.set(response.data);
        })
    }

}