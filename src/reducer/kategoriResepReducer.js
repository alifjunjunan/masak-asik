const INITIAL_STATE = {
    listKategoriResep : []
}


export const kategoriResepReducer = (state=INITIAL_STATE,action) => {

    switch (action.type) {
        case "GET_KATEGORI_RESEP":
            return {
                ...state,
                listKategoriResep: action.payload
            }
    
        default:
            return state;
    }
}