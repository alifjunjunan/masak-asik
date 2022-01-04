const INITIAL_STATE = {
    email: "",
    username: "",
    password: "",
    role: "",
    status: "",
    transaction: [],
    subscribe: [],
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

        case "UPDATE_TRANSACTION_USER": 
            return{
                ...state,
                transaction: action.payload
            }
        case "UPDATE_SUBSCRIBE_USER":
            return {
                ...state,
                subscribe: action.payload
            }
        
        default:
            return state;
    }
}