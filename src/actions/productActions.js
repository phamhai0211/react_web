import axios from "axios"
import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_SUCCESS,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    ALL_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
    CLEAR_ERRORS,
    NEW_PRODUCT_RESET,
    DELETE_PRODUCT_RESET,
} from "../constants/productContants"


//get products
export const getProducts =
    (keyword = "", currentPage = 1, price = [0, 25000], category, rating = 0, brand) =>
        async (dispath) => {
            
            try {
                dispath({
                    type: ALL_PRODUCT_REQUEST
                })
                let link = `/api/products?keyword=${keyword}&page=${currentPage}`
                if (category) {
                    link = `/api/products?keyword=${keyword}&page=${currentPage}&category=${category}`
                }
                if(brand){
                    link = `/api/products?keyword=${keyword}&page=${currentPage}&brand=${brand}`
                }
                const { data } = await axios.get(link)

                dispath({
                    type: ALL_PRODUCT_SUCCESS,
                    payload: data
                })
            } catch (error) {
                dispath({
                    type: ALL_PRODUCT_FAIL,
                    payload: error.response.data.message
                })
            }

        }

// get products admin 
export const getAdminProduct = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_PRODUCT_REQUEST })

        const { data } = await axios.get(`/api/admin/products`)
        dispatch({
            type: ADMIN_PRODUCT_SUCCESS,
            payload: data.products
        })
    } catch (error) {
        dispatch({
            type: ADMIN_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}
//get product details
export const getDetailProduct = (id) => async (dispath) => {
    try {
        dispath({
            type: PRODUCT_DETAILS_REQUEST
        })
        const { data } = await axios.get(`/api/product/${id}`)

        dispath({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product
        })
    } catch (error) {
        dispath({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }

}


export const newReview = (reviewData) => async (dispath) => {
    try {
        dispath({ type: NEW_REVIEW_REQUEST })

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const { data } = await axios.put(`/api/product/review`, reviewData, config)

        dispath({ type: NEW_REVIEW_SUCCESS, payload: data.success })
    } catch (error) {
        dispath({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}

//create new product  (Admin)
export const createProduct = (productData) => async (dispath) => {
    try {
        dispath({ type: NEW_PRODUCT_REQUEST })

        const config = {
            headers: { "Content-Type": "application/json" }
        }

        const { data } = await axios.post(
            `/api/admin/product/new`,
            productData,
            config
        )

        dispath({ type: NEW_PRODUCT_SUCCESS, payload: data })
    } catch (error) {
        dispath({
            type: NEW_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}
export const deleteProduct = (id) =>async(dispatch) => {
    try{
        dispatch({type:DELETE_PRODUCT_REQUEST})

        const {data} = await axios.delete(`/api/admin/product/${id}`)

        dispatch({type:DELETE_PRODUCT_SUCCESS, payload:data.success})
    }catch(error){
        dispatch({type:DELETE_PRODUCT_FAIL, payload: error.response.data.message})
    }
}

export const updateProduct = (id, productData) =>async(dispatch)=> {
    try{
        dispatch({type:UPDATE_PRODUCT_REQUEST})
        const config = {
            headers: {"Content-Type": "application/json"}
        }
        const {data} = await axios.put(
            `/api/admin/product/${id}`,
            productData,
            config
        )
        dispatch({type:UPDATE_PRODUCT_SUCCESS,payload:data.success})
    }catch(error){
        dispatch({type:UPDATE_PRODUCT_FAIL, payload:error.response.data.message})

    }
}
// Get All Reviews of a Product
export const getAllReviews = (productId) => async (dispatch) => {
  try {
    dispatch({ type: ALL_REVIEW_REQUEST });

    const { data } = await axios.get(`/api/reviews?id=${productId}`);

    dispatch({
      type: ALL_REVIEW_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: ALL_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Review of a Product
export const deleteReviews = (reviewId, productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });

    const { data } = await axios.delete(
      `/api/reviews?id=${reviewId}&productId=${productId}`
    );

    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const clearErrors = () => async (dispath) => {
    dispath({ type: CLEAR_ERRORS })
}