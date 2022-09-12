import {
    NEW_BRAND_FAIL,
    NEW_BRAND_REQUEST,
    NEW_BRAND_RESET,
    NEW_BRAND_SUCCESS,
    ALL_BRAND_FAIL,
    ALL_BRAND_REQUEST,
    ALL_BRAND_SUCCESS,
    UPDATE_BRAND_FAIL,
    UPDATE_BRAND_REQUEST,
    UPDATE_BRAND_RESET,
    UPDATE_BRAND_SUCCESS,
    DELETE_BRAND_FAIL,
    DELETE_BRAND_REQUEST,
    DELETE_BRAND_RESET,
    DELETE_BRAND_SUCCESS,
    CLEAR_ERRORS
} from "../constants/brandContants"

export const brandsReducer = (state = { brands: [] }, action) => {
    switch (action.type) {
        case ALL_BRAND_REQUEST:
            return {
                loading: true,
                ...state
            }
        case ALL_BRAND_SUCCESS:
            return {
                loading: false,
                ...state,
                brands: action.payload
            }
        case ALL_BRAND_FAIL:
            return {
                ...state,
                loading: false,
               
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

export const newBrandReducer = (state = { brand: {} }, action) => {
    switch (action.payload) {
        case NEW_BRAND_REQUEST:
            return {
                ...state,
                loading: true
            }
        case NEW_BRAND_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                brand: action.payload.brand
            }
        case NEW_BRAND_FAIL:
            return {
                loading: false,
                ...state,
                error: action.payload
            }
        case NEW_BRAND_RESET:
            return {
                ...state,
                success: true
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

export const brandReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_BRAND_REQUEST:
            return {
                ...state,
                loading: true
            }
        case DELETE_BRAND_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
               
            }
        case DELETE_BRAND_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case DELETE_BRAND_RESET:
            return {
                ...state,
                isDeleted: false
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}