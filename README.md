# mstate
Small reactive state system in JavaScript

## Typical usage

```js
import mstate from './mstate.js';

const myInitialAppState = {
    users: [{
        name: 'John'
    }]
}

// create an mstate instance for your application state
const store = mstate(myInitialAppState);

// pass the store around, get and set its data 
// on the store.data property, just like a normal object
const usersName = store.data.users[0].name;

// subscribe to changes on the store
store.subscribe((newState, oldState) => { ... });
```

## Multiple stores

```js
import mstate from './mstate.js';

// create several mstate instances for your application
const userData = mstate({});
const formData = mstate({});

// subscribe to changes on the stores
userData.subscribe((newState, oldState) => { ... });

formData.subscribe((newState, oldState) => { ... });
```