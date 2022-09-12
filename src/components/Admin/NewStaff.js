import React, { Fragment, useEffect, useState } from 'react'
import "./NewProduct.css"
import { useSelector, useDispatch } from "react-redux"
import { useAlert } from "react-alert"
import { Button } from "@material-ui/core"
import MetaData from "../layout/MetaData"
import DescriptionIcon from "@material-ui/icons/Description"
import StorageIcon from "@material-ui/icons/Storage"
import SpellcheckIcon from "@material-ui/icons/Spellcheck"
import AttachMoneyIcon from "@material-ui/icons/AttachMoney"
import Link from "react-router-dom"
import SideBar from "./Sidebar.js"
import PhoneIcon from "@material-ui/icons/Phone"
import CreditCardIcon from "@material-ui/icons/CreditCard"
import {
  clearErrors,
  createStaff
} from "../../actions/StaffActions"
import { NEW_STAFF_RESET } from '../../constants/staffContants'
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
const NewStaff = () => {
  const dispatch = useDispatch()
  const alert = useAlert()
  const { error, loading, success } = useSelector((state) => state.newStaff)
  const [name, setName] = useState("")
  const [age, setAge] = useState()
  const [cardId, setCardId] = useState()
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
    if (success) {
      alert.show("Create staff successfully")
      dispatch({ type: NEW_STAFF_RESET })
    }
  }, [dispatch, alert, error, success])

  const createStaffSubmitHandler = (e) => {
    e.preventDefault()

    const myForm = new FormData()

    myForm.set("name", name)
    myForm.set("age", age)
    myForm.set("email", email)
    myForm.set("cardId", cardId)
    myForm.set("phoneNumber", phoneNumber)

    dispatch(createStaff(myForm))
  }
  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createStaffSubmitHandler}
          >
            <h1>Create Staff</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Name Staff"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <PersonIcon />
              <input
                type="number"
                placeholder="Age"
                required
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div>
              <PhoneIcon />
              <input
                type="text"
                placeholder="Phone"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div>
              <CreditCardIcon />
              <input
                type="number"
                placeholder="CardId"
                required
                onChange={(e) => setCardId(e.target.value)}
              />
            </div>
            <div>
              <EmailIcon />
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button
              id="createProductBtn"
              type="submit"
              //disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  )
}

export default NewStaff