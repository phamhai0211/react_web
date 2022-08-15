import React, { useRef, useState, useEffect } from 'react'
import "./LoginSignup.css"
import { Fragment } from 'react';
import Loader from "../layout/Loader/Loader"
import MailOutlineIcon from "@material-ui/icons/MailOutline"
import LockOpenIcon from "@material-ui/icons/LockOpen"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { clearErrors, login, register } from '../../actions/userActions';
import FaceIcon from "@material-ui/icons/Face"
import { useAlert } from 'react-alert';
import MetaData from "../layout/MetaData"

import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const eye = <FontAwesomeIcon icon={faEye} />;
const LoginSignup = ({ history , location}) => {

  const dispath = useDispatch()
  const alert = useAlert()

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  )
  const switcherTab = useRef(null)
  const loginTab = useRef(null)
  const registerTab = useRef(null)

  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [passwordShown,setPasswordShown] = useState(false)
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  })

  const { name, email, password } = user


  const [avatar, setAvatar] = useState("")
  const [avatarPreview, setAvatarPreview] = useState("./Profile.png")

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const loginSubmit = (e) => {
    e.preventDefault()
    dispath(login(loginEmail, loginPassword))
  }
  const registerSubmit = (e) => {
    e.preventDefault()

    const myForm = new FormData()

    myForm.set("name", name)
    myForm.set("email", email)
    myForm.set("password", password)
    myForm.set("avatar", avatar)

    dispath(register(myForm))
  }

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result)
          setAvatar(reader.result)
        }

      }
      reader.readAsDataURL(e.target.files[0])
    } else {
      setUser({ ...user, [e.target.name]: e.target.value })
    }
  }
  const redirect = location.search ? location.search.split("=")[1] : "/account"
  useEffect(() => {
    if (error) {
      alert.show(error)
      dispath(clearErrors())
    }

    if (isAuthenticated) {
      history.push(redirect)
    }
  }, [dispath, error, alert, history, isAuthenticated, redirect])


  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");

    }

  }
  return (
    <Fragment>
      {loading ? <Loader /> :
        <Fragment>
          <MetaData title="Login --- Sign up" />
          <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
              <div>
                <div className="login_signUp_toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                  <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                </div>
                <button ref={switcherTab}></button>
              </div>
              <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                <div className="loginEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type={passwordShown ? "text" : "password"}
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    
                  />
                  <i onClick={togglePasswordVisiblity}>{eye}</i>
                </div>
                <Link to="/password/forgot">Forget Password ?</Link>
                <input type="submit" value="Login" className="loginBtn" />
              </form>
              <form
                className="signUpForm"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="signUpName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpPassword">
                  <LockOpenIcon />
                  <input
                    type={passwordShown ? "text" :"password"}
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                  <i onClick={togglePasswordVisiblity}>{eye}</i>
                </div>

                <div id="registerImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <input type="submit" value="Register" className="signUpBtn" />
              </form>
            </div>
          </div>
        </Fragment>

      }
    </Fragment>
  )
}

export default LoginSignup