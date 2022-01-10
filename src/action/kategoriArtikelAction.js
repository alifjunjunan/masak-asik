import axios from "axios"
import { API_URL } from "../helper"

export const getKategoriArtikelAction = (kategori= null) => {

    return async (dispatch) => {

        try {
            let res
            if (kategori) {
                res = await axios.get(`${API_URL}/kategoriArtikel?q=${kategori}`)
            }else {
                res = await axios.get(`${API_URL}/kategoriArtikel`)
            }

            dispatch({
                type: "GET_KATEGORI_ARTIKEL",
                payload: res.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}
