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

**Sync.ts** will look like below, but we're not done
```
... 
export class Sync {

    constructor(public rootUrl: string) {} 

    fetch(id: number): AxiosPromise {
        return axios.get(`${this.rootUrl}/${id}`);
    }

    save( data: UserProps ): AxiosPromise {
        const { id } = data;

        if (id) {
            return axios.put(`${this.rootUrl}/${id}`, data);
        } else {
            return axios.post('${this.rootUrl}', data)
        }
    }
}
...
```

We still need to remove everything related to User from this file by making Sync a generic class. We will create a HasId interface with an optional number property, add `<T extends HasId>` to the class and replace `UserProps` with `T`. User.ts will now be responisble for providing the rootUrl.

**User.ts**
```
public sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);
```

### Attributes.ts 
This class will be responsible for the `get()` and `set()` methods. We will cut and paste methods and turn it into a generic class by replacing `UserProps` with `T`. We will need to address the union return of the get method as it does not offer maximum flexibility / reusability. In this case we will apply generics to methods. The get method will be converted to the following...

**Attributes.ts**
```
get<K extends keyof T>(key: K): T[K]  {
    return this.data[key];
}
```
Nasty Syntax.
`K` can only be one of the keys of `T`.
* T will be a variable, currently only UserProps interface, therefore...
* K can only ever be 'name' 'age' or 'id'
* `key` within the argument is going to be of type K
* we return type K within T

We will integrate it back into the user class using a constructor to initialize attributes.

**User.ts**
```
public attributes: Attributes<UserProps>

    constructor(attrs: UserProps) {
        this.attributes = new Attributes<UserProps>(attrs);
    }
```

## Delegation
Now that other, more reusable classes have been extracted from our User class, we must address the issue of delegation. Currently, using these methods comes with a lot of reaching into the User class and it's corresponding counterparts, which is not what we want. We need to reimplement all of these different method making use of the instances available into class User.

### Direct Passthrough


### Coordination



### Extra notes
Extraction Approach - Building up something specific and then pulling something resuable out of it. 
JSON Server - quick easy storage via json file