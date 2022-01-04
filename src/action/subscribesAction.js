import axios from "axios"
import { API_URL } from "../helper"


export const getSubscribesAction = () => {

    return async (dispatch) => {

        try {
            let res = await axios.get(`${API_URL}/productSubscribes`)

            dispatch({
                type: "GET_DATA_SUBSCRIBES",
                payload: res.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}