import React, { useState, useEffect } from "react";
import Dashboard from "../../components/DashBoard/Dashboard";
import ContentBuy from "../../components/Buy/ContentBuy";
import ScreenListProduct from "../../components/Sale/ScreenListProduct";
import { getListPartner } from "../../api/partner";
import { getProduct } from "../../api/product";
import {checkAuth} from '../../api/login'
import { notifyScreen } from "../../utils/notify";
import Cookies from "js-cookie";
import './Buy.scss'


let token=Cookies.get("__t");

const Buy = ({history}) => {
  const [statusChange, setStatusChange] = useState(false);
  const [listPartner, setListPartner] = useState([]);
  const [listProduct, setListProduct] = useState([]);
  const [listProductSelect, setListProductSelect] = useState([]);
  const [name, setName] = useState("");

  const __checkAuth = async ()=>{
    try {
      let res= await checkAuth(token);
      if (res.status === 200) {
        return setName(res.data.name);
      }
      
    } catch (error) {
      notifyScreen("error","401","Lỗi xác thực !")
      history.push("/login")
    }
  }

  const __getListPartner = async () => {
    try {
      let res = await getListPartner();
      if (res.status === 200) {
        return setListPartner(res.data);
      }
    } catch (error) {
      notifyScreen("error", "500", "Lỗi không xác định");
    }
  };

  const __getListProduct = async () => {
    try {
      let res = await getProduct();
      if (res.status === 200) {
        return setListProduct(res.data);
      }
    } catch (error) {
      notifyScreen("error", "500", "Lỗi không xác định");
    }
  };

  const handleSelectProduct = (newProduct) => {
    let count = 0;
    let newListProduct = listProductSelect.map((product) => {
      if (newProduct._id === product._id) {
        product.countNum += 1;
        product.totalMoney = product.moneyOut * product.countNum;
        count++;
      }
      return product;
    });
    if (count > 0) {
      setStatusChange(!statusChange);
      return setListProductSelect(newListProduct);
    }
    if (count === 0) {
      newProduct.totalMoney = newProduct.moneyOut;
      newProduct.countNum = 1;
      listProductSelect.push(newProduct);
      setStatusChange(!statusChange);
      return setListProductSelect(listProductSelect);
    }
  };

  const handleRemoveProduct = (id) => {
    let newListProduct = listProductSelect.filter(
      (product) => product._id != id
    );
    setStatusChange(!statusChange);
    return setListProductSelect(newListProduct);
  };
  useEffect(() => {
    __checkAuth()
    __getListPartner();
    __getListProduct();
  }, [statusChange,name]);
  return (
    <Dashboard nameSelect="Nhập hàng" defaulCheckKey="3">
      <div className="buy-wrapper">
        <ContentBuy
          listBuy={listProductSelect.length > 0 ? listProductSelect : []}
          nameSale={name?name:"Admin"}
          listPartner={listPartner}
          removeProduct={(id) => handleRemoveProduct(id)}
        />
        <ScreenListProduct
          listProduct={listProduct.length > 0 ? listProduct : []}
          valueSelect={handleSelectProduct}
        />
      </div>
    </Dashboard>
  );
};

export default Buy;
