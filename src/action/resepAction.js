import axios from "axios"
import { API_URL } from "../helper"


export const getResepAction = () => {

    return async (dispatch) => {

        try {
            let res;

            res =  await axios.get(`${API_URL}/resep`)

            console.log("data resep =>", res.data)

            dispatch({
                type: "GET_DATA_RESEP",
                payload: res.data
            })

            // return {success: true}

        } catch (error) {
            console.log(error)
        }
    }
}

export const addResepAction = (data) => {

    return async (dispatch) => {

        try {
            let res = await axios.post(`${API_URL}/resep`,data)

            dispatch({
                type: "ADD_DATA_RESEP",
                payload: res.data
            })

            return {success: true}
        } catch (error) {
            console.log(error)
        }
    }
}