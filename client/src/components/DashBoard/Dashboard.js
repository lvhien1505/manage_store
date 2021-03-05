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
import "./Dashboard.scss";

const Dashboard = ({ children, nameSelect }) => {
  const [hideMenuMobile, setHideMenuMobile] = useState(false);

  const MenuRes = (type) => {
    return (
      <Menu mode={type} className="menu-item">
        <Menu.Item icon={<EyeFilled />} key="1">
          <Link to="/dashboard">Tổng quan</Link>
        </Menu.Item>
        <Menu.SubMenu title="Hàng hóa" icon={<DropboxOutlined />} key="2">
          <Menu.Item icon={<TableOutlined />} key="category">
            <Link to="/dashboard/merchandise/category">Danh mục</Link>
          </Menu.Item>
          <Menu.Item icon={<StockOutlined />} key="inventory">
            <Link to="/dashboard/merchandise/inventory">Kiểm kho</Link>
          </Menu.Item>
          <Menu.Item icon={<InsertRowAboveOutlined />} key="categoryProduct">
            <Link to="/dashboard/merchandise/category-product">Nhóm hàng</Link>
          </Menu.Item>
          <Menu.Item icon={<GoldOutlined />} key="unit">
            <Link to="/dashboard/merchandise/unit">Đơn vị</Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu title="Giao dịch" icon={<BuildFilled />} key="3">
          <Menu.Item icon={<DollarCircleOutlined />}>
            <Link to="/dashboard/transaction/sell" key="sell">
              Hóa Đơn
            </Link>
          </Menu.Item>
          <Menu.Item icon={<ShopOutlined />}>
            <Link to="/dashboard/transaction/buy" key="buy">
              Nhập Hàng
            </Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item icon={<MehFilled />} key="4">
          <Link to="/dashboard/buyer">Khách hàng</Link>
        </Menu.Item>
        <Menu.Item icon={<SlackOutlined />} key="5">
          <Link to="/dashboard/partner">Nhà cung cấp</Link>
        </Menu.Item>
      </Menu>
    );
  };
  return (
    <div className="manage">
      <div className="manage-header">
        <div className="manage-header__menu">
          <div className="manage-header__menu-pc">{MenuRes("horizontal")}</div>
          <div className="manage-header__menu-mobile">
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
      </div>
      <div className="manage-content">{children}</div>
    </div>
  );
};

export default Dashboard;
