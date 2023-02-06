import {createStore} from 'redux'
import reducers from './reducers'
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// storage
const persistConfig = {
    key: 'redux-store',
    storage: storage,
    keyPrefix: 'hoan',
}

// store
const store = createStore(persistReducer(persistConfig, reducers));
persistStore(store);

export default store;