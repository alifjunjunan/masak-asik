import axios from "axios"
import { API_URL } from "../helper"


export const getResepAction = (kategori=null,search=null) => {

    return async (dispatch) => {

        try {
            let res;

            if (search) {
                if(kategori) {
                    res = await axios.get(`${API_URL}/resep?kategori=${kategori}&q=${search}`)
                } else {
                    res = await axios.get(`${API_URL}/resep?q=${search}`)
                }
            } else if (kategori) {
                res = await axios.get(`${API_URL}/resep?kategori=${kategori}`)
            }else  {
                res =  await axios.get(`${API_URL}/resep?_sort=id&_order=desc`)
            }

            // console.log("data resep =>", res.data)

            dispatch({
                type: "GET_DATA_RESEP",
                payload: res.data
            })

            return {success: true}

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

export const sortResepAction = (kategori=null,search=null) => {

    return async (dispatch) => {
        let res
        try {
            if (search) {
                if(kategori) {
                    res = await axios.get(`${API_URL}/resep?kategori=${kategori}&q=${search}`)
                    
                    // console.log("data lengkap =>",res.data)
                } else {
                    res = await axios.get(`${API_URL}/resep?q=${search}`)
                }
            } else {
                res =  await axios.get(`${API_URL}/resep?_sort=id&_order=desc`)
            }

            console.log("isi seacrh =>",search, kategori)

            dispatch({
                type: "GET_DATA_RESEP",
                payload: res.data
            })

            return {success: true, search}
        } catch (error) {
            console.log(error)
        }
    }
}