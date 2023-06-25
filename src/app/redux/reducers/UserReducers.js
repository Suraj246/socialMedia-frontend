import Cookies from "js-cookie";
import { INCREMENT, RESET, SINGLE_USER_ERROR, SINGLE_USER_REQUEST, SINGLE_USER_SUCCESS, USER_DETAILS_ERROR, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_LOGIN_ERROR, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_ERROR, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_UPDATE_ERROR, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS } from "../constants/UserConstants";

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true }
        case USER_REGISTER_SUCCESS:
            return { loading: false, user: action.payload }
        case USER_REGISTER_ERROR:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true }
        case USER_LOGIN_SUCCESS:
            return { loading: false, user: action.payload }
        case USER_LOGIN_ERROR:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const userDataReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return { loading: true }
        case USER_DETAILS_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_DETAILS_ERROR:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const userUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_REQUEST:
            return { loading: true }
        case USER_UPDATE_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_UPDATE_ERROR:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const singleUserDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case SINGLE_USER_REQUEST:
            return { loading: true }
        case SINGLE_USER_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case SINGLE_USER_ERROR:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


