import React,{Fragment, useEffect, useState} from 'react'
import "./ProcessOrder.css"
import {useAlert} from "react-alert"
import {Button} from "@material-ui/core"
import MetaData from '../layout/MetaData'
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import SideBar from "./Sidebar.js"
import {Link} from "react-router-dom"
import {Typography} from "@material-ui/core"
import Loader from "../layout/Loader/Loader"
import {useSelector, useDispatch} from "react-redux"
import { getOrderDetails,clearErrors, updateOrder } from './../../actions/orderActions';
import AccountTreeIcon from "@material-ui/icons/AccountTree"
import { UPDATE_ORDER_RESET } from '../../constants/orderContants'
const ProcessOrder = ({history, match}) => {
  const alert = useAlert()
  const dispatch = useDispatch()
  const [status,setStatus] = useState("")
  const {order, error, loading} = useSelector((state)=>state.orderDetails)
  const {error:updateError, isUpdated} = useSelector((state)=>state.order)
  const updateOrderSubmitHandler = (e) => {
    e.preventDefault()

    const myForm = new FormData()

    myForm.set("status",status)

    dispatch(updateOrder(match.params.id,myForm))
  }
  useEffect(() => {
    if(error){
      alert.show(error)
      dispatch(clearErrors())
    }
    if(updateError){
      alert.show(updateError)
      dispatch(clearErrors())
    }
    if(isUpdated){
      alert.show("The order update was successfully")
      dispatch({type:UPDATE_ORDER_RESET})
    }

    dispatch(getOrderDetails(match.params.id))
  },[dispatch, alert, error, match.params.id, isUpdated, updateError])
  return (
   <Fragment>
      <MetaData title="Process Order" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <div
              className="confirmOrderPage"
              style={{
                display: order.orderStatus === "Delivered" ? "block" : "grid",
              }}
            >
              <div>
                <div className="confirmshippingArea">
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
                <div className="confirmCartItems">
                  <Typography>Your Cart Items:</Typography>
                  <div className="confirmCartItemsContainer">
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
              </div>
              {/*  */}
              <div
                style={{
                  display: order.orderStatus === "Delivered" ? "none" : "block",
                }}
              >
                <form
                  className="updateOrderForm"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h1>Process Order</h1>

                  <div>
                    <AccountTreeIcon />
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Choose Category</option>
                      {order.orderStatus === "Processing" && (
                        <option value="Shipped">Shipped</option>
                      )}

                      {order.orderStatus === "Shipped" && (
                        <option value="Delivered">Delivered</option>
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
                    Process
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  )
}

export default ProcessOrder