import React, { useState } from "react";
import { Button, Space, Menu } from "antd";
import { ShopFilled, DatabaseFilled, CaretDownFilled } from "@ant-design/icons";
import "./Home.scss";

const Home = () => {
  const [hideMenu, setHideMenu] = useState(false);
  return (
    <div className="home">
      <div className="home-header">
        <h4>Chao Admin</h4>
        <div className="home-header__menu">
          <div className="btn-toggle">
            <Button
              icon={<CaretDownFilled style={{ fontSize: "18px",color:"green" }} />}
              className="btn-category"
              onClick={() => setHideMenu(!hideMenu)}
              style={{border:"0",backgroundColor:"#ffffff"}}
            ></Button>
          </div>
          <div className="list-select">
            {hideMenu ? (
              <Menu mode="inline" className="menu">
                <Menu.Item>Đổi mật khẩu</Menu.Item>
                <Menu.Item>Đăng xuất</Menu.Item>
              </Menu>
            ) : null}
          </div>
        </div>
      </div>
      <div className="home-content">
        <Space>
          <Button
            icon={<ShopFilled />}
            type="primary"
            className="btn-select btn-select__sell"
          >
            Bán Hàng
          </Button>
          <Button
            icon={<DatabaseFilled />}
            type="primary"
            className="btn-select btn-select__manage"
          >
            Quản lý
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default Home;
