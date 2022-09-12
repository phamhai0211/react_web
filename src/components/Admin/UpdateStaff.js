import React, { Fragment, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from "react-alert"
import { Button } from "@material-ui/core"
import MetaData from "../layout/MetaData"
import AccountTreeIcon from '@material-ui/icons/AccountTree'
import DescriptionIcon from '@material-ui/icons/Description';
import SideBar from "./Sidebar"
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from "@material-ui/icons/Phone"
import CreditCardIcon from "@material-ui/icons/CreditCard"
import {
  getStaffDetails,
  clearErrors,
  updateStaff
} from "../../actions/StaffActions"
import Loader from "../layout/Loader/Loader"
import { UPDATE_STAFF_RESET } from "../../constants/staffContants"
const UpdateStaff = ({ history, match }) => {
  const dispatch = useDispatch()
  const alert = useAlert()

  const { loading, error, staff } = useSelector((state) => state.staffDetail)

  const {
    loading: updateLoading,
    error: updateError,
    isUpdated
  } = useSelector((state) => state.staff)

  const [name, setName] = useState("")
  const [age, setAge] = useState(0)
  const [cardId, setCardId] = useState(0)
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")

  const staffId = match.params.id

  useEffect(() => {
    if (staff && staff._id !== staffId) {
      dispatch(getStaffDetails(staffId))
    } else {
      setName(staff.name)
      setAge(staff.age)
      setEmail(staff.email)
      setCardId(staff.cardId)
      setPhoneNumber(staff.phoneNumber)
    }

    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
    if (updateError) {
      alert.error(updateError)
      dispatch(clearErrors())
    }
    if (isUpdated) {
      alert.show("User update successfully")
      history.push("/admin/staffs")
      dispatch({ type: UPDATE_STAFF_RESET })
    }
  }, [dispatch, alert, error, history, isUpdated, updateError, staff, staffId])

  const updateStaffSubmitHandler = (e) => {
    e.preventDefault()

    const myForm = new FormData()

    myForm.set("name", name)
    myForm.set("email", email)
    myForm.set("phoneNumber", phoneNumber)
    myForm.set("age", age)
    myForm.set("cardId", cardId)

    dispatch(updateStaff(staffId, myForm))
  }
  return (
    <Fragment>
      <MetaData title="Update Staff" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <form
              className="createProductForm"
              onSubmit={updateStaffSubmitHandler}
            >
              <h1>Update Staff</h1>

              <div>
                <PersonIcon />
                <input
                  type="text"
                  placeholder="Name"
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
                  value={age}
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
                <EmailIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
               <div>
                <CreditCardIcon />
                <input
                  type="number"
                  placeholder="CardId"
                  required
                  value={cardId}
                  onChange={(e) => setCardId(e.target.value)}
                />
              </div>


              <Button
                id="createProductBtn"
                type="submit"
                // disabled={
                //   updateLoading ? true : false 
                // }
              >
                Update
              </Button>
            </form>
          )}
        </div>
      </div>
    </Fragment>
  )
}

export default UpdateStaff