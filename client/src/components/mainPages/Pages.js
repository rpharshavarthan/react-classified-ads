import React, {useContext} from 'react';
import {Switch, Route} from 'react-router-dom';
import Products from './products/Products';
import ProductDetail from './product_detail/ProductDetail';
import Login from "./auth/Login";
import Register from "./auth/Register";
import NotFound from "./utils/not_found/NotFound";
import Sell from './sell/Sell';
import MyAd from './my_ad/MyAd'
import ChatBox from './chat/Chat';
import {GlobalState} from "../../globalState";

function Pages() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
    return (
      <Switch>
        <Route path="/" exact component={Products}></Route>
        <Route path="/details/:id" exact component={ProductDetail}></Route>
        <Route
          path="/chat"
          exact
          component={isLogged ? ChatBox : Products}
        ></Route>
        <Route
          path="/chat/:id"
          exact
          component={isLogged ? ChatBox : Products}
        ></Route>
        <Route
          path="/login"
          exact
          component={isLogged ? Products : Login}
        ></Route>
        <Route
          path="/register"
          exact
          component={isLogged ? Products : Register}
        ></Route>
        <Route path="/my_ad" exact component={isLogged ? MyAd : Login}></Route>
        <Route path="/sell" exact component={isLogged ? Sell : Login}></Route>
        <Route
          path="/edit_product/:id"
          exact
          component={isLogged ? Sell : Login}
        ></Route>
        <Route path="*" exact component={NotFound}></Route>
      </Switch>
    );
}

export default Pages;
