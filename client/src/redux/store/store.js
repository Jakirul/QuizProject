import { createStore, combineReducers, applyMiddleware } from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import playerReducer from "../reducers/playerReducer.js";
import loggingReducer from "../reducers/loggingReducer.js";

const persistConfig = {
  key: 'root',
  storage,
}
 
const persistedReducer = persistReducer(persistConfig, playerReducer)
const persistedReducer2 = persistReducer(persistConfig, loggingReducer)


let store = createStore(
  combineReducers({
    player: persistedReducer,
    auth: persistedReducer2,
  }),
  composeWithDevTools(applyMiddleware(thunk))
);
let persistor = persistStore(store)



export {store, persistor}
