import { 
    NEW_CATEGORY_REQUEST,
    NEW_CATEGORY_SUCCESS,
    NEW_CATEGORY_RESET,
    NEW_CATEGORY_FAIL,
    ALL_CATEGORY_REQUEST,
    ALL_CATEGORY_SUCCESS,
    ALL_CATEGORY_FAIL,
    UPDATE_CATEGORY_REQUEST,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_RESET,
    UPDATE_CATEGORY_FAIL,
    DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAIL,
    DELETE_CATEGORY_RESET,
    CLEAR_ERRORS
}from "../constants/cateContants"

export const categoriesReducer = (state= {categories:[]},action)=>{
    switch(action.type){
        case ALL_CATEGORY_REQUEST:
            return{
                loading:true,
                ...state
            }
        case ALL_CATEGORY_SUCCESS:
            return {
                loading: false,
                ...state,
                categories:action.payload
            }
        case ALL_CATEGORY_FAIL:
            return{
                ...state,
                loading: false,
                error:action.payload
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null
            }
        default:
            return state
    }
}

export const newCategoryReducer = (state = {category:{}}, action) =>{
    switch(action.payload){
        case NEW_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true
            }
        case NEW_CATEGORY_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                category:action.payload.category
            }
        case NEW_CATEGORY_FAIL:
            return {
                loading: false,
                ...state,
                error: action.payload
            }
        case NEW_CATEGORY_RESET:
            return {
                ...state,
                success:true
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error: null
            }
        default:
            return state
    }
}

export const categoryReducer = (state = {},action) =>{
    switch(action.type){
        case DELETE_CATEGORY_REQUEST:
            return{
                ...state,
                loading:true
            }
        case DELETE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading:false,
                isDeleted: action.payload.success,
                message: action.payload.message
            }
        case DELETE_CATEGORY_FAIL:
            return {
                ...state,
                loading:false,
                error:action.payload
            }
        case DELETE_CATEGORY_RESET:
            return {
                ...state,
                isDeleted:false
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            }
        default:
            return state
    }
}