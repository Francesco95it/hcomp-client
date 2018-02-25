import axios from 'axios'

/*
* action types
*/

export const CREATE_ASSIGNMENT = 'CREATE_ASSIGNMENT'
export const FETCH_RUN = 'FETCH_RUN'
export const ADD_ANSWER = 'ADD_ANSWER'
export const SAVE_ASSIGNMENT = 'SAVE_ASSIGNMENT'
export const CONTINUE = 'CONTINUE'

/*
* other constants
*/


/*
* action creators
*/

export function add_answer(answer){
    return { type: ADD_ANSWER, payload: answer}
}

export function on_continue(){
    return { type: CONTINUE }
}

export function save_assignment(id, answers, isCompleted){
    console.log(isCompleted);
    return { type: SAVE_ASSIGNMENT, payload: axios.put(`/tasks/runs/assignments/${id}`, {answers: answers, is_completed: isCompleted})}
}

export function fetch_run(id){
    console.log(id);
    return { type: FETCH_RUN, payload: axios.get(`/tasks/runs/${id}`)}
}

export function create_assignment(ids){
    return { type: CREATE_ASSIGNMENT, payload: axios.post(`/tasks/runs/assignments`, {id_run: ids.run, id_worker:ids.worker, id_task: ids.task},{
        headers: {
            'Content-Type': 'application/json',
        }
    })}
}
