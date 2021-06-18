import React, { useState, useEffect } from "react";
import { List, Image, Tooltip } from "antd";
import {
  CaretUpOutlined,
  CaretDownOutlined,
  FilterOutlined,
  UnorderedListOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import CurrencyFormat from "react-currency-format";
import ModalAddMerchandise from "../Modals/ModalAdd/ModalAddMerchandise";
import "./styles/ScreenListProduct.scss";

const ScreenListProduct = ({ listProduct, valueSelect }) => {
  const [count, setCount] = useState(40);
  const [hideModalAdd, setHideModalAdd] = useState(false);

  const handlerHideModal = () => {
    return setHideModalAdd(!hideModalAdd);
  };

  const handleClickIcon = (type) => {
    if (type === "up") {
      if (count >= 70) {
        return setCount(70);
      }
      return setCount(count + 30);
    }
    if (type === "down") {
      switch (count) {
        case count >= 50:
          setCount(count - 30);
          break;
        case count <= 10:
          setCount(count - 10);
          break;
        case count == 20:
          setCount(count - 10);
          break;
        default:
          setCount(count - 20);
          break;
      }
    }
  };

  useEffect(() => {}, [count]);

  return (
    <div
      className="screen-list__product"
      style={{ transition: "0.7s", height: `${count}%` }}
    >
      <div className="icon-resize">
        <CaretUpOutlined
          className="icon up"
          onClick={() => handleClickIcon("up")}
          style={{ fontSize: "60px" }}
        />
        <CaretDownOutlined
          className="icon down"
          onClick={() => handleClickIcon("down")}
          style={{ fontSize: "60px" }}
        />
      </div>
      <div className="filter-product">
        <Tooltip title="Thêm sản phẩm" arrowPointAtCenter placement="topRight">
          <span
            className="symbol-icon-filter symbol-icon-add-product"
            onClick={handlerHideModal}
          >
            <PlusOutlined />
          </span>
        </Tooltip>
        <Tooltip title="Thêm sản phẩm" arrowPointAtCenter placement="topRight">
          <span className="symbol-icon-filter symbol-icon-filter-prize">
            <FilterOutlined />
          </span>
        </Tooltip>
        <Tooltip title="Lọc theo nhóm hàng" arrowPointAtCenter placement="topRight">
          <span className="symbol-icon-filter symbol-icon-filter-category">
            <UnorderedListOutlined />
          </span>
        </Tooltip>

        <ModalAddMerchandise
          hideModal={hideModalAdd}
          handleHideModal={handlerHideModal}
        />
      </div>
      <div className="list-product">
        <List
          pagination={{
            pageSize: 2,
            position: "top",
          }}
          grid={{ gutter: 16, column: 6 }}
          dataSource={listProduct.length > 0 ? listProduct : []}
          renderItem={(product) => (
            <List.Item key={product._id}>
              <div
                className="item-product"
                onClick={() =>
                  valueSelect({
                    _id: product._id,
                    code: product.code,
                    name: product.name,
                    inventory: product.inventory,
                    moneyOut: product.moneyOut,
                  })
                }
              >
                <div className="image-product">
                  <Image
                    src={
                      process.env.REACT_APP_ENV === "development"
                        ? `${process.env.REACT_APP_BACKEND_URL}/${product.image}`
                        : `/${product.image}`
                    }
                    preview={false}
                    width="50px"
                    height="65px"
                    style={{ objectFit: "cover" }}
                    title={`--Tồn : ${product.inventory}`}
                  />
                </div>
                <div className="info-product">
                  <div className="info-product__name">{product.name}</div>
                  <div className="info-product__price">
                    <CurrencyFormat
                      value={product.moneyOut}
                      displayType={"text"}
                      thousandSeparator={true}
                      renderText={(value) => <span>{value}</span>}
                    />
                  </div>
                </div>
              </div>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default ScreenListProduct;
