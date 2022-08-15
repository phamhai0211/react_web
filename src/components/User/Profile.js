import React, { Fragment, useEffect } from 'react'
import "./Profile.css"
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader/Loader'
import { Link } from "react-router-dom"
import { useSelector } from 'react-redux'
const Profile = ({history}) => {

  const { user, loading, isAuthenticated } = useSelector((state) => state.user)

  useEffect(()=>{
      if(isAuthenticated === false){
        history.push("/login")
      }
  },[history, isAuthenticated])
  return (
    <Fragment>
      {
        loading ? <Loader /> :
          <Fragment>
            <MetaData title={`${user.name}'s Profile`} />
            <div className="profileContainer">
              <div>
                <h1>My profile</h1>
                <img src={user.avatar.url} />
                <Link to="/me/update">Edit profile</Link>
              </div>
              <div>
                <div >
                  <h4>Full name</h4>
                  <p>{user.name}</p>
                </div>
                <div>
                  <h4>Email</h4>
                  <p>{user.email}</p>
                </div>
                <div>
                  <h4>Joined at</h4>
                  <p>{String(user.createdAt).substring(0, 10)}</p>
                </div>

                <div>
                  <Link to="/orders">My orders</Link>
                  <Link to="/password/update">Change password</Link>
                </div>
              </div>
            </div>
          </Fragment>
      }
    </Fragment>
  )
}

export default Profile