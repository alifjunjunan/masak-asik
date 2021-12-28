const INITIAL_STATE = {
    listResep: []
}

export const resepReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case "GET_DATA_RESEP":
            console.log("data dari action payload ==>", action.payload)
            return {
                ...state,
                listResep: action.payload
            }    
        
        default:
            return state;
    }
}