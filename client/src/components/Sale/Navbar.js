import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Select, Menu, Button, Image } from "antd";
import { SearchOutlined, MenuOutlined } from "@ant-design/icons";
import CurrencyFormat from 'react-currency-format'
import "./styles/Navbar.scss";

const Navbar = ({ listProduct, valueSelectProduct }) => {
  const [hideMenu, setHideMenu] = useState(false);
  const [valueSelect, setValueSelect] = useState("");

  const handleChange = (value) => {
    return setValueSelect("");
  };

  const handleSearch = (value) => {
    return [];
  };
  useEffect(() => {}, []);
  return (
    <div className="navbar">
      <div className="input-select">
        <Select
          placeholder="Tìm mặt hàng"
          onChange={handleChange}
          showSearch
          showArrow={false}
          onSearch={handleSearch}
          style={{ padding: "5px", width: "35vw" }}
          value={valueSelect ? valueSelect : "Tìm mặt hàng"}
          bordered
        >
          {listProduct.length > 0
            ? listProduct.map((product) => (
                <Select.Option key={product._id} value={product._id}>
                  <div
                    style={{ display: "flex", justifyContent: "flex-start" }}
                    onClick={() =>
                      valueSelectProduct({
                        _id: product._id,
                        code: product.code,
                        name: product.name,
                        inventory: product.inventory,
                        moneyOut: product.moneyOut,
                      })
                    }
                  >
                    <div>
                      <Image
                        src={
                          process.env.REACT_APP_ENV === "development"
                            ? `${process.env.REACT_APP_BACKEND_URL}/${product.image}`
                            : `/${product.image}`
                        }
                        preview={false}
                        width="50px"
                        height="50px"
                        style={{ marginTop: "8px" }}
                      />
                    </div>
                    <div style={{ marginLeft: "15px" }}>
                      <div>
                        <span style={{ fontSize: "15px", fontWeight: "600" }}>
                          {product.name}
                        </span>
                      </div>
                      <div>
                        <span style={{ fontSize: "13px" }}>
                          {"SP" + product.code}
                        </span>
                        <span style={{ marginLeft: "15px", fontSize: "13px" }}>
                          Giá : <CurrencyFormat
                      value={product.moneyOut}
                      displayType={"text"}
                      thousandSeparator={true}
                      renderText={(value) => <span>{value}</span>}
                    />
                        </span>
                      </div>
                      <div>
                        <span style={{ fontSize: "13px" }}>
                          Tồn : {product.inventory}
                        </span>
                      </div>
                    </div>
                  </div>
                </Select.Option>
              ))
            : []}
        </Select>
        <div className="input-search__icon">
          <SearchOutlined />
        </div>
      </div>
      <div className="navbar-menu">
        <div className="btn-toggle">
          <Button
            icon={<MenuOutlined style={{ fontSize: "18px", color: "white" }} />}
            className="btn-category"
            onClick={() => setHideMenu(!hideMenu)}
            style={{ border: "0", backgroundColor: "#0090da" }}
          ></Button>
        </div>
        <div className="list-select">
          {hideMenu ? (
            <Menu mode="inline" className="menu">
              <Menu.Item key="2">
                <Link to="/dashboard/transaction/bill-success">Lịch sử bán hàng</Link>
              </Menu.Item>
              {/* <Menu.Item key="1">Xem báo cáo cuối ngày</Menu.Item>
              <Menu.Item key="3">Lập phiếu thu</Menu.Item> */}
              <Menu.Item key="4">
                <Link to="/dashboard">Quản lý</Link>
              </Menu.Item>
              <Menu.Item key="5">
                <Link to="/">Đăng xuất</Link>
              </Menu.Item>
            </Menu>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
