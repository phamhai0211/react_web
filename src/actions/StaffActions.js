import axios from "axios"

import {
    ALL_STAFF_REQUEST,
    ALL_STAFF_SUCCESS,
    ALL_STAFF_FAIL,
    CLEAR_ERRORS,
    NEW_STAFF_REQUEST,
    NEW_STAFF_SUCCESS,
    NEW_STAFF_FAIL,
    NEW_STAFF_RESET,
    UPDATE_STAFF_REQUEST,
    UPDATE_STAFF_FAIL,
    UPDATE_STAFF_SUCCESS,
    UPDATE_STAFF_RESET,
    DELETE_STAFF_REQUEST,
    DELETE_STAFF_SUCCESS,
    DELETE_STAFF_FAIL,
    DELETE_STAFF_RESET,
    STAFF_DETAILS_REQUEST,
    STAFF_DETAILS_SUCCESS,
    STAFF_DETAILS_FAIL
} from "../constants/staffContants"

//get all staffs
export const getStaffs = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_STAFF_REQUEST })

        const { data } = await axios.get(`/api/admin/staffs`)

        dispatch({
            type: ALL_STAFF_SUCCESS,
            payload: data.staffs
        })
    } catch (error) {
        dispatch({
            type: ALL_STAFF_FAIL,
            payload: error.response.data.message
        })
    }
}

// create new staff
export const createStaff = (staffData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_STAFF_REQUEST })

        const config = {
            headers: { "Content-Type": "application/json" }
        }
        const { data } = await axios.post(
            `/api/admin/staff/new`,
            staffData,
            config
        )

        dispatch({ type: NEW_STAFF_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: NEW_STAFF_FAIL,
            payload: error.response.data.message
        })
    }
}
// update staff
export const updateStaff = (id, staffData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_STAFF_REQUEST })
        const config = {
            headers: { "Content-Type": "application/json" }
        }
        const { data } = await axios.put(
            `/api/admin/staff/${id}`,
            staffData,
            config
        )
        dispatch({ type: UPDATE_STAFF_SUCCESS, payload: data.success })
    } catch (error) {
        dispatch({
            type: UPDATE_STAFF_FAIL,
            payload: error.response.data.message
        })
    }

}

//delete staff 
export const deleteStaff = (id) => async (dispatch) => {
    try{
        dispatch({type:DELETE_STAFF_REQUEST})

        const {data} = await axios.delete(
            `/api/admin/staff/${id}`
        )
        dispatch({type:DELETE_STAFF_SUCCESS, payload:data.success})
    }
    catch(error){
        dispatch({
            type:DELETE_STAFF_FAIL,
            payload:error.response.data.message
        })
    }
}

// get details staff 
export const getStaffDetails = (id) => async (dispatch)=>{
    try{
        dispatch({type:STAFF_DETAILS_REQUEST})

        const {data} = await axios.get(`/api/admin/staff/${id}`)

        dispatch({
            type: STAFF_DETAILS_SUCCESS,
            payload:data.staff
        })
    }catch(error){
        dispatch({
            type:STAFF_DETAILS_FAIL,
            payload:error.response.data.message
        })
    }
}
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}