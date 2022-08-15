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
    ORDER_DETAILS_FAIL
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

        const {data} = await axios.get("/api/orders/me")

        dispath({type:MY_ORDERS_SUCCESS, payload:data.orders})
    } catch (error) {
        dispath({
            type: MY_ORDERS_FAIL,
            error: error.response.data.message
        })
    }
}

export const getOrderDetails = (id) => async (dispath)=>{
    try{
        dispath({type:ORDER_DETAILS_REQUEST})

        const {data} = await axios.get(`/api/order/${id}`)
        dispath({type:ORDER_DETAILS_SUCCESS, payload: data.order})
    }catch(error){
        dispath({type:ORDER_DETAILS_FAIL, payload: error.response.data.message})
    }
}
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}