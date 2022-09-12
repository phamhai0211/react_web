import axios from "axios"

import {
    ALL_BRAND_REQUEST,
    ALL_BRAND_SUCCESS,
    ALL_BRAND_FAIL,
    NEW_BRAND_REQUEST,
    NEW_BRAND_RESET,
    NEW_BRAND_SUCCESS,
    NEW_BRAND_FAIL,
    UPDATE_BRAND_REQUEST,
    UPDATE_BRAND_RESET,
    UPDATE_BRAND_SUCCESS,
    UPDATE_BRAND_FAIL,
    DELETE_BRAND_FAIL,
    DELETE_BRAND_REQUEST,
    DELETE_BRAND_SUCCESS,
    DELETE_BRAND_RESET,
    CLEAR_ERRORS    
} from "../constants/brandContants"

export const getBrands = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_BRAND_REQUEST })

        const { data } = await axios.get(`/api/brands`)
        // console.log(data)
        dispatch({
            type: ALL_BRAND_SUCCESS,
            payload: data.brands
        })

    } catch (error) {
        dispatch({
            type: ALL_BRAND_FAIL,
            payload: error.response.data.message
        })
    }
}

export const createBrand = (brandData) => async (dispatch) => {
    try{
        dispatch({type:NEW_BRAND_REQUEST})

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const {data} = await axios.post(
            `/api/admin/brand/new`,
            brandData,
            config
        )
        dispatch({type: NEW_BRAND_SUCCESS,payload:data})
    }catch(error){
        dispatch({
            type:NEW_BRAND_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteBrand = (id) => async (dispatch) =>{
    try {
        dispatch({
            type:DELETE_BRAND_REQUEST
        })

        const {data} = await axios.delete(
            `/api/admin/brand/${id}`
        )

        dispatch({
            type:DELETE_BRAND_SUCCESS,
            payload:data.success
        })
    }catch(error){
        dispatch({
            type:DELETE_BRAND_FAIL,
            payload:error.response.data.message
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({type: CLEAR_ERRORS})
}