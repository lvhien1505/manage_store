import React, { useState, useEffect } from "react";
import Dashboard from "../../components/DashBoard/Dashboard";
import ContentBuy from "../../components/Buy/ContentBuy";
import ScreenListProduct from "../../components/Sale/ScreenListProduct";
import { getListPartner } from "../../api/partner";
import { getProduct } from "../../api/product";
import { notifyScreen } from "../../utils/notify";

const Buy = () => {
  const [statusChange, setStatusChange] = useState(false);
  const [listPartner, setListPartner] = useState([]);
  const [listProduct, setListProduct] = useState([]);
  const [listProductSelect, setListProductSelect] = useState([]);
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
    __getListPartner();
    __getListProduct();
  }, [statusChange]);
  return (
    <Dashboard nameSelect="Nhập hàng" defaulCheckKey="3">
      <div>
        <ContentBuy
          listBuy={listProductSelect.length > 0 ? listProductSelect : []}
          nameSale="Admin-TranSang"
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
