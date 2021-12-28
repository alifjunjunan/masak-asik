import axios from "axios"
import { API_URL } from "../helper"

export const onRegist = (data) => {

    return async (dispatch) => {

        try {

            let res = await axios.post(`${API_URL}/user`,data)
 
            dispatch({
                type: "REGISTER_SUCCESS",
                payload: res.data[0]
            });
            
            return {success: true};

        } catch (error) {
            console.log(error.response.data)
        }
    }

}

export const onLogin = (data) => {

    return async (dispatch) => {

        try {
            
            let res = await axios.get(`${API_URL}/user?email=${data.email}&password=${data.password}`)
            console.log("isi login => ", res.data)
            if (res.data.length > 0) {
                localStorage.setItem("data", JSON.stringify(res.data[0]))
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: res.data[0]
                })
    
                return {success: true}
            }
        } catch (error) {
            console.log(error.response.data)
        }
    }
}

export const onKeepLogin = () => {

    return async (dispatch) => {

        try {
            let localData = localStorage.getItem("data")
            
            if (localData) {
                localData = JSON.parse(localData)

                let res = await axios.get(`${API_URL}/user?email=${localData.email}&password=${localData.password}`)

                if (res.data.length > 0) {
                    dispatch({
                        type: "LOGIN_SUCCESS",
                        payload: res.data[0]
                    });
                    
                localStorage.setItem("data", JSON.stringify(res.data[0]))
                return {success: true};
             }
            }
        } catch (error) {
            console.log(error.response.data)
        }
    }
}

export const onLogout = () => {

    return async (dispatch) => {

        localStorage.removeItem("data")

        dispatch({
            type: "LOGOUT_SUCCESS"
        })
        
    }
}