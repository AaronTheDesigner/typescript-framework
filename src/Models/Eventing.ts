
type Callback = () => void // <== type alias for an empty function

export class Eventing {
    events: { [key: string]: Callback[] } = {}; // <== different events unknown, so events will be an object with vague properties

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
}