import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./views/Login/Login";
import Home from './views/Home/Home';
import Overview from './views/Manage/Overview/Overview';
import Merchandise from "./views/Manage/Merchandise/Merchandise";
import CategoryProduct from "./views/Manage/Merchandise/CategoryProduct";
import Unit from "./views/Manage/Merchandise/Unit";
import Buyer from './views/Manage/Buyer/Buyer';
import TabBuyer from './components/TabUp/TabBuyer';
import TabPartner from './components/TabUp/TabPartner';
import TabMerchandise from './components/TabUp/TabMerchandise';
import Partner from './views/Manage/Partner/Partner';
import TabBillSell from './components/TabUp/TabBillSell';
import TabBillBuy from './components/TabUp/TabBillBuy';
import Inventory from './views/Manage/Merchandise/Inventory'
import Sale from './views/Sale/Sale';
import Signup from './views/Signup/Signup';
import BillSave from './views/Manage/Transaction/Bill/BillSave';
import BillSuccess from './views/Manage/Transaction/Bill/BillSuccess';
import Buy from './views/Buy/Buy';
import BillBuySave from './views/Buy/History/BillSave';
import BillBuySuccess from './views/Buy/History/BillSuccess';
import CashFlow from './views/Manage/CashFlow/CashFlow';
import NotifyScaleUp from './views/Notify/NotifyScaleUp'
import Error from './views/Error/Error';


const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/home" exact component={Home} />
        <Route path="/" exact component={Login} />
        <Route path="/notify" exact component={NotifyScaleUp} />
        <Route path="/dashboard" exact component={Overview} />
        <Route path="/dashboard/merchandise/category" exact component={Merchandise} />
        <Route path="/dashboard/merchandise/category-product" exact component={CategoryProduct} />
        <Route path="/dashboard/merchandise/unit" exact component={Unit} />
        <Route path="/dashboard/merchandise/inventory" exact component={Inventory} />
        <Route path="/dashboard/transaction/bill-save" exact component={BillSave} />
        <Route path="/dashboard/transaction/bill-save/:id" exact component={TabBillSell} />
        <Route path="/dashboard/transaction/bill-success" exact component={BillSuccess} />
        <Route path="/dashboard/transaction/bill-success/:id" exact component={TabBillSell} />
        <Route path="/dashboard/transaction/buy" exact component={Buy} />
        <Route path="/dashboard/transaction/buy/history/bill-save" exact component={BillBuySave} />
        <Route path="/dashboard/transaction/buy/history/bill-success" exact component={BillBuySuccess} />
        <Route path="/dashboard/transaction/buy/bill-success/:id" exact component={TabBillBuy} />
        <Route path="/dashboard/transaction/buy/bill-save/:id" exact component={TabBillBuy} />
        <Route path="/dashboard/buyer" exact component={Buyer} />
        <Route path="/dashboard/buyer/:id" exact component={TabBuyer} />
        <Route path="/dashboard/partner/:id" exact component={TabPartner} />
        <Route path="/dashboard/merchandise/:id" exact component={TabMerchandise} />
        <Route path="/dashboard/partner" exact component={Partner} />
        <Route path="/dashboard/cashflow" exact component={CashFlow} />
        <Route path="/sale" exact component={Sale} />
        <Route path="/signup" exact component={Signup} />

        <Route path="/*" exact component={Error} />      
      </Switch>
    </Router>
  );
};

export default App;
