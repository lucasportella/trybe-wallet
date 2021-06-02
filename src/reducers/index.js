import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import userReducer from './user';
import walletReducer from './wallet';

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global

const rootReducer = combineReducers({ userReducer, walletReducer });

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
