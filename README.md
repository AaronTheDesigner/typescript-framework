# Typescript Framework
This framework will include two types of classes.
Model Classes - handle data, used to repreasent users, blog posts, images etc
View Classes - handle html events caused by the user, like clicks and taps

## Composition
In order to understand composition better, we'll be taking the Extraction Approach, which means we'll build large, complicated superclasses, then pull something reusable out of them. The User class for this Framework Project will be the first example. There are numerous challenges around this approach, which we'll address. 

### Eventing
Previously the User.ts class (within the Models folder) included the `on()` and `trigger()` methods.

**User.ts**
```
...
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
...
```
These will now be extracted as smaller Eventing class and imported as a property.
1. new file `Eventing.ts`
2. import prerequisite types and properties to new file (`type Callback = () => void`, `events: { [key: string]: Callback[] } = {};`) 
3. cut and paste `on()` and `trigger()` methods
4. import Eventing into `User.ts`
5. initialize Eventing as a property of the User class `events: Eventing = new Eventing();`

### Sync
`Sync.ts` will be a little more complicated to extract than `Eventing.ts` due to it's referrence to properties specific to the `User.ts` class. We must address the dependancies both classes have on each other. First step is to cut and pace `fetch()` and `save()` methods.

**User.ts to Sync.ts**
```
...
    fetch(): void {
            axios.get(`http://localhost:3000/users/${this.get('id')}`)
            .then((response: AxiosResponse): void => {
                this.set(response.data);
            })
        }

        save(): void {
            const id = this.get('id')

            if (this.get('id')) {
                axios.put(`http://localhost:3000/users/${id}`, this.data);
            } else {
                axios.post('http://localhost:3000/users', this.data)
            }
        }
...
```

... import AxiosPromise then proceed
1. import `UserProps` from User.ts
2. constructor for the rootUrl `constructor ( public rootUrl: string ) {}` 
3. argument and return for `save()` ==> `(data: UserProps): AxiosPromise`
4. within save: `const { id } = data;`
5. within save: `this.data` ==> `data`
6. add `return` to both conditional blocks
7. argument and return  for `fetch()` ==> `(id: number): AxiosPromise`
8. within fetch: change `${this.get('id')}` ==> `${id}`
9. eliminate `.then(...)` and add return

**Sync.ts**






### Extra notes
Extraction Approach - Building up something specific and then pulling something resuable out of it. 
JSON Server - quick easy storage via json file