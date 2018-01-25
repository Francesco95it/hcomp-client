import { applyMiddleware, combineReducers, createStore } from 'redux'
import { sessionService, sessionReducer } from 'redux-react-session'
import {createLogger} from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import userState from './reducers/userReducer'

import axios from 'axios'

const middleWare = applyMiddleware(createLogger(), thunk, promise());

const reducers = combineReducers({
    user: userState,
    session: sessionReducer
})

const store = createStore(reducers, middleWare);

sessionService.initSessionService(store)
.then(() => {
    if(store.getState().session.user.expiresAt<new Date().getTime()){
        sessionService.deleteSession();
        sessionService.deleteUser();
    }
    if(store.getState().session.authenticated){
        axios.defaults.headers.common['Authorization'] = store.getState().session.user.jwt;
    } else axios.defaults.headers.common['Authorization'] = "";
    console.log("Session initialized")
});

export default store
