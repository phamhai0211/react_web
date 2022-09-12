import axios from "axios"

import {
    ALL_CATEGORY_REQUEST,
    ALL_CATEGORY_SUCCESS,
    ALL_CATEGORY_FAIL,
    NEW_CATEGORY_REQUEST,
    NEW_CATEGORY_SUCCESS,
    NEW_CATEGORY_FAIL,
    NEW_CATEGORY_RESET,
    UPDATE_CATEGORY_REQUEST,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAIL,
    UPDATE_CATEGORY_RESET,
    DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAIL,
    DELETE_CATEGORY_RESET,
    CLEAR_ERRORS
} from "../constants/cateContants"

export const getCategories = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_CATEGORY_REQUEST })

        const { data } = await axios.get(`/api/categories`)
        // console.log(data)
        dispatch({
            type: ALL_CATEGORY_SUCCESS,
            payload: data.categories
        })

    } catch (error) {
        dispatch({
            type: ALL_CATEGORY_FAIL,
            payload: error.response.data.message
        })
    }
}
// new category
export const newCategory = (categoryData) => async (dispatch) => {
    try{
        dispatch({type:NEW_CATEGORY_REQUEST})

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const {data} = await axios.post(
            `/api/admin/category/new`,
            categoryData,
            config
        )
        dispatch({type: NEW_CATEGORY_SUCCESS,payload:data})
    }catch(error){
        dispatch({
            type:NEW_CATEGORY_FAIL,
            payload: error.response.data.message
        })
    }
}

//delete 
export const deleteCategory = (id) => async (dispatch) =>{
    try {
        dispatch({
            type:DELETE_CATEGORY_REQUEST
        })

        const {data} = await axios.delete(
            `/api/admin/category/${id}`
        )

        dispatch({
            type:DELETE_CATEGORY_SUCCESS,
            payload:data
        })
    }catch(error){
        dispatch({
            type:DELETE_CATEGORY_FAIL,
            payload:error.response.data.message
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({type: CLEAR_ERRORS})
}