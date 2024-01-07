"use client"

import filterSlice from "./filterSlice"
import { singleUserDetailsReducer, userDataReducer, userLoginReducer, userRegisterReducer, userUpdateReducer } from "./reducers/UserReducers"
import { commentReducer, postsCreateReducer, postsReducer } from "./reducers/postsReducers"

const { configureStore, combineReducers} = require("@reduxjs/toolkit")

const initialState = {
    count: 0,

}



const reducer = combineReducers({
    userRegister: userRegisterReducer,
    userLogin: userLoginReducer,
    userData: userDataReducer,
    userUpdate: userUpdateReducer,
    createdPosts: postsCreateReducer,
    posts: postsReducer,
    createComment: commentReducer,
    singleUser: singleUserDetailsReducer,
productFilter:filterSlice

})


const store = configureStore({
    reducer, initialState
})

export default store