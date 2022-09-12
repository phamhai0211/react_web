import thunk from "redux-thunk"
import React from "react"
import { createStore, applyMiddleware, combineReducers } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import {
    productsReducer,
    productDetailReducer,
    newReviewReducer,
    newProductReducer,
    productReducer,
    productReviewsReducer,
    reviewReducer
} from "./reducer/productReducer"
import {
    userReducer,
    profileReducer,
    forgotPasswordReducer,
    allUsersReducer,
    userDetailsReducer
} from "./reducer/userReducer"
import {
    categoriesReducer,
    newCategoryReducer,
    categoryReducer
} from "./reducer/categoryReducer"
import { cartReducer } from "./reducer/cartReducer"
import {
    allOrdersReducer,
    myOrdersReducer,
    newOrderReducer,
    orderDetailsReducer,
    orderReducer,
    refundOrderReducer
} from './reducer/orderReducer';
import {
    staffsReducer,
    newStaffReducer,
    staffReducer,
    staffDetailReducer
} from "./reducer/staffReducer"
import {
    brandsReducer,
    brandReducer,
    newBrandReducer
} from "./reducer/brandReducer"
const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailReducer,
    categories: categoriesReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
    newProduct: newProductReducer,
    product: productReducer,
    newCategory: newCategoryReducer,
    allOrders: allOrdersReducer,
    order: orderReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    staffs: staffsReducer,
    productReviews: productReviewsReducer,
    review: reviewReducer,
    newStaff: newStaffReducer,
    staff: staffReducer,
    staffDetail: staffDetailReducer,
    category: categoryReducer,
    newBrand: newBrandReducer,
    brands: brandsReducer,
    brand: brandReducer,
    refund:refundOrderReducer
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