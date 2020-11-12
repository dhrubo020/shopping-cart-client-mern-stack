import React, { createContext, useState } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Layout from './AdminComponents/Layout/Layout';
import Promotions from "./AdminComponents/Promotions/Promotions";
import Orders from "./AdminComponents/Orders/Orders";
import EditPromo from "./AdminComponents/Promotions/EditPromo/EditPromo";
import Homepage from "./UserComponents/Homepage/Homepage";
import AllCartProduct from "./UserComponents/UserCartComponent/AllCartProduct";
import { getDatabaseCart } from "./DatabaseManager/DatabaseManager";
import LoginPage from "./UserComponents/LoginPage/LoginPage";
import UserPrivateRoute from "./UserComponents/PrivateRoute/UserPrivateRoute";
import AdminPrivateRoute from "./AdminComponents/AdminLogin/AdminPrivateRoute";
import AdminLogin from "./AdminComponents/AdminLogin/AdminLogin";

export const CartContext = createContext();
export const UserContext = createContext();

function App() {

  const currentCart = getDatabaseCart()
  const allCartKeyArray = Object.keys(currentCart)
  const [allCartItems, setAllCartItems] = useState(allCartKeyArray)

  const [loggedInUser, setLoggedInUser] = useState({phone:''}); //------- global logged in user

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <CartContext.Provider value={[allCartItems, setAllCartItems]}>
        <div className="App">
          <BrowserRouter>
            <Switch>
              <Route exact path='/'> <Homepage /> </Route>
              <Route path='/cart'> <AllCartProduct /> </Route>
              <AdminPrivateRoute path='/admin'> <Layout /> </AdminPrivateRoute>

              <Route path='/adminLogin'> <AdminLogin/> </Route>
              <Route path='/login'> <LoginPage/> </Route>
              <Route path='*'> <h3>404</h3> </Route>
            </Switch>
          </BrowserRouter>
        </div>
      </CartContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
