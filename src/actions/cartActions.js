import axios from "axios" 

import { 
    ADD_TO_CART ,
    REMOVE_CART_ITEM,
    SAVE_SHIPPING_INFO
} from './../constants/cartContants';
   

//add to cart
export const addItemsToCart = (id,quantity) => async(dispath, getState)=>{
    const {data} = await axios.get(`/api/product/${id}`)

    dispath({
        type:ADD_TO_CART,
        payload:{
            product:data.product._id,
            name:data.product.name,
            price:data.product.price,
            image:data.product.images[0].url,
            stock:data.product.Stock,
            quantity
            
        }
    })

    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))
}

//remove from cart

export const removeItemsFromCart = (id) => async (dispath,getState) => {
    dispath({
        type:REMOVE_CART_ITEM,
        payload:id
    })
    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))
}

// Save shipping info 
export const saveShippingInfo = (data) => async(dispath) =>{
    dispath({
        type:SAVE_SHIPPING_INFO,
        payload:data
    })
    localStorage.setItem("shippingInfo",JSON.stringify(data))
}