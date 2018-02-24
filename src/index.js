import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {Provider} from 'react-redux'
import axios from 'axios'

import Homepage from './components/Homepage/Homepage.js';
import Login from './components/Login/Login.js';
import Profile from './components/Profile/Profile.js';
import AuthWriter from './components/AuthCheck/AuthWriter.js';
import Navbar from './components/Navbar/Navbar.js';
import TaskPage from './components/Task/TaskPage.js';
import SearchTasks from './components/SearchTasks/SearchTasks.js';
import CreateTask from './components/CreateTask/CreateTask.js';
import ModifyTask from './components/ModifyTask/ModifyTask.js';
import ManageTasks from './components/ManageTasks/ManageTasks.js';
import Assignment from './components/Assignment/Assignment.js';
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
                    <Route path='/searchTasks' component={SearchTasks} timestamp={new Date().getTime()} />
                    <Route path='/task/:id' component={TaskPage} timestamp={new Date().getTime()} />
                    <AuthWriter back='/'>
                        <Route path='/createTask' component={CreateTask} timestamp={new Date().getTime()} />
                        <Route path='/manageTasks' component={ManageTasks} />
                        <Route path='/editTask' component={ModifyTask} />
                        <Route exact path='/profile' component={Profile} timestamp={new Date().getTime()} />
                        <Route path='/profile/:id' component={Profile} timestamp={new Date().getTime()} />
                        <Route path='/assignment/:id' component={Assignment} timestamp={new Date().getTime()} />
                    </AuthWriter>
                    <Route path='*' component={NotFound} />
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
