import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    CLEAR_ERRORS,
    MY_ORDERS_FAIL,
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS,
    ALL_ORDERS_FAIL,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAIL,
    UPDATE_ORDER_RESET,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAIL,
    DELETE_ORDER_RESET,
    REFUND_ORDER_REQUEST,
    REFUND_ORDER_FAIL,
    REFUND_ORDER_SUCCESS
} from "../constants/orderContants"

import axios from "axios"

export const createOrder = (order) => async (dispath) => {
    try {
        dispath({ type: CREATE_ORDER_REQUEST })

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const { data } = await axios.post("/api/order/new", order, config)
        dispath({ type: CREATE_ORDER_SUCCESS, payload: data })
    } catch (error) {
        dispath({
            type: CREATE_ORDER_FAIL,
            error: error.response.data.message
        })
    }
}

export const myOrders = () => async (dispath) => {
    try {
        dispath({ type: MY_ORDERS_REQUEST })

        const { data } = await axios.get("/api/orders/me")

        dispath({ type: MY_ORDERS_SUCCESS, payload: data.orders })
    } catch (error) {
        dispath({
            type: MY_ORDERS_FAIL,
            error: error.response.data.message
        })
    }
}

export const getOrderDetails = (id) => async (dispath) => {
    try {
        dispath({ type: ORDER_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/order/${id}`)
        dispath({ type: ORDER_DETAILS_SUCCESS, payload: data.order })
    } catch (error) {
        dispath({ type: ORDER_DETAILS_FAIL, payload: error.response.data.message })
    }
}

// GET ALL ORDERS (ADMIN)
export const getAllOrders = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_ORDERS_REQUEST })

        const { data } = await axios.get(`/api/admin/orders`)
        dispatch({ type: ALL_ORDERS_SUCCESS, payload: data.orders })
    } catch (error) {
        dispatch({ type: ALL_ORDERS_FAIL, payload: error.response.data.message })
    }
}

// update order  
export const updateOrder = (id, order) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_ORDER_REQUEST })

        const config = {
            headers: { 'Content-Type': 'application/json' }
        }

        const {data} = await axios.put(
            `/api/admin/order/${id}`,
            order,
            config
        )
        dispatch({type:UPDATE_ORDER_SUCCESS,payload:data.success})
    }catch (error) {
        dispatch({type:UPDATE_ORDER_FAIL, payload:error.response.data.message})
    }
}

// delete order  
export const deleteOrder = (id) => async (dispatch) =>{
    try{
        dispatch({type:DELETE_ORDER_REQUEST})
        const {data} = await axios.delete(
            `/api/admin/order/${id}`
        )
        dispatch({type:DELETE_ORDER_SUCCESS,payload:data.success})
    }catch(error){
        dispatch({type:DELETE_ORDER_FAIL, payload:error.response.data.message})
    }
}
// update refund
export const refundOrder = (email,orderId) => async(dispatch) =>{
    try{
        dispatch({type:REFUND_ORDER_REQUEST})

        const config = {headers:{'Content-Type': 'application/json' }}

        const {data} = await axios.post(`/api/order/refund/${orderId}`,email,config)

        dispatch({type: REFUND_ORDER_SUCCESS, payload:data.message})
    }catch(error){
        dispatch({type:REFUND_ORDER_FAIL,payload: error.response.data.message})
    }
}
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}