import React, { useState, useEffect } from "react";
import { List, Card, Image, Space } from "antd";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import CurrencyFormat from "react-currency-format";
import "./styles/ScreenListProduct.scss";

const ScreenListProduct = ({ listProduct, valueSelect }) => {
  const [count, setCount] = useState(40);

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
        />
        <CaretDownOutlined
          className="icon down"
          onClick={() => handleClickIcon("down")}
        />
      </div>
      <div className="list-product">
        <List
          pagination={{
            pageSize: 24,
            position: "bottom",
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
