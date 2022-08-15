import React,{Fragment, useState, useEffect} from 'react'
import Loader from "../layout/Loader/Loader";
import "./ResetPassword.css"
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../actions/userActions";
import { useAlert } from 'react-alert';
import MetaData from "../layout/MetaData";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";

import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const eye = <FontAwesomeIcon icon={faEye} />;
const ResetPassword = ({history,match}) => {

    const dispatch = useDispatch()
    const alert = useAlert()
    const {loading, error, success} = useSelector((state) => state.forgotPassword)

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const resetPasswordSubmit = (e) =>{
        e.preventDefault()

        const myForm = new FormData()
        myForm.set("password",password)
        myForm.set("confirmPassword",confirmPassword)
        dispatch(resetPassword(match.params.token,myForm))
    }

    useEffect(()=>{
        if(error){
            alert.show(error)
            dispatch(clearErrors())
        }

        if(success){
            alert.success("reset password successfully")
            history.push("/login")
        }
    },[history, dispatch, alert, error, success])
  return (
   <Fragment>
    {loading ? <Loader/> :
        <Fragment>
          <MetaData title="Change Password" />
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">Update Profile</h2>

              <form
                className="resetPasswordForm"
                onSubmit={resetPasswordSubmit}
              >
                <div className="Password">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <i>{eye}</i>
                </div>
                <div className="Password">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <i>{eye}</i>
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="resetPasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
    }
   </Fragment>
  )
}

export default ResetPassword