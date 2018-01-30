function createTaskState(state = {
    task: {
        general: {
            title: "No name task",
            description: "",
            introduction: "",
            images: []
        },
        runs: [],
        collaborators: null,
        tutorial: null,
        status: null,
    },
    uploading: false,
    uploaded: false,
    error: null
}, action) {

    switch (action.type) {

        case "SET_GENERAL":
        return {...state, task: {general: action.payload}};

        case "SET_RUNS":
        return {...state, task:{runs: action.payload}};

        case "SET_COLLABORATORS":
        return {...state, task:{collaborators: action.payload}};

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

        default:
        return state
    }
}


export default createTaskState
