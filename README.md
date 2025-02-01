# mstate (mutable state)
**mstate** is a small reactive state library.

The goal is to provide a useful state system that covers 90% of applications who's state stays relatively small, 10-1000kb.

The library currently weighs **less that 1kb gzipped**.

## Typical usage

```js
import mstate from './mstate.js';

const defaultAppState = {
    users: [{
        name: 'John'
    }]
}

// Create an mstate instance for your application state.
const appState = mstate(defaultAppState);

// Pass the appState around, get and set its data 
// on the appState.data property, add properties that didn't
// exist before, just like a normal object.
const usersName = appState.data.users[0].name;

// Subscribe to changes on the appState.
appState.subscribe((newState, oldState) => { ... });
```

## Multiple states

```js
import mstate from './mstate.js';

// Create several mstate instances for your application.
const userData = mstate();
const formData = mstate();

// Subscribe to changes on the stores.
userData.subscribe((newState, oldState) => { ... });

formData.subscribe((newState, oldState) => { ... });
```

## Saving and restoring app state

Handling application state as a single entity allows you to easily save and restore the application state to the current point in time.
For example you can register a subscriber who's job is to serialise and save the app state into `localStorage` and you can check this when your application boots to see if there's application state you can load up, kinda like a save point in a game.

```js
import mstate from './mstate.js';

const defaultAppState = {};

// When the application boots you can check `localStorage` for any previous app state.
const myInitialAppState = window.localStorage.getItem('appState') ? JSON.parse(window.localStorage.getItem('appState')) : defaultAppState;

// Create an mstate instance for your application state.
const appState = mstate(myInitialAppState);

// Subscribe to changes on the appState.
appState.subscribe((newState, oldState) => { ... });

// As well as your usual subscriber above you can add a subscriber in charge of saving your application state.
appState.subscribe((newState) => {
    window.localStorage.setItem('appState', JSON.stringify(newState));
});
```
