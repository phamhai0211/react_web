import React, { Fragment, useEffect } from 'react'
import { CgMouse } from 'react-icons/all'
import "./Home.css"
import MetaData from "../layout/MetaData"
import ProductCard from './ProductCart.js'
import Loader from "../layout/Loader/Loader"
import { useSelector, useDispatch } from "react-redux"
import { clearErrors, getProduct } from "../../actions/productActions"
import { getProducts } from "../../actions/productActions"

import { useAlert } from 'react-alert';

function Home() {

  const alert = useAlert()
  const dispath = useDispatch()
  const { loading, error, products, productsCount } = useSelector(
    (state) => state.products
  )
  useEffect(() => {
    if (error) {
      //alert.show(error)
      dispath(clearErrors())
    }
    dispath(getProducts())
  }, [dispath, error, alert])

  return (
    <Fragment>
      {loading ? <Loader /> : <Fragment>
        <MetaData title={"Shop electric"} />
        <div className="banner">
          <p>Wellcome to shop</p>
          <h1>Find Amazing below</h1>

          <a href="#container">
            <button>
              Scroll <CgMouse />
            </button>
          </a>
        </div>
        <h2 className="homeHeading">Features Product</h2>
        <div className="container" id="container">
          {products && products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}

        </div>
      </Fragment>}


    </Fragment>
  )
}

export default Home