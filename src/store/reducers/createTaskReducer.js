function createTaskState(state = {
    task: {
        general: {
            title: "No name task",
            description: "",
            introduction: "",
            images: []
        },
        runs: [],
        collaborators: {
            list: [],
            users: [],
            fetching: false,
            fetched: false,
            error: null
        },
        tutorial: null,
        status: null,
    },
    uploading: false,
    uploaded: false,
    error: null
}, action) {

    switch (action.type) {

        case "SET_GENERAL":
        return {task: {...state.task, general: action.payload}};

        case "SET_GENERAL_TITLE":
        return {task: {...state.task, general: {title: (action.payload===""? "No name task" : action.payload )}}};

        case "SET_RUNS":
        return {task:{...state.task, runs: action.payload}};

        case "SET_COLLABORATORS":
        return {task:{...state.task, collaborators: {...state.task.collaborators, list: action.payload}}};

        case "SET_TUTORIAL":
        return {...state, task:{tutorial: action.payload}};

        case "SET_STATUS":
        return {...state, task:{status: action.payload}};

        case "UPLOAD_TASK_PENDING":
        return {...state, uploading:true, uploaded: false};

        case "UPLOAD_TASK_FULFILLED":
        return {...state, uploading:false, uploaded:true};

        case "UPLOAD_TASK_REJECTED":
        return {...state, uploading:false, error: action.payload};

        case "FETCH_USERS_PENDING":
        return {task:{...state.task, collaborators: {...state.task.collaborators, fetching: true}}};

        case "FETCH_USERS_FULFILLED":
        return {task:{...state.task, collaborators: {...state.task.collaborators, fetching: false, fetched:true, users: action.payload.data}}};

        case "FETCH_USERS_REJECTED":
        return {task:{...state.task, collaborators: {...state.task.collaborators, fetching: false, error: action.payload}}};

        default:
        return state
    }
}


export default createTaskState
