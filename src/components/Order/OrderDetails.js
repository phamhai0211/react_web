import React, { Fragment, useEffect, useState } from 'react'
import "./OrderDetails.css"
import "./RefundOrder.css"
import MetaData from '../layout/MetaData'
import { useSelector, useDispatch } from "react-redux"
import { Link } from 'react-router-dom'
import { Typography } from '@material-ui/core'
import { getOrderDetails, clearErrors } from './../../actions/orderActions';
import Loader from '../layout/Loader/Loader'
import { useAlert } from 'react-alert'
import { Button } from "@material-ui/core"
import { updateOrder } from './../../actions/orderActions'
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { refundOrder } from "../../actions/orderActions";
import AccountTreeIcon from '@material-ui/icons/AccountTree'
const OrderDetails = ({ match }) => {
  const { order, error, loading } = useSelector((state) => state.orderDetails)
  const dispatch = useDispatch()
  const alert = useAlert()
  const { error: isRefundErr, message } = useSelector((state) => state.refund)
  const { error: updateError, isUpdated } = useSelector((state) => state.order)

  const [status, setStatus] = useState("")
  const refundHandlerSubmit = (e) => {
    e.preventDefault()
    const myForm = new FormData()
    myForm.set("status", status)
    dispatch(updateOrder(match.params.id, myForm))
  }
  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
    if (isRefundErr) {
      alert.error(isRefundErr)
      dispatch(clearErrors())
    }
    if (isUpdated) {
      alert.show("Orders has refund")
    }
    if (message) {
      alert.success(message)
    }
    dispatch(getOrderDetails(match.params.id))
  }, [error, dispatch, match.params.id, alert, message])
  return (
    <Fragment>
      {
        loading ? (Loader) :
          (<Fragment>
            <MetaData title="Order Details" />
            <div className="orderDetailsPage">
              <div className="orderDetailsContainer">
                <Typography component="h1">
                  Order #{order && order._id}
                </Typography>
                <Typography>Shipping Info</Typography>
                <div className="orderDetailsContainerBox">
                  <div>
                    <p>Name:</p>
                    <span>{order.user && order.user.name}</span>
                  </div>
                  <div>
                    <p>Phone:</p>
                    <span>
                      {order.shippingInfo && order.shippingInfo.phoneNo}
                    </span>
                  </div>
                  <div>
                    <p>Address:</p>
                    <span>
                      {order.shippingInfo &&
                        `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                    </span>
                  </div>
                </div>
                <Typography>Payment</Typography>
                <div className="orderDetailsContainerBox">
                  <div>
                    <p
                      className={
                        order.paymentInfo &&
                          order.paymentInfo.status === "succeeded"
                          ? "greenColor"
                          : "redColor"
                      }
                    >
                      {order.paymentInfo &&
                        order.paymentInfo.status === "succeeded"
                        ? "PAID"
                        : "NOT PAID"}
                    </p>
                  </div>

                  <div>
                    <p>Amount:</p>
                    <span>{order.totalPrice && order.totalPrice}</span>
                  </div>
                </div>

                <Typography>Order Status</Typography>
                <div className="orderDetailsContainerBox">
                  <div>
                    <p
                      className={
                        order.orderStatus && order.orderStatus === "Delivered"
                          ? "greenColor"
                          : "redColor"
                      }
                    >
                      {order.orderStatus && order.orderStatus}
                    </p>
                  </div>
                </div>
              </div>

              <div className="orderDetailsCartItems">
                <Typography>Order Items:</Typography>
                <div className="orderDetailsCartItemsContainer">
                  {order.orderItems &&
                    order.orderItems.map((item) => (
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


              <form
                className="forgotPasswordForm"
                onSubmit={refundHandlerSubmit}
                style={{
                  width: '50%',
                  display: 'flex',
                  flexDirection: 'column', 
                  alignItems:'center',
                  textAlign:'center'
                }}
              >
                <div
                  style={{
                    paddingBottom:'5px',
                    
                  }}
                >
                  <AccountTreeIcon />
                  <select 
                  style={{marginLeft:"10px"}}
                  onChange={(e) => setStatus(e.target.value)}>
                    <option value="">Choose Category</option>
                    {order.orderStatus === "Processing" && (
                      <option value="Refund">Refund</option>
                    )}
                  </select>
                </div>

                <Button
                  id="createProductBtn"
                  type="submit"
                  disabled={
                    loading ? true : false || status === "" ? true : false
                  }
                >
                  Refund
                </Button>
              </form>
            </div>
          </Fragment>)
      }
    </Fragment>

  )
}

export default OrderDetails