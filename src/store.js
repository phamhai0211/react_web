import thunk from "redux-thunk"
import React from "react"
import { createStore, applyMiddleware, combineReducers } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import { 
    productsReducer, 
    productDetailReducer,
    newReviewReducer,
    newProductReducer
} from "./reducer/productReducer"
import {
    userReducer,
    profileReducer,
    forgotPasswordReducer
} from "./reducer/userReducer"
import { cartReducer } from "./reducer/cartReducer"
import { myOrdersReducer, newOrderReducer, orderDetailsReducer } from './reducer/orderReducer';
const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder : newOrderReducer,
    myOrders : myOrdersReducer,
    orderDetails:orderDetailsReducer,
    newReview: newReviewReducer,
    newProduct: newProductReducer
})

let initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems")
            ? JSON.parse(localStorage.getItem("cartItems"))
            : [],
        shippingInfo: localStorage.getItem("shippingInfo")
            ? JSON.parse(localStorage.getItem("shippingInfo"))
            : []
    }
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store  