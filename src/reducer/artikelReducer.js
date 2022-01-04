const INITIAL_STATE = {
    listArtikel : []
}

export const artikelReducer = (state=INITIAL_STATE, action) => {

    switch (action.type) {
        case "ADD_ARTIKEL_SUCCESS":
            return {
                ...state,
                ...action.payload
            }
        case "GET_ARTIKEL_SUCCESS":
            return {
                ...state,
                listArtikel: action.payload
            }
        case "UPDATE_ARTIKEL_SUCCESS":
            return {
                ...state,
                ...action.payload
            }
        case "DELETE_ARTIKEL_SUCCESS": 
            return {
                ...state
            }
            
        default:
            return state;
    }
}