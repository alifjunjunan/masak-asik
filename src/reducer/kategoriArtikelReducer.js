const INITIAL_STATE = {
    listKategoriArtikel : []
}


export const kategoriArtikelReducer = (state=INITIAL_STATE,action) => {

    switch (action.type) {
        case "GET_KATEGORI_ARTIKEL":
            return {
                ...state,
                listKategoriArtikel: action.payload
            }
    
        default:
            return state;
    }
}