import axios from "axios"
import { ALL_COMMENT_ERROR, ALL_COMMENT_REQUEST, ALL_COMMENT_SUCCESS, ALL_POST_ERROR, ALL_POST_REQUEST, ALL_POST_SUCCESS, CREATE_COMMENT_SUCCESS, CREATE_POST_ERROR, CREATE_POST_REQUEST, CREATE_POST_SUCCESS } from "../constants/postsConstants"
import { api } from "@/app/api"
import Cookies from "js-cookie"

export const createPostApi = (formData) => async (dispatch) => {
    dispatch({ type: CREATE_POST_REQUEST, payload: formData })
    try {
        const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : {}

        const { data } = await axios.post(`${api}/user/posts/create`, formData,
            { headers: { "authorization": `${user?.token}` } }
        )
        dispatch({ type: CREATE_POST_SUCCESS, payload: data })
        console.log(data)

    } catch (error) {
        dispatch({ type: CREATE_POST_ERROR, payload: error.message })
    }
}

export const allPostApi = () => async (dispatch) => {
    dispatch({ type: ALL_POST_REQUEST })
    const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : {}

    try {
        const { data } = await axios.get(`${api}/user/posts/posts`,
            { headers: { "authorization": `${user?.token}` } }
        )
        dispatch({ type: ALL_POST_SUCCESS, payload: data })

    } catch (error) {
        dispatch({ type: ALL_POST_ERROR, payload: error.message })
    }
}

export const postLikeApi = (postId) => async (dispatch) => {

    const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : {}
    try {
        const { data } = await axios.put(`${api}/user/posts/like/${postId}`, { userId: user?.userId },
            { headers: { "authorization": `${user?.token}` } }
        )

    } catch (error) {
        console.log(error)
    }
}

export const createCommentApi = (comment) => async (dispatch) => {

    const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : {}
    try {
        const { data } = await axios.post(`${api}/user/post/create/comment/`, { userId: user?.userId, title: comment },
            { headers: { "authorization": `${user?.token}` } }
        )
        dispatch({ type: CREATE_COMMENT_SUCCESS, payload: data })

    } catch (error) {
        console.log(error)
    }
}


export const postCommentApi = (postId, commentId) => async (dispatch) => {
    const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : {}
    try {
        const { data } = await axios.put(`${api}/user/post/comment/${postId}`, { commentId: commentId },
            { headers: { "authorization": `${user?.token}` } }
        )


    } catch (error) {
        console.log(error.message)
    }
}


export const postDeleteApi = (post_index, postId) => async (dispatch) => {
    const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : {}
    try {
        const { data } = await axios.delete(`${api}/user/posts/${user?.userId}/${postId}/${post_index}`,
            { headers: { "authorization": `${user?.token}` } }
        )


    } catch (error) {
        console.log(error.message)
    }
}


