import mstate from './mstate.js';

const appState = {
    users: [{
        name: 'John'
    }]
}

const store = mstate(appState);

store.subscribe((newState, oldState) => { 
    console.log('subscriber1 does something with changes');
});

store.subscribe((newState, oldState) => {
    console.log('subscriber2 does something else')
});

store.data.users.push({ name: 'Doe' });
store.data.users.push({ name: 'Someone else' });

setTimeout(() => {
    console.log('------------ some time passes -----------------');

    // edit the stores data object directly
    store.data.users[0].age = 23;
    store.data.users[1].age = 64;
    store.data.users[2].age = 87;

    // add items that didn't exist before
    store.data.completed = true;
}, 2000);



