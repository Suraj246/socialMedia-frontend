import axios from "axios"
import { INCREMENT, RESET, SINGLE_USER_ERROR, SINGLE_USER_REQUEST, SINGLE_USER_SUCCESS, USER_DETAILS_ERROR, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_LOGIN_ERROR, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_REGISTER_ERROR, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_UPDATE_ERROR, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS } from "../constants/UserConstants"
import { api } from "@/app/api"
import Cookies from "js-cookie"

export const userRegisterApi = (username, email, password) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: username, email, password })
    try {
        const { data } = await axios.post(`${api}/user/signup`, { username: username, password: password, email: email })
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data })

    } catch (error) {
        dispatch({ type: USER_REGISTER_ERROR, payload: error.message })
    }
}

export const userLoginApi = (username, password) => async (dispatch) => {
    
    dispatch({ type: USER_LOGIN_REQUEST, payload: username, password })
    
    try {
        const { data } = await axios.post(`${api}/user/login`, { username: username, password: password })
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
        Cookies.set('user', JSON.stringify(data))
        localStorage.setItem("user",JSON.stringify(data.token))

    } catch (error) {
        dispatch({ type: USER_LOGIN_ERROR, payload: error.message })
    }
}

export const userApi = () => async (dispatch) => {
    dispatch({ type: USER_DETAILS_REQUEST })
    const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : {}
    try {
        const { data } = await axios.get(`${api}/user/get-data/${user?.userId}`,
            { headers: { "authorization": `${user?.token}` } }
        )
        dispatch({ type: USER_DETAILS_SUCCESS, payload: data })

    } catch (error) {
        dispatch({ type: USER_DETAILS_ERROR, payload: error.message })
    }
}

export const userUpdateApi = (formData) => async (dispatch) => {
    dispatch({ type: USER_UPDATE_REQUEST, payload: formData })
    const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : {}
    try {
        const { data } = await axios.put(`${api}/user/update/${user?.userId}`, formData,
            { headers: { "authorization": `${user?.token}` } }
        )
        dispatch({ type: USER_UPDATE_SUCCESS, payload: data })

    } catch (error) {
        dispatch({ type: USER_UPDATE_ERROR, payload: error.message })
    }
}


export const storeUserPostApi = (postId) => async (dispatch) => {
    const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : {}
    try {
        const { data } = await axios.put(`${api}/user/posts/${user?.userId}`, { postId: postId },
            { headers: { "authorization": `${user?.token}` } }
        )


    } catch (error) {
        console.log(error)
    }
}

export const UserDataApi = (id) => async (dispatch) => {
    dispatch({ type: SINGLE_USER_REQUEST })
    const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : {}
    try {
        const { data } = await axios.get(`${api}/user/${id}`,
            { headers: { "authorization": `${user?.token}` } }
        )
        dispatch({ type: SINGLE_USER_SUCCESS, payload: data })

    } catch (error) {
        dispatch({ type: SINGLE_USER_ERROR, payload: error.message })
    }
}

export const storeFriendIdApi = (friendId) => async (dispatch) => {
    const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : {}
    try {
        const { data } = await axios.put(`${api}/user/update/friend/${user?.userId}`, { friendId: friendId },
            { headers: { "authorization": `${user?.token}` } }
        )


    } catch (error) {
        console.log(error)
    }
}

export const removeFriendIdApi = (friend_index) => async (dispatch) => {
    const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : {}
    try {
        const { data } = await axios.delete(`${api}/user/${user?.userId}/${friend_index}`,
            { headers: { "authorization": `${user?.token}` } }
        )
    } catch (error) {
        console.log(error)
    }
}