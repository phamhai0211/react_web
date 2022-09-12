import React, { Fragment, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from "react-alert"
import { Button } from "@material-ui/core"
import MetaData from "../layout/MetaData"
import AccountTreeIcon from '@material-ui/icons/AccountTree'
import DescriptionIcon from '@material-ui/icons/Description';
import StorageIcon from "@material-ui/icons/Storage"
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import SideBar from "./Sidebar"
import { getDetailProduct, clearErrors, updateProduct } from './../../actions/productActions';
import { getCategories } from './../../actions/cateActions'
import { getBrands } from './../../actions/brandActions'
import { UPDATE_PRODUCT_RESET } from '../../constants/productContants'
const UpdateProduct = ({ match, history }) => {

  const dispatch = useDispatch()
  const alert = useAlert()

  const { error, product } = useSelector((state) => state.productDetails)

  const { loading, error: updateError, isUpdated } = useSelector((state) => state.product)
  const { categories } = useSelector((state) => state.categories)
  const {brands} = useSelector((state) => state.brands)
  const [name, setName] = useState("")
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [Stock, setStock] = useState(0)
  const [images, setImages] = useState([])
  const [oldImages, setOldImages] = useState([])
  const [imagesPreview, setImagesPreview] = useState([])
  const [brand, setBrand] = useState("")
  // const categories = [
  //   "Laptop",
  //   "Footwear",
  //   "Bottom",
  //   "Tops",
  //   "Attire",
  //   "Camera",
  //   "SmartPhones",
  // ];

  const productId = match.params.id

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getDetailProduct(productId))
    } else {
      setName(product.name)
      setDescription(product.description)
      setPrice(product.price)
      setCategory(product.category)
      setStock(product.Stock)
      setOldImages(product.images)
      setBrand(product.brand)
    }
    if (error) {
      alert.show(error)
      dispatch(clearErrors())
    }

    if (updateError) {
      alert.show(updateError)
      dispatch(clearErrors())
    }
    if (isUpdated) {
      alert.show("update product successfully")
      history.push("/admin/products")
      dispatch({ type: UPDATE_PRODUCT_RESET })
    }
  }, [dispatch, alert, error, isUpdated, updateError, history, productId, product])
  const updateProductSubmitHandler = (e) => {
    e.preventDefault()

    const myForm = new FormData()

    myForm.set("name", name)
    myForm.set("price", price)
    myForm.set("description", description)
    myForm.set("category", category)
    myForm.set("Stock", Stock)
    myForm.set("brand", brand)

    images.forEach((image) => {
      myForm.append("images", image)
    })
    dispatch(updateProduct(productId, myForm))
  }

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files)

    setImages([])
    setImagesPreview([])
    setOldImages([])

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result])
          setImages((old) => [...old, reader.result])
        }
      }
      reader.readAsDataURL(file)
    })
  }
  return (

    <Fragment>
      <MetaData title="Update Product" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <h1>Update Product</h1>
            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </div>

            <div>
              <DescriptionIcon />

              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <AccountTreeIcon />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate.name} value={cate.name}>
                    {cate.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <AccountTreeIcon />
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              >
                <option value="">Choose Brand</option>
                {brands.map((brand) => (
                  <option key={brand.name} value={brand.name}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
                value={Stock}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Product Preview" />
                ))}
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
             // disabled={loading ? true : false}
            >
              Update Product
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  )
}

export default UpdateProduct