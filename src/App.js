
import './App.css';
import React from "react"
import { useEffect, useState } from 'react'
import Header from "./components/layout/Header/Header.js"
import Footer from "./components/layout/Footer/Footer"
import axios from 'axios'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import WebFont from "webfontloader"
import Home from "./components/Home/Home"
import ProductDetail from './components/Product/ProductDetail';
import Products from './components/Product/Products'
import Search from './components/Product/Search'
import LoginSignup from './components/User/LoginSignup';
import Profile from "./components/User/Profile"
import store from './store'
import { useSelector } from "react-redux"
import UserOptions from "./components/layout/Header/UserOptions"
import { loadUser } from './actions/userActions';
import ProtectRoute from "./components/Route/ProtectRoute"
import UpdateProfile from "./components/User/UpdateProfile"
import UpdatePassword from './components/User/UpdatePassword';
import ForgotPassword from './components/User/ForgotPassword';
import ResetPassword from './components/User/ResetPassword';
import Cart from "./components/Cart/Cart"
import Shipping from './components/Cart/Shipping';
import ConfirmOrder from './components/Cart/ConfirmOrder';
import Payment from './components/Cart/Payment';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from './components/Cart/OrderSuccess';
import MyOrder from './components/Order/MyOrder';
import OrderDetails from './components/Order/OrderDetails';
import Dashboard from './components/Admin/Dashboard';
import ProductList from './components/Admin/ProductList';
import NewProduct from './components/Admin/NewProduct';
import UpdateProduct from './components/Admin/UpdateProduct';
import ProcessOrder from './components/Admin/ProcessOrder';
import OrderList from './components/Admin/OrderList';
import UserList from './components/Admin/UserList'
import UpdateUser from './components/Admin/UpdateUser';
import CategoryList from "./components/Admin/CategoryList";
import NewCategory from "./components/Admin/NewCategory"
import StaffList from "./components/Admin/StaffList"
import ProductReviews from './components/Admin/ProductReviews';
import NewStaff from './components/Admin/NewStaff';
import UpdateStaff from './components/Admin/UpdateStaff';
import Contact from "./components/layout/Contact/Contact"
import About from "./components/layout/About/About"
import BrandList from './components/Admin/BrandList';
import NewBrand from './components/Admin/NewBrand';
import RefundOrder from './components/Order/RefundOrder';
function App() {

  const { isAuthenticated, user } = useSelector((state) => state.user)

  const [stripeApiKey, setStripeApiKey] = useState("")

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/stripeapikey")

    setStripeApiKey(data.stripeApiKey)

  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      }
    })

    store.dispatch(loadUser())

    getStripeApiKey()

  }, [])

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}

      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectRoute exact path="/process/payment" component={Payment} />
        </Elements>
      )}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/product/:id" component={ProductDetail} />
        <Route exact path="/products" component={Products} />
        <Route path="/products/:keyword" component={Products} />
        <Route exact path="/Search" component={Search} />
        <ProtectRoute axact path="/account" component={Profile} />
        <ProtectRoute axact path="/me/update" component={UpdateProfile} />
        <ProtectRoute exact path="/password/update" component={UpdatePassword} />
        <Route exact path="/password/forgot" component={ForgotPassword} />
        <Route exact path="/password/reset/:token" component={ResetPassword} />
        <Route extact path="/login" component={LoginSignup} />
        <Route extact path="/cart" component={Cart} />
        <ProtectRoute extact path="/shipping" component={Shipping} />
        <ProtectRoute extact path="/order/confirm" component={ConfirmOrder} />
        <ProtectRoute extact path="/success" component={OrderSuccess} />
        <ProtectRoute extact path="/orders" component={MyOrder} />
        <ProtectRoute extact path="/order/:id" component={OrderDetails} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/about" component={About} />
        <ProtectRoute
          extact
          isAdmin={true}
          path="/admin/dashboard"
          component={Dashboard} />

        <ProtectRoute
          extact
          isAdmin={true}
          path="/admin/products"
          component={ProductList} />

        <ProtectRoute
          extact
          isAdmin={true}
          path="/admin/product"
          component={NewProduct} />

        <ProtectRoute
          extact
          isAdmin={true}
          path="/admin/product11/:id"
          component={UpdateProduct}
        />

        <ProtectRoute
          extact
          isAdmin={true}
          path="/admin/orders"
          component={OrderList}
        />

        <ProtectRoute
          extact
          isAdmin={true}
          path="/admin/order11/:id"
          component={ProcessOrder}
        />

        <ProtectRoute
          extact
          isAdmin={true}
          path="/admin/users"
          component={UserList}
        />

        <ProtectRoute
          extact
          idAmin={true}
          path="/admin/user11/:id"
          component={UpdateUser}
        />

        <ProtectRoute
          extact
          isAdmin={true}
          path="/admin/categories"
          component={CategoryList}
        />

        <ProtectRoute
          exact
          isAdmin={true}
          path="/admin/category"
          component={NewCategory}
        />

        <ProtectRoute
          exact
          isAdmin={true}
          path="/admin/staffs"
          component={StaffList}
        />

        <ProtectRoute
          exact
          path="/admin/reviews"
          isAdmin={true}
          component={ProductReviews}
        />
        <ProtectRoute
          exact
          path="/admin/staff"
          isAdmin={true}
          component={NewStaff}
        />
        <ProtectRoute
          exact
          path="/admin/staff11/:id"
          isAdmin={true}
          component={UpdateStaff}
        />
        <ProtectRoute
          exact
          path="/admin/brands"
          isAdmin={true}
          component={BrandList}
        />
        <ProtectRoute
          exact
          path="/admin/brand"
          isAdmin={true}
          component={NewBrand}
        />
      </Switch>

      <Footer />

    </Router>
  );
}

export default App;
