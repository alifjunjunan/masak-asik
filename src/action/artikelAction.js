import axios from "axios"
import { API_URL } from "../helper"

export const addArtikelAction = (data) => {

    return async (dispatch) => {

        try {
            let res = await axios.post(`${API_URL}/artikel`,data)

            dispatch({
                type: "ADD_ARTIKEL_SUCCESS",
                payload: res.data
            })

            return {success: true}
        } catch (error) {
            console.log(error)
        }
    }
}

export const getArtikelAction = () => {

    return async (dispatch) => {
        
        try {
            let res = await axios.get(`${API_URL}/artikel`)
            console.log("data artikel =>", res.data)
            dispatch({
                type: "GET_ARTIKEL_SUCCESS",
                payload: res.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const updateArtikelAction = (data,id) => {
    
    return async (dispatch) => {

        try {
            let res =  await axios.patch(`${API_URL}/artikel/${id}`,data)

            dispatch({
                type: "UPDATE_ARTIKEL_SUCCESS",
                payload: res.data
            })

            return {success: true}
        } catch (error) {
            console.log(error)
        }
    }
}

export const deleteArtikelAction = (id) => {

    return async (dispatch) => {

        try {
            let res = await axios.delete(`${API_URL}/artikel/${id}`)

            dispatch({
                type: "DELETE_ARTIKEL_SUCCESS"
            })

            return {success: true}
        } catch (error) {
            console.log(error)
        }
    }
}