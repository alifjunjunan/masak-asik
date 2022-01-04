const INITIAL_STATE = {
    listResep: []
}

export const resepReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case "GET_DATA_RESEP":
            // console.log("data dari action payload ==>", action.payload)
            return {
                ...state,
                listResep: action.payload
            }    
        case "ADD_DATA_RESEP":
            return{
                ...state,
                ...action.payload
            }
        case "UPDATE_DATA_RESEP":
            return {
                ...state,
                ...action.payload
            }
        case "DELETE_DATA_RESEP":
            return{
                ...state
            }
        default:
            return state;
    }
}