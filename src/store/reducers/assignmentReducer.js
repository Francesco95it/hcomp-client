
function createTaskState(state = {
    assignment: {
        answers: [],
        id: null
    },
    runData: [],
    uploading: false,
    uploaded: false,
    error: false
}, action) {

    switch (action.type) {

        case "CREATE_ASSIGNMENT_PENDING":
        return {...state};

        case "CREATE_ASSIGNMENT_FULFILLED":
        return {...state, assignment: {...state.assignment, id: action.payload.data}};

        case "CREATE_ASSIGNMENT_REJECTED":
        return {...state, error: true};

        case "FETCH_RUN_PENDING":
        return {...state};

        case "FETCH_RUN_FULFILLED":
        return {...state, runData: action.payload.data};

        case "FETCH_RUN_REJECTED":
        return {...state, error: true};

        default:
        return state
    }
}


export default createTaskState
