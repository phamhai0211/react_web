import React, { Fragment, useState, useEffect } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import "./ProductList.css"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { useAlert } from "react-alert"
import { Button } from "@material-ui/core"
import MetaData from "../layout/MetaData"
import DeleteIcon from "@material-ui/icons/Delete"
import Sidebar from './Sidebar'
import EditIcon from "@material-ui/icons/Edit"
import {
  getStaffs,
  clearErrors,
  deleteStaff
} from "../../actions/StaffActions"
import {
  Dialog, DialogActions, DialogContent, DialogContentText
} from "@material-ui/core"
import { DELETE_STAFF_RESET } from '../../constants/staffContants'
const StaffList = ({ history }) => {
  const dispatch = useDispatch()
  const alert = useAlert()
  const { error, staffs } = useSelector((state) => state.staffs)
  const {
    error: deleteError,
    isDeleted,
    message
  } = useSelector((state) => state.staff)
  const [open, setOpen] = useState(false)
  const [deleteId, setDeleteId] = useState("")
  
  const deleteStaffHandler = (id) => {
    dispatch(deleteStaff(id))
    setOpen(false)
  }
  const submitDeleteToggle = (id) => {
    setDeleteId(id)
    setOpen(true)
  }

  const closeDialog = () => {
    setOpen(false)
  }
  useEffect(() => {
    if (error) {
      alert.show(error)
      dispatch(clearErrors())
    }
    if (deleteError) {
      alert.error(deleteError)
      dispatch(clearErrors())
    }
    if (isDeleted) {
      alert.show("delete staff successfully")
      history.push("/admin/staffs")
      dispatch({ type: DELETE_STAFF_RESET })
    }
    dispatch(getStaffs())
  }, [dispatch, alert, error, history, isDeleted, deleteError, message])
  const columns = [
    { field: "id", headerName: "Staff Id", minWidth: 150, flex: 0.5 },
    { field: "name", headerName: "Name", minWidth: 350, flex: 0.8 },
    { field: "cardid", headerName: "Card Id", minWidth: 150, flex: 0.5 },
    { field: "age", headerName: "Age", minWidth: 150, type: "number", flex: 0.3 },
    { field: "phone", headerName: "Phone", minWidth: 200, type: "number", flex: 0.5 },
    { field: "email", headerName: "Email", minWidth: 200, flex: 0.8 },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/staff11/${params.getValue(params.id, 'id')}`}>
              <EditIcon />
            </Link>
            <Button
              onClick={()=>submitDeleteToggle(params.getValue(params.id, "id"))}
            >
              <DeleteIcon />
            </Button>
            <Dialog
              aria-labelledby="alert-dialog-title"
              aria-describedby='alert-dialog-description'
              open={open}
              onClose={closeDialog}
              fullWidth="30px"
              style={{opacity:0.5}}
            >
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Do you want delete ? {deleteId}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={closeDialog} color="secondary">
                  Cancel
                </Button>
                <Button
                  onClick={() => deleteStaffHandler(deleteId)}
                  color="primary">
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
          </Fragment>
        )
      }
    }

  ]
  const rows = []

  staffs &&
    staffs.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        cardid: item.cardId,
        age: item.age,
        phone: item.phoneNumber,
        email: item.email
      })
    })
  return (
    <Fragment>
      <MetaData title={`All staff - Admin`} />

      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL STAFFS</h1>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className='productListTable'
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  )
}

export default StaffList