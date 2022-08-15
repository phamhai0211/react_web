import React, { Fragment, useEffect } from 'react'
import { useSelector } from "react-redux"
import { Route, Redirect } from 'react-router-dom'
import Loader from '../layout/Loader/Loader'
const ProtectRoute = ({ isAdmin, component: Component, ...rest }) => {
    const { loading, user, isAuthenticated } = useSelector((state) => state.user)
    return (
        <Fragment>
            {loading === false &&
                (
                    <Route
                        {...rest}
                        render = {(props)=>{
                                if(isAuthenticated === false){
                                    return <Redirect to="/login"/>
                                }
                                if(isAdmin === true && user.role !== "admin"){
                                    return <Redirect to="/login" />
                                }
                                return <Component {...props} />
                        }}
                    >
                    </Route>
                )
            }
        </Fragment>
    )
}

export default ProtectRoute