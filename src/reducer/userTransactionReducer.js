const INITIAL_STATE = {
    listTransaction : []
}

export const userTransactionReducer = (state=INITIAL_STATE,action) => {
    switch (action.type) {
        case "ADD_DATA_TRANSACTION":
          return {
              ...state,
              ...action.payload
          }
        case "GET_DATA_TRANSACTION":
            return {
                ...state,
                listTransaction: action.payload
            }
        case "UPDATE_TRANSACTION_STATUS":
            return {
                ...state,
                ...action.payload
            }
    
        default:
            return state;
    }
}