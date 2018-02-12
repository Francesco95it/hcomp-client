import axios from 'axios'

/*
* action types
*/

export const UPLOAD_TASK = 'UPLOAD_TASK'
export const FETCH_USERS = 'FETCH_USERS'
export const SET_GENERAL = 'SET_GENERAL'
export const SET_RUNS = 'SET_RUNS'
export const SET_COLLABORATORS = 'SET_COLLABORATORS'
export const SET_TUTORIAL = 'SET_TUTORIAL'
export const SET_STATUS = 'SET_STATUS'
export const SET_GENERAL_TITLE = 'SET_GENERAL_TITLE'
export const CREATE_TASK = 'CREATE_TASK'
export const DELETE_TASK = 'DELETE_TASK'

/*
* other constants
*/


/*
* action creators
*/


export function set_general(data) {
    return { type: SET_GENERAL, payload: data};
}

export function set_general_title(data) {
    return { type: SET_GENERAL_TITLE, payload: data};
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

export function create_task(id){
    return { type: CREATE_TASK, payload: axios.post(`/tasks`, {id_creator: id},{
        headers: {
            'Content-Type': 'application/json',
        }
    })}
}

export function delete_task(id){
    return { type: DELETE_TASK, payload: axios.delete(`/tasks/${id}`)}
}

export function fetch_users() {
    return { type: FETCH_USERS, payload: axios.get(`/users?filter=creator&parameter=true`)};
}

export function upload_task(task) {
    return { type: UPLOAD_TASK, payload: axios.put(`/tasks/${task.id}`, task)};
}
