const INITIAL_STATE = {
    listSubscribes : []
}

export const subscribesReducer = (state = INITIAL_STATE,action) => {

    switch (action.type) {
        case "GET_DATA_SUBSCRIBES":
           return {
               ...state,
               listSubscribes: action.payload
           } 
            
    
        default:
            return state;
    }
}