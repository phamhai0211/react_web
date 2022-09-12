import React, { Fragment, useState, useEffect } from 'react'
import { DataGrid } from "@material-ui/data-grid"
import "./ProductList.css"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { useAlert } from "react-alert"
import { Button } from "@material-ui/core"
import MetaData from "../layout/MetaData"
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import Sidebar from "./Sidebar.js"
import {
  clearErrors,
  getCategories,
  deleteCategory
} from "../../actions/cateActions"
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText
} from "@material-ui/core"
import { DELETE_CATEGORY_RESET } from "../../constants/cateContants"
import Delete from '@material-ui/icons/Delete'
const CategoryList = ({ history, match }) => {
  const dispatch = useDispatch()
  const alert = useAlert()
  const [open, setOpen] = useState(false)
  const [deleteId, setDeleteId] = useState("")
  const submitDeleteToggle = (id) => {
    setDeleteId(id)
    console.log(id)
    setOpen(true)
  }
  const closeDialog = () => {
    setOpen(false)
  }
  const { error, categories } = useSelector((state) => state.categories)
  const {
    error: deleteError, isDeleted, message
  } = useSelector((state) => state.category)
  const deleteCategoryHandler = (id) => {
   dispatch(deleteCategory(id))
    //console.log(id)
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
      alert.show("Delete successfully")
      history.push("/admin/categories")
      dispatch({ type: DELETE_CATEGORY_RESET })
    }
    dispatch(getCategories())
  }, [dispatch, history, error, isDeleted, deleteError, message])

  const columns = [
    { field: 'id', headerName: "Category Id", minWidth: 150, flex: 1 },
    { field: 'name', headerName: "Name", minWidth: 150, flex: 0.5 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        //console.log(params)
        return (
          // <Fragment>

          // <Button
          //   onClick={() =>
          //     deleteCategoryHandler(params.getValue(params.id, "id"))
          //   }
          // >
          //   <DeleteIcon/>
          // </Button>
          // </Fragment>
          <Fragment>
            <Button
              onClick={()=>submitDeleteToggle(params.getValue(params.id,"id"))}
            >
              <DeleteIcon />
            </Button>
            <Dialog
              aria-labelledby="simple-dialog-title"

              open={open}
              onClose={closeDialog}

              style={{ opacity: 0.5 }}
            >
              <DialogTitle>
                
                  Do you want delete ? {deleteId}
                
              </DialogTitle>
              <DialogActions>
                <Button onClick={closeDialog} color="secondary">
                  Cancel
                </Button>
                
                <Button
                  onClick={
                    () => deleteCategoryHandler(deleteId)
                    
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

  categories &&
    categories.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name
      })
    })
  return (
    <Fragment>
      <MetaData title={`ALL CATEGORIES - Admin`} />

      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL CATEGORIES</h1>

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

export default CategoryList