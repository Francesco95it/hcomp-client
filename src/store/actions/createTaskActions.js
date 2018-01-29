import axios from 'axios'

/*
* action types
*/

export const UPLOAD_TASK = 'UPLOAD_TASK'
export const SET_GENERAL = 'SET_GENERAL'
export const SET_RUNS = 'SET_RUNS'
export const SET_COLLABORATORS = 'SET_COLLABORATORS'
export const SET_TUTORIAL = 'SET_TUTORIAL'
export const SET_STATUS = 'SET_STATUS'

/*
* other constants
*/


/*
* action creators
*/


export function set_general(data) {
    return { type: SET_GENERAL, payload: data};
}

export function set_runs(data) {
    return { type: SET_RUNS, payload: data};
}

export function set_collaborators(data) {
    return { type: SET_COLLABORATORS, payload: data};
}

export function set_tutorial(data) {
    return { type: SET_TUTORIAL, payload: data};
}

export function set_status(data) {
    return { type: SET_STATUS, payload: data};
}

export function upload_task(data) {
    return { type: UPLOAD_TASK, payload: axios.post(`/tasks`, data)};
}
