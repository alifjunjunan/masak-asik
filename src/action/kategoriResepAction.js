import axios from "axios"
import { API_URL } from "../helper"

export const getKategoriResepAction = (kategori= null) => {

    return async (dispatch) => {

        try {
            let res
            if (kategori) {
                res = await axios.get(`${API_URL}/kategoriResep?q=${kategori}`)
            }else {
                res = await axios.get(`${API_URL}/kategoriResep`)
            }

            dispatch({
                type: "GET_KATEGORI_RESEP",
                payload: res.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}
