import React, { Fragment, useState, useEffect } from 'react'
import { DataGrid } from "@material-ui/data-grid"
import "./ProductList.css"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { useAlert } from "react-alert"
import { Button } from "@material-ui/core"
import MetaData from '../layout/MetaData'
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import Sidebar from "./Sidebar.js"
import {
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from "@material-ui/core"
import { getAllUsers, clearErrors, deleteUser } from '../../actions/userActions'
import { DELETE_USER_RESET } from '../../constants/userContants'
const UserList = ({ history }) => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const [open, setOpen] = useState(false)
    const [deleteId, setDeleteId] = useState("")
    const { error, users } = useSelector((state) => state.allUsers)
    const {
        error: deleteError,
        isDeleted,
        message
    } = useSelector((state) => state.profile)

    const submitDeleteToggle = (id) => {
        setDeleteId(id)
        setOpen(true)
    }
    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id))
        setOpen(true)
    }
    const closeDialog = () => {
        setOpen(false)
    }
    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if (deleteError) {
            alert.show(deleteError)
            dispatch(clearErrors())
        }
        if (isDeleted) {
            alert.show(message)
            history.push("/admin/users")
            dispatch({ type: DELETE_USER_RESET })
        }
        dispatch(getAllUsers())
    }, [dispatch, error, deleteError, history, isDeleted, message])

    const columns = [
        { field: 'id', headerName: "User Id", minWidth: 150, flex: 0.8 },
        {
            field: "email",
            headerName: "Email",
            minWidth: 200,
            flex: 1
        },
        { field: "name", headerName: "Name", minWidth: 150, flex: 0.5 },
        {
            field: "role",
            headerName: "Role",
            type: "number",
            minWidth: 150,
            flex: 0.3,
            cellClassName: (params) => {
                return params.getValue(params.id, "role") === "admin"
                    ? "greenColor"
                    : "redColor"
            }
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
                        <Link to={`/admin/user11/${params.getValue(params.id, "id")}`}>
                            <EditIcon />
                        </Link>
                        <Button
                            onClick={
                              ()=>  submitDeleteToggle(params.getValue(params.id, "id"))
                            }
                        >
                            <DeleteIcon />
                        </Button>
                        <Dialog
                            aria-labelledby='alert-dialog-title'
                            aria-describedby='alert-dialog-descrition'
                            open={open}
                            onClose={closeDialog}
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
                                    onClick={() => deleteUserHandler(deleteId)}
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
    //dispatch(getAllUsers(console.log(users)))
    users &&
        users.forEach((item) => {
            rows.push({
                id: item._id,
                role: item.role,
                email: item.email,
                name: item.name
            })
        })
    return (
        <Fragment>
            <MetaData title={`ALL USERS - Admin`} />

            <div className="dashboard">
                <Sidebar />
                <div className="productListContainer">
                    <h1 id="productListHeading">ALL USERS</h1>

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

export default UserList