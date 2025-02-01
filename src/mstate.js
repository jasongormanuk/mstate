const DEBUG_MSG = 'DEBUG mstate   ';

export function mstate(initialState = {}) {
    const proxyCache = new WeakMap();
    const subscribers = new Set();
    
    let preBatchedState = null;
    let scheduleId = null;
  
    function makeProxy(obj) {
        if (!obj || typeof obj !== 'object') return obj;
  
        if (proxyCache.has(obj)) {
            return proxyCache.get(obj);
        }
  
        const proxy = new Proxy(obj, {
            get(target, prop, receiver) {
                const value = Reflect.get(target, prop, receiver);
                return makeProxy(value); // recursively wrap
            },
            
            set(target, prop, newVal, receiver) {
                const oldVal = target[prop];
                if (oldVal === newVal) return true;
                
                if (!preBatchedState) {
                    preBatchedState = JSON.parse(JSON.stringify(store.data)); // not proud about this
                }
                Reflect.set(target, prop, newVal, receiver);
                scheduleNotify(store.data, preBatchedState);
                return true;
            }
        });
  
        proxyCache.set(obj, proxy);
        return proxy;
    }

    function scheduleNotify(newState, oldState) {
        if (scheduleId !== null) {
            clearTimeout(scheduleId);
        }

        scheduleId = setTimeout(() => {
            scheduleId = null;
            for (const sub of subscribers) {
                if (process.env.DEBUG) {
                    console.debug(DEBUG_MSG, `Calling subscriber`);
                    console.debug(DEBUG_MSG, `Old State:`, oldState);
                    console.debug(DEBUG_MSG, `New State:`, newState);
                }
                sub(newState, oldState);
                preBatchedState = null;
            }
        }, 0);
    }

    const proxyRoot = makeProxy(initialState);

    const store = {
        get data() {
            return proxyRoot;
        },
        subscribe(fn) {
            subscribers.add(fn);
            
            if (process.env.DEBUG) {
                console.debug(DEBUG_MSG, 'Add subscriber');
            }
            
            return () => {
                subscribers.delete(fn);

                if (process.env.DEBUG) {
                    console.debug(DEBUG_MSG, 'Remove subscriber');
                }
            }
        }
    };

    return store;
}

export default mstate;
