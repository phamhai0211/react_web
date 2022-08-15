import React, { Fragment, useEffect, useState } from "react"
import Carousel from "react-material-ui-carousel"
import "./ProductDetail.css"
import { useSelector, useDispatch } from "react-redux"
import { clearErrors, getDetailProduct, newReview } from "../../actions/productActions"
import { useAlert } from "react-alert"
import MetaData from "../layout/MetaData"
import Loader from './../layout/Loader/Loader';
import { addItemsToCart } from "../../actions/cartActions"
import { NEW_REVIEW_RESET } from "../../constants/productContants"
import { Rating } from "@material-ui/lab"
import {
    Dialog,
    DialogActions,
    DialogContent,
    Button,
    DialogTitle
} from "@material-ui/core"
import ReviewCard from "./ReviewCard.js"
const ProductDetail = ({ match }) => {

    const dispath = useDispatch()
    const alert = useAlert()
    const { product, loading, error } = useSelector((state) => state.productDetails)

    const { success, error: reviewError } = useSelector((state) => state.newReview)

    const options = {
        size: "large",
        value: product.ratings,
        readOnly: true,
        precision: 0.5
    }
    const [quantity, setQuantity] = useState(1)
    const [open, setOpen] = useState(false)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("")

    const increaseQuantity = () => {

        if (product.Stock <= quantity) return
        const qty = quantity + 1
        setQuantity(qty)
    }

    const decreaseQuantity = () => {
        if (1 >= quantity) return;

        const qty = quantity - 1
        setQuantity(qty)
    }

    const addToCartHandler = () => {
        dispath(addItemsToCart(match.params.id, quantity))
        alert.success("item added to cart ")
    }
    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true)
    }
    const reviewSubmitHandler = () => {
        const myForm = new FormData()

        myForm.set("rating", rating)
        myForm.set("comment",comment)
        myForm.set("productId",match.params.id)

        dispath(newReview(myForm))
        setOpen(false)
    }
    useEffect(() => {
        if (error) {
            alert.show(error)
            dispath(clearErrors())
        }

        if(reviewError){
            alert.show(reviewError)
            dispath({type:NEW_REVIEW_RESET})
        }
        dispath(getDetailProduct(match.params.id))
    }, [dispath, match.params.id, error, alert, reviewError, success])
    return (
        <Fragment>
            {loading ? (<Loader />) :
                <Fragment>
                    <MetaData title={`${product.name} Details------`} />
                    <div className="product_detail_card">
                        <div>
                            <Carousel>
                                {product.images &&
                                    product.images.map((item, i) => (
                                        <img
                                            className="CarouselImage"
                                            key={i}
                                            src={item.url}
                                            alt={`${i} Slide`}
                                        />
                                    ))}
                            </Carousel>
                        </div>

                        <div>
                            <div className="detailBlock-1">
                                <h1>{product.name}</h1>
                                <p>Product # {product._id}</p>
                            </div>

                            <div className="detailBlock-2">
                                <Rating {...options} />
                                <span className="detailBlock-2-span">
                                    {" "}
                                    ({product.numOfReviews} Reviews)
                                </span>
                            </div>

                            <div className="detailBlock-3">
                                <h1>{`VND${product.price}`}</h1>
                                <div className="detailBlock-3_1">
                                    <div className="detailBlock-3_1-1">
                                        <button onClick={decreaseQuantity}>-</button>
                                        <input value={quantity} type="number" readOnly />
                                        <button onClick={increaseQuantity}>+</button>
                                    </div>{" "}
                                    <button
                                        disabled={product.Stock < 1 ? true : false}
                                        onClick={addToCartHandler}
                                    >Add to card</button>
                                </div>
                                <p>
                                    Status:
                                    <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                                        {product.Stock < 1 ? "OutOfStock" : "InStock"}
                                    </b>
                                </p>
                            </div>

                            <div className="detailBlock-4">
                                Description : <p>{product.description}</p>
                            </div>

                            <button onClick={submitReviewToggle} className="submitReview">
                                Submit Review
                            </button>

                        </div>
                    </div>
                    <h3 className="reviewsHeading">REVIEWS</h3>
                    <Dialog
                        aria-labelledby="simple-dialog-title"
                        open={open}
                        onClose={submitReviewToggle}
                    >
                        <DialogTitle>Submit Review</DialogTitle>
                        <DialogContent className="submitDialog">
                            <Rating
                                onChange={(e) => setRating(e.target.value)}
                                value={rating}
                                size="large"
                            />

                            <textarea
                                className="submitDialogTextArea"
                                cols="30"
                                rows="5"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={submitReviewToggle} color="secondary">
                                Cancel
                            </Button>
                            <Button onClick={reviewSubmitHandler} color="primary">
                                Submit
                            </Button>
                        </DialogActions>
                    </Dialog>

                    {product.reviews && product.reviews[0] ? (
                        <div className="reviews">
                            {product.reviews &&
                                product.reviews.map((review) => (
                                    <ReviewCard key={review._id} review={review} />
                                ))}
                        </div>
                    ) : (
                        <p className="noReviews">No Reviews Yet</p>
                    )}
                </Fragment>
            }

        </Fragment>
    )
}

export default ProductDetail