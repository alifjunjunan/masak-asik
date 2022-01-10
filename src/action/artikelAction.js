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

export const getArtikelAction = (kategori = null,artikel = null) => {

    return async (dispatch) => {
        
        try {
            let res

            if (artikel) {
                if (kategori) {
                   res = await axios.get(`${API_URL}/artikel?kategori=${kategori}&q=${artikel}`)
                }
                    res = await axios.get(`${API_URL}/artikel?q=${artikel}`)
            } else if (kategori) {
                res = await axios.get(`${API_URL}/artikel?kategori=${kategori}`)
            } else {
                res = await axios.get(`${API_URL}/artikel?_sort=id&_order=desc`)
            }
           
            dispatch({
                type: "GET_ARTIKEL_SUCCESS",
                payload: res.data
            })

            return {success: true}
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