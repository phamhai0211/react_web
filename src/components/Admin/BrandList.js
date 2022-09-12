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
    getBrands,
    deleteBrand
} from "../../actions/brandActions"
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText
} from "@material-ui/core"
import { DELETE_BRAND_RESET } from "../../constants/brandContants"
const BrandList = ({ history }) => {
    const dispatch = useDispatch()
    const alert = useAlert()

    const { error, brands } = useSelector((state) => state.brands)
    const {
        error: deleteError, isDeleted, message
    } = useSelector((state) => state.brand)
    const [open, setOpen] = useState(false)
    const [deleteId, setDeleteId] = useState("")
    const submitDeleteToggle = (id) => {
        setDeleteId(id)
        setOpen(true)
    }
    const closeDialog = () => {
        setOpen(false)
    }
    const deleteBrandHandler = (id) => {
        dispatch(deleteBrand(id))
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
            history.push("/admin/brands")
            dispatch({ type: DELETE_BRAND_RESET })
        }
        dispatch(getBrands())
    }, [dispatch, history, error, isDeleted, deleteError, message])

    const columns = [
        { field: 'id', headerName: "Brand Id", minWidth: 150, flex: 1 },
        { field: 'name', headerName: "Name", minWidth: 150, flex: 0.5 },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment>
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
                                    onClick={() => deleteBrandHandler(deleteId)}
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

    brands &&
        brands.forEach((item) => {
            rows.push({
                id: item._id,
                name: item.name
            })
        })
    return (
        <Fragment>
            <MetaData title={`ALL BRANDS - Admin`} />

            <div className="dashboard">
                <Sidebar />
                <div className="productListContainer">
                    <h1 id="productListHeading">ALL BRANDS</h1>

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

export default BrandList
