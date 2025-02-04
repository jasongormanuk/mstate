import mstate from './mstate.js';

const initialAppState = {
    users: {
        '123': {
            name: 'John'
        }
    }
}

const store = mstate(initialAppState);

// Subscribe to store the app state in DB.
store.subscribe((newState, oldState) => {
    console.log(`Updated state: ${JSON.stringify(newState)}`);
    console.log('Saved state to DB');
});

console.log('Restored state:', JSON.stringify(store.data));

store.data.users['123'].age = 20;