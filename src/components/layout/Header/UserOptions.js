import React, { Fragment, useState } from 'react'
import "./Header.css"
import { SpeedDial, SpeedDialAction } from '@material-ui/lab'
import PersonIcon from "@material-ui/icons/Person";
import Backdrop from "@material-ui/core/Backdrop";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import DashboardIcon from "@material-ui/icons/Dashboard";
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useAlert } from "react-alert"
import { logOut } from '../../../actions/userActions';
const UserOptions = ({ user }) => {

    const history = useHistory()
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const alert = useAlert()
    const { cartItems } = useSelector((state) => state.cart)
    const options = [
        { icon: <ListAltIcon />, name: "Orders", func: orders },
        { icon: <PersonIcon />, name: "Profile", func: account },
        {
        icon:<ShoppingCartIcon style={{color: cartItems.length > 0 ? "tomato":"unset"}}/>,
            name: `Cart (${cartItems.length})`, 
            func: cart
        },
        { icon: <ExitToAppIcon />, name: "Logout", func: logout }
    ]

    if (user.role === "admin") {
        options.unshift({
            icon: <DashboardIcon />,
            name: "Dashboard",
            func: dashboard
        })
    }

    function dashboard() {
        history.push(`/admin/dashboard`)
    }
    function orders() {
        history.push(`/orders`)
    }
    function account() {
        history.push(`/account`)
    }

    function logout() {
        dispatch(logOut())
        alert.success("logout success")
    }
    function cart() {
        history.push(`/cart`)
    }
    return (
        <Fragment>
            <Backdrop open={open} style={{ zIndex: "10" }} />
            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                style={{ zIndex: "11" }}
                direction="down"
                className='speedDial'
                icon={<img
                    className='speedDialIcon'
                    src={user.avatar.url ? user.avatar.url : "./Profile.png"}
                    alt="profile"
                />}
            >
                {
                    options.map((item) => (
                        <SpeedDialAction
                            key={item.name}
                            icon={item.icon}
                            tooltipTitle={item.name}
                            onClick={item.func}
                            tooltipOpen={window.innerWidth>600 ? true : false}
                        />
                    ))
                }

            </SpeedDial>
        </Fragment>
    )
}

export default UserOptions