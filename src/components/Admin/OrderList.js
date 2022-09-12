import React, { Fragment, useEffect, useState } from 'react'
import { DataGrid } from "@material-ui/data-grid"
import "./ProductList.css"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { Button } from '@material-ui/core'
import MetaData from './../layout/MetaData';
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import { useAlert } from 'react-alert'
import Sidebar from './Sidebar.js'
import { 
  Dialog, DialogActions, DialogContent, DialogContentText
} from "@material-ui/core"
import { deleteOrder, getAllOrders, clearErrors } from '../../actions/orderActions'
import { DELETE_ORDER_RESET } from '../../constants/orderContants'
const OrderList = ({ history }) => {
  const dispatch = useDispatch()
  const alert = useAlert()

  const { error, orders } = useSelector((state) => state.allOrders)
  const { error: deleteError, isDeleted } = useSelector((state) => state.order)
  const [open, setOpen] = useState(false)
  const [deleteId, setDeleteId] = useState("")
  const submitDeleteToggle = (id) => {
    setDeleteId(id)
    setOpen(true)
  }
  const closeDialog = () => {
    setOpen(false)
  }
  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id))
    setOpen(false)
  }
  useEffect(() => {
    if (error) {
      alert.show(error)
      dispatch(clearErrors())
    }
    if (deleteError) {
      alert.show(deleteError)
      dispatch(clearErrors())
    }
    if (isDeleted) {
      alert.show("delete order successfully")
      history.push("/admin/orders")
      dispatch({ type: DELETE_ORDER_RESET })
    }
    dispatch(getAllOrders())
  }, [dispatch, alert, error, deleteError, history, isDeleted])
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor"
      }
    },
    { field: "method", headerName: "Method", minWidth: 150, flex: 0.5 },
    { field: "date", headerName: "Date", minWidth: 150, flex: 0.5 },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.5
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.3,
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/order11/${params.getValue(params.id, "id")}`}>
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
              
              style={{opacity: 0.5 }}
            >
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Do you want delete ?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={closeDialog} color="secondary">
                  Cancel
                </Button>
                <Button
                  onClick={() => deleteOrderHandler(deleteId)}
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

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
        method: item.paymentInfo.method,
        date: item.createdAt.slice(0, 10)
      })
    }
    )
  return (
    <Fragment>
      <MetaData title={`ALL ORDERS - Admin`} />

      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL ORDERS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  )
}

export default OrderList