# mstate (mutable state)
**mstate** is a small reactive state library.

The goal is to provide a useful state system that covers 90% of applications who's state stays relatively small, 10s - 100s KBs. 

The library currently weighs around `<1kb gzipped`.

## Typical usage

```js
import mstate from './mstate.js';

const myInitialAppState = {
    users: [{
        name: 'John'
    }]
}

// create an mstate instance for your application state
const appState = mstate(myInitialAppState);

// pass the appState around, get and set its data 
// on the appState.data property, just like a normal object
const usersName = appState.data.users[0].name;

// subscribe to changes on the appState
appState.subscribe((newState, oldState) => { ... });
```

## Multiple states

```js
import mstate from './mstate.js';

// create several mstate instances for your application
const userData = mstate({});
const formData = mstate({});

// subscribe to changes on the stores
userData.subscribe((newState, oldState) => { ... });

formData.subscribe((newState, oldState) => { ... });
```
