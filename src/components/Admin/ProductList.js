import React, { Fragment, useEffect, useState } from 'react'
import "./ProductList.css"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { useAlert } from "react-alert"
import { Button } from '@material-ui/core'
import MetaData from "../layout/MetaData"
import EditIcon from "@material-ui/icons/Edit"
import {
  Dialog, DialogActions, DialogContent, DialogContentText
} from "@material-ui/core"
import { clearErrors, getAdminProduct, deleteProduct } from '../../actions/productActions'
import DeleteIcon from "@material-ui/icons/Delete"
import SideBar from "./Sidebar.js"
import { DataGrid } from '@material-ui/data-grid';
import { DELETE_PRODUCT_RESET } from '../../constants/productContants'
const ProductList = ({ history }) => {
  const dispatch = useDispatch()
  const alert = useAlert()
  const [open, setOpen] = useState(false)
  const [deleteId, setDeleteId] = useState("")
  const { error, products } = useSelector((state) => state.products)
  const submitDeleteToggle = (id) => {
    setDeleteId(id)
    setOpen(true)
  }
  const closeDialog = () => {
    setOpen(false)
  }
  const { error: deleteError, isDeleted } = useSelector((state) => state.product)

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id))
    setOpen(false)
  }
  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }

    if (deleteError) {
      alert.error(deleteError)
      dispatch(clearErrors())
    }

    if (isDeleted) {
      alert.show("Delete Product Successfully")
      history.push("/admin/dashboard")
      dispatch({ type: DELETE_PRODUCT_RESET })
    }
    dispatch(getAdminProduct())
  }, [dispatch, alert, error, deleteError, history, isDeleted])
  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
    { field: "name", headerName: "Name", minWidth: 350, flex: 0.5 },
    { field: "stock", headerName: "Stock", type: "number", minWidth: 150, flex: 0.3 },
    { field: "price", headerName: "Price", type: "number", minWidth: 150, flex: 0.5 },

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
            <Link to={`/admin/product11/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>
            <Button
              onClick={()=>submitDeleteToggle(params.getValue(params.id, "id"))}
            >
              <DeleteIcon />
            </Button>
            <Dialog
              aria-labelledby="alert-dialog-title"
              open={open}
              style={{ opacity: 0.5 }}
            >
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Do you want delete ?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={()=>setOpen(false)} color="secondary">
                  Cancel
                </Button>
                <Button
                  onClick={
                    () => deleteProductHandler(deleteId)
                  }
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

  products &&
    products.forEach((item) => {
      console.log(item)
      rows.push({
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name
      })
    })

  return (
    <Fragment>
      <MetaData title={`All product - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>
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

export default ProductList