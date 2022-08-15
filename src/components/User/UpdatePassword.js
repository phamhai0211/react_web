import React, { Fragment, useState, useEffect } from 'react'
import "./UpdatePassword.css"
import Loader from "../layout/Loader/Loader"
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import FaceIcon from '@material-ui/icons/Face';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert'
import MetaData from "../layout/MetaData"
import { clearErrors, updatePassword, loadUser } from "../../actions/userActions";
import { UPDATE_PASSWORD_RESET } from "../../constants/userContants"
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock'
import VpnKeyIcon from '@material-ui/icons/VpnKey';

import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const eye = <FontAwesomeIcon icon={faEye} />;
const UpdatePassword = ({history}) => {

    const dispatch = useDispatch()
    const alert = useAlert()

    const { error, loading, isUpdated} = useSelector((state) => state.profile)

    const [ oldPassword, setOldPassword ] = useState("")
    const [ newPassword, setNewPassword ] = useState("")
    const [confirmPassword, setConfirmPassword ] = useState("")
    const [passwordShown,setPasswordShown] = useState(false)

    const handelShown = ()=>{
        setPasswordShown(passwordShown ? false : true)
    }
    const updatePasswordSubmit = (e) =>{
        e.preventDefault()

        const myForm = new FormData()

        myForm.set("oldPassword",oldPassword)
        myForm.set("newPassword",newPassword)
        myForm.set("confirmPassword", confirmPassword)

        dispatch(updatePassword(myForm))

    }

    useEffect(()=>{

        if(error){
            alert.show(error)
            dispatch(clearErrors())
        }
        
        if(isUpdated){
            alert.success("Password update successfully")

            history.push("/account")

            dispatch({ type:UPDATE_PASSWORD_RESET})
        }
    },[dispatch, error, history, alert, isUpdated])
    return (
        <Fragment>
            {loading ? <Loader />
                :
                <Fragment>
                    <MetaData title="Change Password" />
                    <div className="updatePasswordContainer">
                        <div className="updatePasswordBox">
                            <h2 className="updatePasswordHeading">Update Profile</h2>

                            <form
                                className="updatePasswordForm"
                                onSubmit={updatePasswordSubmit}
                            >
                                <div className="loginPassword">
                                    <VpnKeyIcon />
                                    <input
                                        type={passwordShown ? "text" :"password"}
                                        placeholder="Old Password"
                                        required
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                    />
                                    <i onClick={handelShown}>{eye}</i>
                                </div>

                                <div className="loginPassword">
                                    <LockOpenIcon />
                                    <input
                                        type={passwordShown ? "text" :"password"}
                                        placeholder="New Password"
                                        required
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                    <i onClick={handelShown}>{eye}</i>
                                </div>
                                <div className="loginPassword">
                                    <LockIcon />
                                    <input
                                        type={passwordShown ? "text" :"password"}
                                        placeholder="Confirm Password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    <i onClick={handelShown}>{eye}</i>
                                </div>
                                <input
                                    type="submit"
                                    value="Change"
                                    className="updatePasswordBtn"
                                />
                            </form>
                        </div>
                    </div>
                </Fragment>
            }
        </Fragment>
    )
}

export default UpdatePassword