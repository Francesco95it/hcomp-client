import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {Provider} from 'react-redux'
import axios from 'axios'

import Homepage from './components/Homepage/Homepage.js';
import Login from './components/Login/Login.js';
import Profile from './components/Profile/Profile.js';
import AuthRoute from './components/AuthRoute/AuthRoute.js';
import AuthWriterRoute from './components/AuthRoute/AuthWriterRoute.js';
import Navbar from './components/Navbar/Navbar.js';
import CreateTask from './components/CreateTask/CreateTask.js';
import NotFound from './components/NotFound/NotFound.js';


import '../node_modules/semantic-ui-css/semantic.min.css';
import store from './store/store'

axios.defaults.baseURL = 'https://hsoc.herokuapp.com';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Navbar />
                <Switch>
                    <Route exact path='/' component={Homepage} />
                    <Route path='/login' component={Login} />
                    <AuthRoute back={'/'}>
                        <Route exact path='/profile' component={Profile} />
                        <Route path='/profile/:id' component={Profile} />
                        <AuthWriterRoute back={'/'} >
                            <Route path='/createTask' component={CreateTask} />
                        </AuthWriterRoute>
                    </AuthRoute>
                    <Route path='*' component={NotFound} />
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
