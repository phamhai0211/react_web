
import React,{Fragment, useEffect, useState} from 'react'
import "./NewProduct.css"
import {useSelector, useDispatch} from "react-redux"
import {clearErrors,createBrand} from '../../actions/brandActions'
import {useAlert} from "react-alert"
import {Button} from "@material-ui/core"
import MetaData from '../layout/MetaData'
import AccountTreeIcon from "@material-ui/icons/AccountTree"
import Link from "react-router-dom"
import SideBar from "./Sidebar.js"
import SpellcheckIcon from "@material-ui/icons/Spellcheck"
import {NEW_BRAND_RESET} from "../../constants/brandContants"
const NewBrand = () => {
  const dispatch = useDispatch()
  const alert = useAlert()
  const {error,loading,success} = useSelector((state) => state.newCategory)
  const [name,setName]= useState("")

  useEffect(() => {
    if(error){
      alert.show(error)
      dispatch(clearErrors())
    }
    if(success){
      alert.show("Create brand successfully")
      dispatch({type:NEW_BRAND_RESET})
    }
  },[error,alert,dispatch,success])

  const createBrandSubmitHandler = (e) =>{
    e.preventDefault()

    const myForm = new FormData()

    myForm.set("name",name)
    dispatch(createBrand(myForm))
  }
  return (
    <Fragment>
      <MetaData title="Create Brand" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createBrandSubmitHandler}
          >
            <h1>Create Brand</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Brand Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
           
            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  )
}

export default NewBrand