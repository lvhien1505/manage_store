import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./views/Login/Login";
import Home from './views/Home/Home';
import Overview from './views/Manage/Overview/Overview';
import Merchandise from "./views/Manage/Merchandise/Merchandise";
import CategoryProduct from "./views/Manage/Merchandise/CategoryProduct";
import Unit from "./views/Manage/Merchandise/Unit";
import Transaction from './views/Manage/Transaction/Transaction';
import Buyer from './views/Manage/Buyer/Buyer';
import TabBuyer from './components/TabUp/TabBuyer';
import TabMerchandise from './components/TabUp/TabMerchandise';
import Partner from './views/Manage/Partner/Partner';
import Sale from './views/Sale/Sale';
import Signup from './views/Signup/Signup';
import Error from './views/Error/Error';


const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/dashboard" exact component={Overview} />
        <Route path="/dashboard/merchandise/category" exact component={Merchandise} />
        <Route path="/dashboard/merchandise/category-product" exact component={CategoryProduct} />
        <Route path="/dashboard/merchandise/unit" exact component={Unit} />
        <Route path="/dashboard/transaction" exact component={Transaction} />
        <Route path="/dashboard/buyer" exact component={Buyer} />
        <Route path="/dashboard/buyer/:id" exact component={TabBuyer} />
        <Route path="/dashboard/merchandise/:id" exact component={TabMerchandise} />
        <Route path="/dashboard/partner" exact component={Partner} />
        <Route path="/sale" exact component={Sale} />
        <Route path="/signup" exact component={Signup} />

        <Route path="/*" exact component={Error} />      
      </Switch>
    </Router>
  );
};

export default App;
