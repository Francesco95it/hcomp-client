function userState(state = {
    user: null,
    fetching: false,
    fetched: false,
    error: null
}, action) {

    switch (action.type) {

        case "FETCH_USER_PENDING":
        return {...state, fetching:true, fetched: false, error: false};

        case "FETCH_USER_FULFILLED":
        return {...state, fetching:false, fetched:true, user: action.payload.data};

        case "FETCH_USER_REJECTED":
        return {...state, fetching:false, error: action.payload};

        default:
        return state
    }
}


export default userState
