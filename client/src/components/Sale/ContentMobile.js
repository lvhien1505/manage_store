import React, { useState, useEffect } from "react";
import { Button, Avatar } from "antd";
import {
  PlusOutlined,
  UserOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import Bill from './Bill';
import BuyerMobile from '../Buyer/BuyerMobile'
import ModalAddMerchandise from "../Modals/ModalAdd/ModalAddMerchandise";
import "./styles/ContentMobile.scss";
import { Link } from "react-router-dom";

const ContentMobile = ({ listProduct, handleChangeListProduct }) => {
  const [hideModalAdd, setHideModalAdd] = useState(false);
  const [hideBill, setHideBill] = useState(false);
  const [hideContentListBuyer, setHideContentListBuyer] = useState(false);
  const [statusChange, setStatusChange] = useState(false);
  const [showBtnAction, setShowBtnAction] = useState(false);
  const [listSelectProduct, setListSelectProduct] = useState([]);
  const [buyer,setBuyer]=useState({});

  const handlerHideModal = () => {
    return setHideModalAdd(!hideModalAdd);
  };

  const handleSelectProduct = (selectProduct) => {
    if (!showBtnAction) {
      setShowBtnAction(true);
    }
    let count = 0;
    let newList = listSelectProduct.map((product) => {
      if (selectProduct._id === product._id) {
        product.countNum += 1;
        product.totalMoney = product.countNum * parseInt(product.moneyOut);
        count++;
      }
      return product;
    });
    if (count === 0) {
      let _id = selectProduct._id;
      let code = selectProduct.code;
      let name = selectProduct.name;
      let inventory = selectProduct.inventory;
      let moneyOut = selectProduct.moneyOut;
      let countNum = 1;
      let totalMoney = countNum * parseInt(moneyOut);
      let product = {
        _id,
        code,
        name,
        inventory,
        moneyOut,
        countNum,
        totalMoney,
      };
      listSelectProduct.push(product);
      setStatusChange(!statusChange);
      return setListSelectProduct(listSelectProduct);
    }
    return setListSelectProduct(newList);
  };

  const handleChange = () => {
    return handleChangeListProduct();
  };

  const handleHideBill =()=>{
    return setHideBill(!hideBill);
    
  }

  const handleHideContentListBuyer =()=>{
    return setHideContentListBuyer(!hideContentListBuyer);
  }

  const handleGetBuyer =(buyer)=>{
      return setBuyer(buyer);
  }

  useEffect(() => {}, [listSelectProduct, statusChange,hideContentListBuyer]);

  return (
    <div className="product-wrapper">
      <div>
        <div className="btn">
          <Button
            onClick={() => setHideModalAdd(!hideModalAdd)}
            className="btn-add__product"
            icon={<PlusOutlined className="icon-plus__edit" />}
            type="primary"
          >
            Thêm hàng hóa
          </Button>
        </div>
        <ModalAddMerchandise
          hideModal={hideModalAdd}
          handleHideModal={handlerHideModal}
          handleChange={handleChange}
        />
      </div>
      <div className="search-buyer">
        <Button
          onClick={() => setHideContentListBuyer(!hideContentListBuyer)}
          icon={<UserOutlined />}
          type="link"
          style={{ color: "rgb(128, 123, 123)" }}
        >
          Chọn khách hàng
        </Button>
        <span style={{ color: "rgb(128, 123, 123)", marginRight: "10px" }}>
          {buyer.name ? buyer.name : " Khách hàng"}
        </span>
      </div>
      <div className="filter-product">
        <Button
          onClick={() => setHideModalAdd(!hideModalAdd)}
          icon={<UnorderedListOutlined />}
          type="link"
          style={{ color: "rgb(128, 123, 123)" }}
        >
          Lọc sản phẩm
        </Button>
      </div>
      <div
        className="product-list"
        style={
          showBtnAction
            ? { maxHeight: "69vh", overflow: "auto" }
            : { height: "100%" }
        }
      >
        {listProduct.length > 0
          ? listProduct.map((product) => (
              <div
                key={product._id}
                className="product-info"
                onClick={() => handleSelectProduct(product)}
                style={
                  listSelectProduct.length > 0
                    ? listSelectProduct.filter(
                        (productSelect) => product._id === productSelect._id
                      ).length > 0
                      ? { backgroundColor: "#92F299" }
                      : { backgroundColor: "#fff" }
                    : { backgroundColor: "#fff" }
                }
              >
                <div className="product-info__avatar">
                  <Avatar
                    src={
                      process.env.NODE_ENV === "development"
                        ? `${process.env.REACT_APP_BACKEND_URL}/${product.image}`
                        : `/${product.image}`
                    }
                    size={{ xs: 48 }}
                    shape="square"
                  />
                </div>
                <div className="product-info__info">
                  <div className="name">{product.name}</div>
                  <div className="code">{"SP" + product.code}</div>
                </div>
                <div className="product-info__count">
                  <div className="money-out">{product.moneyOut}</div>
                  <div className="inventory">
                    <span style={{ color: "#756262" }}>
                      {listSelectProduct.length > 0
                        ? listSelectProduct.filter(
                            (productSelect) => product._id === productSelect._id
                          ).length > 0
                          ? "x" +
                            listSelectProduct.filter(
                              (productSelect) =>
                                product._id === productSelect._id
                            )[0].countNum +
                            " / "
                          : ""
                        : ""}
                    </span>
                    {product.inventory}
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
      {showBtnAction ? (
        <div className="btn-action">
          <Button
            type="primary"
            onClick={() => {
              setListSelectProduct([]);
              return setShowBtnAction(false);
            }}
            className="btn btn-reset"
          >
            Chọn lại
          </Button>
            <Button
              type="primary"
              className="btn btn-add__bill"
              onClick={() => setHideBill(true)}
            >
              Xong
            </Button>
        </div>
      ) : (
        ""
      )}
      {hideContentListBuyer ? <BuyerMobile hideBuyerMobile={handleHideContentListBuyer} valueSelectBuyer={handleGetBuyer}/> :""}
      {hideBill ? <Bill hideBill={handleHideBill} listSelectProduct={listSelectProduct} infoBuyer={buyer? buyer : {}}/>: ""}
    </div>
  );
};

export default ContentMobile;
