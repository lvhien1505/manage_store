import React, { useState } from "react";
import { Menu, Button } from "antd";
import { Link } from "react-router-dom";
import {
  EyeOutlined,
  BuildFilled,
  MenuOutlined,
  ShopOutlined,
  StockOutlined,
  InsertRowAboveOutlined,
} from "@ant-design/icons";
import "./DashboardSaleMobile.scss";

const DashboardSaleMobile = ({ children, nameSelect }) => {
  const [hideMenuMobile, setHideMenuMobile] = useState(false);

  const MenuRes = (type) => {
    return (
      <Menu mode={type} className="menu-item"defaultSelectedKeys="1" >
        <Menu.Item icon={<ShopOutlined/>} key="1">
          <Link to="/sale">Bán hàng</Link>
        </Menu.Item>
          <Menu.Item icon={<EyeOutlined />} key="2">
            <Link to="/dashboard/transaction/bill-success">Lịch sử đơn hàng</Link>
          </Menu.Item>
          <Menu.Item icon={<InsertRowAboveOutlined />} key="3">
            <Link to="/dashboard">Lập phiếu thu</Link>
          </Menu.Item>
          <Menu.Item icon={<StockOutlined />} key="4">
            <Link to="/dashboard">Xem báo cáo ngày</Link>
          </Menu.Item>
          <Menu.Item icon={<BuildFilled />} key="5">
            <Link to="/dashboard">Quản lý</Link>
          </Menu.Item>
      </Menu>
    );
  };
  return (
    <div className="sale">
      <div className="sale-header">
        <div className="sale-header__menu">
            <Button
              icon={
                <MenuOutlined style={{ color: "white", fontSize: "18px" }} />
              }
              className="btn-category"
              onClick={() => setHideMenuMobile(!hideMenuMobile)}
            ></Button>
            {hideMenuMobile ? MenuRes("inline") : null}
            <span className="name-select">{nameSelect}</span>
        </div>
      </div>
      <div className="sale-content">{children}</div>
    </div>
  );
};

export default DashboardSaleMobile;
