import React, { useState, useEffect } from "react";
import { Tabs, Button, Image } from "antd";
import {
  ArrowLeftOutlined,
  StopOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import Dashboard from "../DashBoard/Dashboard";
import ModalUpdateProduct from "../../components/Modals/ModalUpdate/ModalUpdateProduct";
import ModalDeleteProduct from "../../components/Modals/ModalConfirmDelete/ModalDeleteProduct";
import CurrencyFormat from "react-currency-format";
import NotifyScaleUp from "../../views/Notify/NotifyScaleUp";
import { getProductWithId } from "../../api/product";
import { notifyScreen } from "../../utils/notify";
import { convertDay } from "../../utils/convert";
import "./styles/TabMerchandise.scss";

const TabMerchandise = ({ match, history }) => {
  const [hideModalUpdate, setHideModalUpdate] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [hideModalDelete, setHideModalDelete] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [product, setProduct] = useState({});

  const __getProductWithId = async (id) => {
    try {
      let res = await getProductWithId(id);
      if (res.status === 200) {
        return setProduct(res.data);
      }
    } catch (error) {
      if (error) {
        notifyScreen("error", "500", "Lỗi không xác định");
      }
    }
  };

  const handlerHideModalUpdate = () => {
    setHideModalUpdate(!hideModalUpdate);
    return setShowModalUpdate(false);
  };

  const handlerShowModalUpdate = () => {
    setShowModalUpdate(true);
    return setHideModalUpdate(!hideModalUpdate);
  };

  const handlerHideModalDelete = () => {
    setHideModalDelete(!hideModalDelete);
    return setHideModalDelete(false);
  };

  const handlerShowModalDelete = () => {
    setShowModalDelete(true);
    return setHideModalDelete(!hideModalDelete);
  };

  useEffect(() => {
    __getProductWithId(match.params.id);
  }, [hideModalUpdate, hideModalDelete]);

  return (
    <Dashboard
      nameSelect={product.code ? "SP" + product.code : ""}
      defaulCheckKey="2"
    >
      <div className="product-tabup">
        <div className="product-tabup__pc">
          <Tabs
            defaultActiveKey="thongtin"
            type="card"
            centered
            className="tabup-full"
          >
            <Tabs.TabPane tab="Thông tin" key="thongtin">
              <div className="info-wrapper">
                <div className="info-image">
                  <Image
                    src={
                      process.env.REACT_APP_ENV === "development"
                        ? `${process.env.REACT_APP_BACKEND_URL}/${product.image}`
                        : `/${product.image}`
                    }
                    alt={product.name}
                    style={{ objectFit: "cover" }}
                    width="250px"
                    height="250px"
                  />
                </div>
                <div className="info-detail">
                  <div className="info-detail-info">
                    Mã hàng : {"SP" + product.code}
                  </div>
                  <div className="info-detail-info">
                    Tên hàng : {product.name}
                  </div>
                  <div className="info-detail-info">
                    Nhóm hàng : {product.category ? product.category.name : ""}
                  </div>
                  <div className="info-detail-info">
                    Đơn vị : {product.unit ? product.unit.name : ""}
                  </div>
                  <div className="info-detail-info">
                    Giá nhập :{" "}
                    <CurrencyFormat
                      value={product.moneyIn}
                      displayType={"text"}
                      thousandSeparator={true}
                      renderText={(value) => <span>{value}</span>}
                    />
                  </div>
                  <div className="info-detail-info">
                    Giá bán :{" "}
                    <CurrencyFormat
                      value={product.moneyOut}
                      displayType={"text"}
                      thousandSeparator={true}
                      renderText={(value) => <span>{value}</span>}
                    />
                  </div>
                  <div className="info-detail-info">
                    Tồn kho :{" "}
                    <CurrencyFormat
                      value={product.inventory}
                      displayType={"text"}
                      thousandSeparator={true}
                      renderText={(value) => <span>{value}</span>}
                    />
                  </div>
                  <div className="info-detail-info">
                    Ngày tạo: {convertDay(product.createdAt)}
                  </div>
                </div>
                <div className="note">
                  {product.note ? product.note : "..Ghi chú"}
                </div>
                <div className="info-action">
                  <Button
                    className="info-action__btn"
                    type="primary"
                    size="large"
                    onClick={handlerShowModalUpdate}
                    icon={<ToolOutlined />}
                  >
                    Cập nhật
                  </Button>
                  <Button
                    className="info-action__btn"
                    type="primary"
                    size="large"
                    danger
                    onClick={() => history.push("/notify")}
                    icon={<StopOutlined />}
                  >
                    Ngừng kinh doanh
                  </Button>
                  <Button
                    className="info-action__btn"
                    type="primary"
                    size="large"
                    danger
                    onClick={handlerShowModalDelete}
                    icon={<StopOutlined />}
                  >
                    Xóa
                  </Button>
                </div>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Thẻ kho" key="thekho">
              <NotifyScaleUp />
            </Tabs.TabPane>
          </Tabs>
          <div className="icon-goback" onClick={() => history.goBack()}>
            <ArrowLeftOutlined />
            <span style={{ marginLeft: "5px" }}>Quay lại</span>
          </div>
        </div>
        <div className="product-tabup__mobile">
          <div className="icon-goback" onClick={() => history.goBack()}>
            <ArrowLeftOutlined style={{ color: "white" }} />
          </div>
          <Tabs defaultActiveKey="thongtin" type="card">
            <Tabs.TabPane tab="Thông tin" key="thongtin">
              <div className="product-header">
                <div className="product-image">
                  <Image
                    src={
                      process.env.REACT_APP_ENV === "development"
                        ? `${process.env.REACT_APP_BACKEND_URL}/${product.image}`
                        : `/${product.image}`
                    }
                    alt={product.name}
                    style={{ objectFit: "cover" }}
                    width="80px"
                    height="80px"
                  />
                </div>
              </div>
              <div className="info-detail">
                <div className="info-detail-info product-name">
                  {product.name}
                </div>
                <div className="info-detail-info">
                  <span> Mã hàng</span>
                  <span className="product-value">{"SP" + product.code}</span>
                </div>
                <div className="info-detail-info">
                  <span>Nhóm hàng</span>
                  <span className="product-value">
                    {product.category ? product.category.name : ""}
                  </span>
                </div>
                <div className="info-detail-info">
                  <span> Đơn vị</span>
                  <span className="product-value">
                    {product.unit ? product.unit.name : ""}
                  </span>
                </div>
                <div className="info-detail-info">
                  <span>Giá nhập</span>
                  <span className="product-value">{product.moneyIn}</span>
                </div>
                <div className="info-detail-info">
                  <span>Giá bán</span>
                  <span className="product-value">{product.moneyOut}</span>
                </div>
                <div className="info-detail-info">
                  <span>Tồn kho</span>
                  <span className="product-value">{product.inventory}</span>
                </div>
                <div className="info-detail-info">
                  <span>Ngày tạo</span>
                  <span className="product-value">
                    {convertDay(product.createdAt)}
                  </span>
                </div>
              </div>
              <div className="note">
                {product.note ? product.note : "..Ghi chú"}
              </div>
              <div className="product-action">
                <Button
                  className="product-action__btn"
                  type="primary"
                  size="small"
                  onClick={handlerShowModalUpdate}
                >
                  Cập nhật
                </Button>
                <Button
                  className="product-action__btn"
                  type="primary"
                  size="small"
                  danger
                  onClick={handlerShowModalDelete}
                >
                  Xóa
                </Button>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Thẻ kho" key="thekho">
              <NotifyScaleUp />
            </Tabs.TabPane>
          </Tabs>
        </div>
        {showModalUpdate ? (
          <ModalUpdateProduct
            productEdit={product}
            hideModal={hideModalUpdate}
            handleHideModal={handlerHideModalUpdate}
          />
        ) : null}
        {showModalDelete ? (
          <ModalDeleteProduct
            idProduct={product._id ? product._id : null}
            hideModal={hideModalDelete}
            handleHideModal={handlerHideModalDelete}
          />
        ) : null}
      </div>
    </Dashboard>
  );
};

export default TabMerchandise;
