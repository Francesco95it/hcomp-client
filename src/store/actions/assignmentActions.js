import axios from 'axios'

/*
* action types
*/

export const CREATE_ASSIGNMENT = 'CREATE_ASSIGNMENT'
export const FETCH_RUN = 'FETCH_RUN'

/*
* other constants
*/


/*
* action creators
*/

export function fetch_run(id){
    return { type: FETCH_RUN, payload: axios.get(`/tasks/runs?filter=id_task&parameter=${id}`)}
}

export function create_assignment(ids){
    return { type: CREATE_ASSIGNMENT, payload: axios.post(`/tasks/runs/assignments`, {id_run: ids.run, id_worker:ids.worker},{
        headers: {
            'Content-Type': 'application/json',
        }
    })}
}
