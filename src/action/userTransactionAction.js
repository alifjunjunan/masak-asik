import axios from "axios"
import { API_URL } from "../helper"


export const addUserTransaction = (data) => {

    return async (dispatch) => {

        try {
            let res = await axios.post(`${API_URL}/userTransaction`,data)
            dispatch({
                type: "ADD_DATA_TRANSACTION",
                payload: res.data
            })

            return {success: true}
        } catch (error) {
            console.log(error)
        }
    }
}

export const getUserTransaction = (status = null) => {

    return async (dispatch) => {

        try {
            let res
            
            if(status){
                res = await axios.get(`${API_URL}/userTransaction?status=${status}`)
            }else {
                res = await axios.get(`${API_URL}/userTransaction`)
            }

            dispatch({
                type: "GET_DATA_TRANSACTION",
                payload: res.data
            })

            return {success: true}
        } catch (error) {
            console.log(error)
        }
    }
}

export const updateUserTransaction = (data,id) => {

    return async (dispatch) => {

        try {
            let res = await axios.patch(`${API_URL}/userTransaction/${id}`, data)

            dispatch({
                type: "UPDATE_TRANSACTION_STATUS",
                payload: res.data
            })
            return {success: true}
        } catch (error) {
            console.log(error)
        }
    }
}