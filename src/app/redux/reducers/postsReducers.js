import { ALL_COMMENT_ERROR, ALL_COMMENT_REQUEST, ALL_COMMENT_SUCCESS, ALL_POST_ERROR, ALL_POST_REQUEST, ALL_POST_SUCCESS, CREATE_COMMENT_SUCCESS, CREATE_POST_ERROR, CREATE_POST_REQUEST, CREATE_POST_SUCCESS } from "../constants/postsConstants"

export const postsCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_POST_REQUEST:
            return { loading: true }
        case CREATE_POST_SUCCESS:
            return { loading: false, newPost: action.payload }
        case CREATE_POST_ERROR:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const postsReducer = (state = {}, action) => {
    switch (action.type) {
        case ALL_POST_REQUEST:
            return { loading: true }
        case ALL_POST_SUCCESS:
            return { loading: false, posts: action.payload }
        case ALL_POST_ERROR:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const commentReducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case CREATE_COMMENT_SUCCESS:
            return { commentLoading: false, createdComment: action.payload }
        default:
            return state
    }
}

