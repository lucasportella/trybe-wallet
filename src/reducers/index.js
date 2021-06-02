import { combineReducers, createStore } from 'redux';
import userReducer from './user';
import walletReducer from './wallet';

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__
&& window.__REDUX_DEVTOOLS_EXTENSION__();

const rootReducer = combineReducers({ userReducer, walletReducer });

const store = createStore(rootReducer, devTools);

export default store;
