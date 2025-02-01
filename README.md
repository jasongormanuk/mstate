# mstate (mutable state)
**mstate** is a small reactive state library.

The goal is to provide a useful state system that covers 90% of applications who's state stays relatively small, 10s - 100s KBs. 

The library currently weighs **less that 1kb gzipped**.

## Typical usage

```js
import mstate from './mstate.js';

const myInitialAppState = {
    users: [{
        name: 'John'
    }]
}

// Create an mstate instance for your application state.
const appState = mstate(myInitialAppState);

// Pass the appState around, get and set its data 
// on the appState.data property, add properties that didn't
// exist before, just like a normal object.
const usersName = appState.data.users[0].name;

// Subscribe to changes on the appState
appState.subscribe((newState, oldState) => { ... });
```

## Multiple states

```js
import mstate from './mstate.js';

// Create several mstate instances for your application.
const userData = mstate({});
const formData = mstate({});

// Subscribe to changes on the stores.
userData.subscribe((newState, oldState) => { ... });

formData.subscribe((newState, oldState) => { ... });
```
