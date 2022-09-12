import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    CLEAR_ERRORS,
    REGISTER_USER_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_RESET,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_RESET,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_RESET,
    DELETE_USER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL
} from "../constants/userContants"

import axios from "axios"
//login
export const login = (email, password) => async (dispath) => {
    try {
        dispath({
            type: LOGIN_REQUEST
        })

        const config = { headers: { "Content-Type": "application/json" } }

        const { data } = await axios.post(
            `api/user/login`,
            { email, password },
            config
        )
        dispath({ type: LOGIN_SUCCESS, payload: data.user })
    } catch (error) {
        dispath({ type: LOGIN_FAIL, payload: error.response.data.message })
    }
}
// register 

export const register = (userData) => async (dispath) => {
    try {
        dispath({
            type: REGISTER_USER_REQUEST
        })

        const config = { headers: { "Content-Type": "multipart/form-data" } }

        const { data } = await axios.post(
            `api/user/register`,
            userData,
            config,

        )
        dispath({ type: REGISTER_USER_SUCCESS, payload: data.user })
    } catch (error) {
        dispath({ type: REGISTER_USER_FAIL, payload: error.response.data.message })
    }

}

//load user  
export const loadUser = () => async (dispath) => {
    try {
        dispath({
            type: LOAD_USER_REQUEST
        })

        const { data } = await axios.get(`/api/user/me`)

        dispath({ type: LOAD_USER_SUCCESS, payload: data.user })
    } catch (error) {
        dispath({ type: LOAD_USER_FAIL, payload: error.response.data.message })
    }
}

//logout user 

export const logOut = () => async (dispath) => {
    try {
        await axios.get(`/api/user/logout`)
        dispath({ type: LOGOUT_SUCCESS })
    } catch (error) {
        dispath({ type: LOGOUT_FAIL, payload: error.response.data.message })
    }
}

// update profile 

export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST });

        const config = { headers: { "Content-Type": "multipart/form-data" } };

        const { data } = await axios.put(`/api/user/me/update`, userData, config);

        dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data.message,
        });
    }
};

// update password 
export const updatePassword = (passwords) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PASSWORD_REQUEST })

        const config = { headers: { 'Content-Type': 'application/json' } }

        const { data } = await axios.put(`/api/user/password/update`, passwords, config)

        dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success })
    } catch (error) {
        dispatch({ type: UPDATE_PASSWORD_FAIL, payload: error.response.data.message })
    }
}

//forgot password
export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({ type: FORGOT_PASSWORD_REQUEST })

        const config = { headers: { 'Content-Type': 'application/json' } }

        const { data } = await axios.post(`/api/user/password/forgot`, email, config)

        dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message })
    } catch (error) {
        dispatch({ type: FORGOT_PASSWORD_FAIL, payload: error.response.data.message })
    }
}


// reset password 
export const resetPassword = (token, passwords) => async (dispatch) => {
    try {
        dispatch({ type: RESET_PASSWORD_REQUEST })

        const config = { headers: { 'Content-Type': 'application/json' } }

        const { data } = await axios.put(`/api/user/password/reset/${token}`, passwords, config)

        dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success })
    } catch (error) {
        dispatch({ type: RESET_PASSWORD_FAIL, payload: error.response.data.message })
    }
}
//get all user  
export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_USERS_REQUEST })

        const { data } = await axios.get(`/api/admin/users`)
        dispatch({ type: ALL_USERS_SUCCESS, payload: data.users })
    } catch (error) {
        dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.message })
    }
}
//update user 
export const updateUser = (id, userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_USER_REQUEST })

        const config = { headers: { 'Content-Type': 'application/json' } }
        const { data } = await axios.put(
            `/api/admin/user/${id}`,
            userData,
            config
        )
        dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success })
    } catch (errror) {
        dispatch({ type: UPDATE_USER_FAIL, payload: errror.response.data.message })
    }
}
// delete User 
export const deleteUser = (id) => async (dispatch) => {
    try{
        dispatch({type:DELETE_USER_REQUEST})

        const {data} = await axios.delete(
            `/api/admin/user/${id}`
        )
        dispatch({type:DELETE_USER_SUCCESS,payload:data})
    }catch(error){
        dispatch({ type:DELETE_USER_FAIL, payload:error.response.data.message})
    }
}
//gel user detail
export const getUserDetails = (id) => async(dispatch) => {
    try{
        dispatch({type:USER_DETAILS_REQUEST})

        const {data} = await axios.get(`/api/admin/user/${id}`)
        dispatch({type:USER_DETAILS_SUCCESS,payload:data.user})
    }catch(error){
        dispatch({
            type:USER_DETAILS_FAIL,
            payload:error.response.data.message
        })
    }
}
export const clearErrors = () => async (dispath) => {
    dispath({ type: CLEAR_ERRORS })
}