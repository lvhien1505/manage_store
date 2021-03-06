import React, { useState } from "react";
import { Menu, Button } from "antd";
import { Link } from "react-router-dom";
import {
  EyeFilled,
  DropboxOutlined,
  MehFilled,
  SlackOutlined,
  BuildFilled,
  MenuOutlined,
  ShopOutlined,
  DollarCircleOutlined,
  TableOutlined,
  StockOutlined,
  InsertRowAboveOutlined,
  GoldOutlined
} from "@ant-design/icons";
import "./DashboardSaleMobile.scss";

const DashboardSaleMobile = ({ children, nameSelect }) => {
  const [hideMenuMobile, setHideMenuMobile] = useState(false);

  const MenuRes = (type) => {
    return (
      <Menu mode={type} className="menu-item"defaultSelectedKeys="1" >
        <Menu.Item icon={<EyeFilled />} key="1">
          <Link to="/sale">Bán hàng</Link>
        </Menu.Item>
          <Menu.Item icon={<TableOutlined />} key="category">
            <Link to="/dashboard/merchandise/category">Hóa đơn tạm</Link>
          </Menu.Item>
          <Menu.Item icon={<StockOutlined />} key="inventory">
            <Link to="/dashboard/merchandise/inventory">Lịch sử đơn hàng</Link>
          </Menu.Item>
          <Menu.Item icon={<InsertRowAboveOutlined />} key="categoryProduct">
            <Link to="/dashboard/merchandise/category-product">Lập phiếu thu</Link>
          </Menu.Item>
          <Menu.Item icon={<GoldOutlined />} key="unit">
            <Link to="/dashboard/merchandise/unit">Xem báo cáo ngày</Link>
          </Menu.Item>
          <Menu.Item icon={<GoldOutlined />} key="unit">
            <Link to="/dashboard/merchandise/unit">Quản lý</Link>
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
