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

export const CartContext = createContext();

function App() {
  
  const currentCart = getDatabaseCart()
  const allCartKeyArray = Object.keys(currentCart)
  const [allCartItems, setAllCartItems] = useState(allCartKeyArray)

  return (
    <CartContext.Provider value={[allCartItems, setAllCartItems]}>
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path='/'> <Homepage /> </Route>
            <Route path='/cart'> <AllCartProduct /> </Route>
            <Route path='/admin'> <Layout /> </Route>
            {/* <Route  path='/promotion'> <Promotions/> </Route>
          <Route  path='/orders'> <Orders/> </Route> */}
            <Route path='*'> <h3>404</h3> </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </CartContext.Provider>
  );
}

export default App;
