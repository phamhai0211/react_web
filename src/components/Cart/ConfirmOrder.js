import React, { Fragment } from 'react'
import CheckOutSteps from '../Cart/CheckOutSteps'
import { useSelector, useDispatch } from 'react-redux'
import MetaData from "../layout/MetaData"
import "./ConfirmOrder.css"
import { Link } from "react-router-dom"
import { Typography } from "@material-ui/core"
import { createOrder, clearErrors } from "../../actions/orderActions"
const ConfirmOrder = ({ history }) => {
  const dispatch = useDispatch()
  const { shippingInfo, cartItems } = useSelector((state) => state.cart)
  const { user } = useSelector((state) => state.user)

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  )

  const shippingCharges = subtotal > 1000 ? 0 : 200
  const tax = subtotal * 0.18

  const totalPrice = subtotal + tax + shippingCharges

  const address =
    `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    history.push("/process/payment");
  }
  //  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"))
  //  const order = {
  //    shippingInfo,
  //    orderItems: cartItems,
  //    itemsPrice: orderInfo.subtotal,
  //    taxPrice: orderInfo.tax,
  //   shippingPrice: orderInfo.shippingCharges,
  //   totalPrice: orderInfo.totalPrice,
  // }
  // const noPayment = () => {
  //   const data = {
  //     subtotal,
  //     shippingCharges,
  //     tax,
  //     totalPrice
  //   }
  //  let i = Math.floor(Math.random() * 1000000)
  //   order.paymentInfo = {
  //     id:i,
  //     status:"offline",
  //     method:"offline"
  //   }
  //   dispatch(createOrder(order))
  //   sessionStorage.setItem("orderInfo", JSON.stringify(data));
    
  //  }
  return (
    <Fragment>
      <MetaData title="Confirm Order" />
      <CheckOutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span>
                      {item.quantity} X VND{item.price} ={" "}
                      <b>VND{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <Typography>Order Summery</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>VND{subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>VND{shippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>VND{tax}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>VND{totalPrice}</span>
            </div>

            <button onClick={proceedToPayment}>Proceed To Payment</button>
            
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default ConfirmOrder