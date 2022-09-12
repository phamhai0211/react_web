import React, { Fragment, useEffect, useState } from 'react'
import "./Products.css"
import { useSelector, useDispatch } from "react-redux"
import { clearErrors, getProducts } from '../../actions/productActions'
import Loader from './../layout/Loader/Loader';
import ProductCard from "../Home/ProductCart";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { useAlert } from 'react-alert';
import MetaData from "../layout/MetaData"
import { getCategories } from "../../actions/cateActions"
import { getBrands } from "../../actions/brandActions"
import axios from 'axios';

const cats = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
];
const Products = ({ match }) => {
    const alert = useAlert()
    const dispath = useDispatch()
    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([0, 25000])
    const [category, setCategory] = useState("")
    const [rating, setRating] = useState(0)
    const [brand, setBrand] = useState("")
    const {
        loading,
        error,
        products,
        productsCount,
        resultPerPage,
        filteredProductsCount
    } = useSelector(
        (state) => state.products
    )
    const { categories } = useSelector((state) => state.categories)
    const { brands } = useSelector((state) => state.brands)
    //console.log(cate)
    // const cate = []
    // categories && 
    //     categories.map((item)=>{
    //         cate.push(item.name)
    //     })

    // console.log(cate)
    // const [cate, setCate] = useState("")
    // async function getCategories(){
    //     const {data} = await axios.get("/api/categories")
    //     console.log(data)
    // }
    //const cate = data
    // async function getCategories(){
    //     const {data} = await axios.get("/api/categories")
    //     setCate(data.cate)

    // }

    const keyword = match.params.keyword
    useEffect(() => {
        if (error) {
            alert.show(error);
            dispath(clearErrors())
        }
        dispath(getProducts(keyword, currentPage, price, category, rating, brand))
        dispath(getCategories())
        dispath(getBrands())
    }, [dispath, keyword, currentPage, price, category, rating, alert, error, brand])

    const setCurrentPageNo = (e) => {
        setCurrentPage(e)
    }

    // cate && 
    //     cate.forEach((item)=>{

    //     })

    const priceHandler = (event, newPrice) => {
        // console.log(newPrice)
        setPrice(newPrice)
    }
    let count = filteredProductsCount

    return (
        <Fragment>

            <Fragment>
                <MetaData title="Products ------ECOMMERCE" />
                <h2 className="productsHeading">Products { }</h2>
                <div className="products">
                    {products &&
                        products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))
                    }
                </div>

                <div className="filterBox">
                    <Typography>Price</Typography>
                    <Slider
                        value={price}
                        onChange={priceHandler}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        min={0}
                        max={25000}
                    />
                    <Typography>Categories</Typography>
                    <ul className="categoryBox">
                        {categories.map((category) => (
                            <li
                                className="category-link"
                                key={category._id}
                                onClick={() => setCategory(category.name)}
                            >
                               <h2>{category.name}</h2>
                            </li>
                        ))}
                    </ul>
                    <Typography>Brands</Typography>
                    <ul className="categoryBox">
                        {brands.map((item) => (
                            <li
                                className="category-link"
                                key={item._id}
                                onClick={() => setBrand(item.name)}
                            >
                                <h2>{item.name}</h2>
                            </li>
                        ))}
                    </ul>
                    <fieldset>
                        <Typography component="legend">Ratings Above</Typography>
                        <Slider
                            value={rating}
                            onChange={(e, newRating) => {
                                setRating(newRating);
                            }}
                            aria-labelledby="continuous-slider"
                            valueLabelDisplay="auto"
                            min={0}
                            max={5}
                        />
                    </fieldset>
                </div>

                {resultPerPage < count &&

                    <div className="paginationBox">
                        <Pagination
                            activePage={currentPage}
                            itemsCountPerPage={resultPerPage}
                            totalItemsCount={productsCount}
                            onChange={setCurrentPageNo}
                            nextPageText="Next"
                            prevPageText="Previous"
                            firstPageText="1st"
                            lastPageText="Last"
                            itemClass="page-item"
                            linkClass="page-link"
                            activeClass='pageItemActive'
                            activeLinkClass='pageLinkActive'
                        />
                    </div>

                }
            </Fragment>

        </Fragment>
    )
}

export default Products