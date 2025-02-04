import mstate from './mstate.js';

const initialAppState = window.localStorage.getItem('appState') ? JSON.parse(window.localStorage.getItem('appState')) : {
    users: {
        '123': {
            name: 'John'
        }
    }
}

const store = mstate(initialAppState);

// Subscribe to update the UI with the new data.
store.subscribe((newState, oldState) => {
    document.querySelector('pre').innerText = JSON.stringify(newState);
});

// Subscribe to store the app state in localStorage.
store.subscribe((newState, oldState) => {
    window.localStorage.setItem('appState', JSON.stringify(newState));
    console.log('Saved state to localStorage');
});

console.log('Restored state:', JSON.stringify(store.data));

document.querySelector('pre').innerHTML = JSON.stringify(store.data);

const btn = document.createElement('button');

btn.textContent = 'Update State';

btn.addEventListener('click', (e) => {
    e.preventDefault();
    store.data.users['123'].age = store.data.users['123'].age ? (store.data.users['123'].age + 1) : 1;
    return false;
});

document.body.appendChild(btn);
