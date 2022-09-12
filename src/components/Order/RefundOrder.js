import React, { Fragment, useState, useEffect } from 'react'
import "./RefundOrder.css"
import Loader from "../layout/Loader/Loader";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, refundOrder } from "../../actions/orderActions";
import { useAlert } from "react-alert";

import MetaData from "../layout/MetaData";

const RefundOrder = () => {

  const dispatch = useDispatch()
  const alert = useAlert()
  const { loading, error, message } = useSelector((state) => state.refund)
  const [email, setEmail] = useState("")

  const refundHandlerSubmit = (e) => {
      e.preventDefault() 

      const myForm = new FormData() 
      myForm.set("email",email)
      dispatch(refundOrder(myForm))
  }

  useEffect(()=> {
      if(error){
        alert.error(error)
        dispatch(clearErrors())
      }

      if(message){
        alert.success(message)
      }
  },[dispatch, error, alert, message])
  return (
    <Fragment>
      {loading ? <Loader /> :
        <Fragment>
          <MetaData title="Forgot Password" />
          <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <h2 className="forgotPasswordHeading">Email to check refund</h2>

              <form
                className="forgotPasswordForm"
                onSubmit={refundHandlerSubmit}
              >
                <div className="forgotPasswordEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="Send"
                  className="forgotPasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      }
    </Fragment>
  )
}

export default RefundOrder