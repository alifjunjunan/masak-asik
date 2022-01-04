import axios from "axios"
import { API_URL } from "../helper"


export const getResepAction = () => {

    return async (dispatch) => {

        try {
            let res;

            res =  await axios.get(`${API_URL}/resep`)

            // console.log("data resep =>", res.data)

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

export const updateResepAction = (data,id) => {

    return async (dispatch) => {

        try {
            let res = await axios.patch(`${API_URL}/resep/${id}`,data)

            dispatch({
                type: "UPDATE_DATA_RESEP",
                payload: res.data
            })

            return {success: true}
        } catch (error) {
            console.log(error)
        }
    }
}

export const deleteResepAction = (id) => {

    return async (dispatch) => {

        try {
            let res = await axios.delete(`${API_URL}/resep/${id}`)

            dispatch({
                type: "DELETE_DATA_RESEP"
            })

            return {success: true}

        } catch (error) {
            console.log(error)
        }
    }
}