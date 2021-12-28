const INITIAL_STATE = {
    email: "",
    username: "",
    password: "",
    role: "",
    status: "",
    subcribe: "",
    favorit: []
}

export const userReducer = (state=INITIAL_STATE, action) => {

    switch (action.type) {
        case "REGISTER_SUCCESS":
            return {
                ...state,
                ...action.payload
            }
        case "LOGIN_SUCCESS":
            return {
                ...state,
                ...action.payload
            }
        case "LOGOUT_SUCCESS":
            return INITIAL_STATE
            
    
        default:
            return state;
    }
}