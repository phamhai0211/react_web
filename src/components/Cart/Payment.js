import React, { Fragment, useEffect, useRef } from 'react'
import "./Payment.css"

import CheckOutSteps from '../Cart/CheckOutSteps';
import { useSelector, useDispatch } from 'react-redux';
import MetaData from '../layout/MetaData';
import { Button, Typography } from "@material-ui/core";
import { useAlert } from "react-alert";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios"
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Shipping from './Shipping';
import { createOrder, clearErrors } from '../../actions/orderActions';
const Payment = ({ history }) => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"))

  const dispatch = useDispatch();
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart)
  const { user } = useSelector((state) => state.user)
  const { error } = useSelector((state) => state.newOrder)
  const paymentData = {
    amount: Math.round(orderInfo.totalPrice),

  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  }
  const submitHandler = async (e) => {
    e.preventDefault()

    payBtn.current.disabled = true

    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      }

      const { data } = await axios.post(

        "/api/payment/process",
        paymentData,
        config
      )

      const client_secret = data.client_secret
      console.log(client_secret)
      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            }
          }
        }
      })

      if (result.error) {
        payBtn.current.disabled = false
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
            method: "paypal"
          }
          dispatch(createOrder(order));
          history.push("/success");
        }
        else {
          alert.show("There's some issue while processing payment ");
        }
      }
    }
    catch (error) {
      payBtn.current.disabled = false
      alert.show(error.response.data.message);
    }
  }
   const offLineHanler = () => {

    let i = Math.floor(Math.random() * 1000000)
    order.paymentInfo = {
      id: i,
      status: "offline",
      method: "offline"
    }
   dispatch(createOrder(order))
    history.push("/success")
   }
  useEffect(() => {
    if (error) {
      alert.show(error)
      dispatch(clearErrors())
    }
  }, [dispatch, error, alert])
  return (
    <Fragment>
      <MetaData title="Payment" />
      <CheckOutSteps activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCardIcon />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </div>

          <input
            type="submit"
            value={`Pay - VND${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
        <button
          className="payment_offline"
          onClick={offLineHanler}
        >
          Offline
        </button>
      </div>
    </Fragment>
  )
}

export default Payment