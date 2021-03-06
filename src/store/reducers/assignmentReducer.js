
function createTaskState(state = {
    assignment: {
        answers: [],
        id: false
    },
    runData: false,
    uploading: false,
    uploaded: false,
    error: false
}, action) {

    switch (action.type) {

        case 'ADD_ANSWER':
        return {...state, assignment: {...state.assignment, answers: [...state.assignment.answers, action.payload]}}

        case 'CONTINUE':
        return {...state, uploaded: false}

        case "CREATE_ASSIGNMENT_PENDING":
        return {
                assignment: {
                    answers: [],
                    id: false,
                },
                runData: false,
                updloading: false,
                uploaded: false,
                error: false
            };

        case "CREATE_ASSIGNMENT_FULFILLED": {
            let answers = [];
            let id = action.payload.data;
            if(action.payload.data.answers){
                answers = action.payload.data.answers;
                id = action.payload.data.id;
            }
            return {...state,
                assignment: {
                    answers: answers,
                    id: id
                }
            };
        }

        case "CREATE_ASSIGNMENT_REJECTED":
        return {...state, error: true};

        case "FETCH_RUN_PENDING":
        return {...state};

        case "FETCH_RUN_FULFILLED":
        return {...state, runData: action.payload.data};

        case "FETCH_RUN_REJECTED":
        return {...state, error: true};

        case "SAVE_ASSIGNMENT_PENDING":
        return {...state, uploading: true};

        case "SAVE_ASSIGNMENT_FULFILLED":
        return {...state, uploaded: true, uploading: false };

        case "SAVE_ASSIGNMENT_REJECTED":
        return {...state, error: true, uploading: false};

        default:
        return state
    }
}


export default createTaskState
