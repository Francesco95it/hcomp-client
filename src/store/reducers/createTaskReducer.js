const taskStructure = {
    id: "",
    created: false,
    error: null,
    general: {
        name: "No name task",
        description: "",
        introduction: "",
        avatar: []
    },
    runs: [],
    collaborators: {
        list: [],
        users: [],
        fetching: false,
        fetched: false,
        error: null
    },
    tutorial: [],
    status: {
        is_live: false,
        is_public: false
    },
}

function createTaskState(state = {
    task: taskStructure,
    uploading: false,
    uploaded: false,
    error: null
}, action) {

    switch (action.type) {

        case "SET_GENERAL":
        return {...state, task: {...state.task, general: action.payload}};

        case "SET_GENERAL_NAME":
        return {...state, task: {...state.task, general: {name: (action.payload===""? "No name task" : action.payload )}}};

        case "SET_RUNS":
        return {...state, task:{...state.task, runs: action.payload}};

        case "SET_COLLABORATORS":
        return {...state, task:{...state.task, collaborators: {...state.task.collaborators, list: action.payload}}};

        case "SET_TUTORIAL":
        return {...state, task:{...state.task, tutorial: action.payload}};

        case "SET_STATUS":
        return {...state, task:{...state.task, status: action.payload}};

        case "DELETE_TASK_PENDING":
        return {...state};

        case "DELETE_TASK_FULFILLED":
        return {...state, task: taskStructure};

        case "DELETE_TASK_REJECTED":
        return {...state};

        case "CREATE_TASK_PENDING":
        return {...state, task:{...state.task, created: false, error: null}};

        case "CREATE_TASK_FULFILLED":
        return {...state, task:{...taskStructure, created: true, id: action.payload.data}};

        case "CREATE_TASK_REJECTED":
        return {...state, task:{...state.task, created: false, error: action.payload}};

        case "UPLOAD_TASK_PENDING":
        return {...state, uploading:true, uploaded: false};

        case "UPLOAD_TASK_FULFILLED":
        return {...state, uploading:false, uploaded:true};

        case "UPLOAD_TASK_REJECTED":
        return {...state, uploading:false, error: action.payload};

        case "FETCH_USERS_PENDING":
        return {...state, task:{...state.task, collaborators: {...state.task.collaborators, fetching: true, error: null}}};

        case "FETCH_USERS_FULFILLED":
        return {...state, task:{...state.task, collaborators: {...state.task.collaborators, fetching: false, fetched:true, users: action.payload.data}}};

        case "FETCH_USERS_REJECTED":
        return {...state, task:{...state.task, collaborators: {...state.task.collaborators, fetching: false, error: action.payload}}};

        default:
        return state
    }
}


export default createTaskState
