import React, { useState, useEffect } from "react";
import { Menu, Button } from "antd";
import { Link,Redirect } from "react-router-dom";
import {
  EyeFilled,
  InboxOutlined,
  UserOutlined,
  TeamOutlined,
  SwapOutlined,
  MenuOutlined,
  DollarCircleOutlined,
  TableOutlined,
  StockOutlined,
  InsertRowAboveOutlined,
  GoldOutlined,
  ShoppingCartOutlined,
  FileDoneOutlined,
  RiseOutlined,
  BarChartOutlined,
  PieChartOutlined,
  ContainerOutlined
} from "@ant-design/icons";
import "./Dashboard.scss";
import { checkAuth } from "../../api/login";
import { notifyScreen } from "../../utils/notify";

import Cookies from "js-cookie";

let token = Cookies.get("__t");

const Dashboard = ({ children, nameSelect, defaulCheckKey}) => {
  const [hideMenuMobile, setHideMenuMobile] = useState(false);
  const [defaulSelectKey, setDefaultSelectKey] = useState("");
  
  const styles = {
    styleNoSelect: {
      color: "white",
      fontSize: "15px",
      paddingLeft: "15px",
      paddingRight: "15px",
      zIndex:10
    },
    styleSelect: {
      color: "white",
      backgroundColor: "#0078b6",
      paddingLeft: "15px",
      paddingRight: "15px",
      fontSize: "15px",
      zIndex:10
    },
  };

  const __checkAuth = async () => {
    try {
      let res = await checkAuth(token);
      if (res.status != 200) {
        window.location.href = "/";
      }
    } catch (error) {
      notifyScreen("error", "401", "Lỗi xác thực !");
      window.location.href = "/";
    }
  };

  useEffect(() => {
    __checkAuth();
    setDefaultSelectKey(defaulCheckKey ? defaulCheckKey : "1");
  }, []);
  const MenuRes = (type) => {
    return (
      <Menu
        mode={type}
        className="menu-item"
        defaultSelectedKeys={defaulSelectKey}
        style={
          type === "horizontal"
            ? {
                backgroundColor: "#0090da",
                borderBottom: "1.5px solid #0090da",
              }
            : { backgroundColor: "#fff" }
        }
        triggerSubMenuAction="click"
      >
        <Menu.Item
          icon={<EyeFilled />}
          key="1"
          style={
            type === "horizontal"
              ? defaulSelectKey != "1"
                ? styles.styleNoSelect
                : styles.styleSelect
              : { color: "black" }
          }
          className="fixed-overview"
        >
          <Link
            to="/dashboard"
            style={
              type === "horizontal" ? { color: "white" } : { color: "black" }
            }
          >
          Tổng quan
          </Link>
        </Menu.Item>
        <Menu.SubMenu
          title="Hàng hóa"
          icon={<InboxOutlined style={{fontSize:"15px"}}/>}
          key="2"
          style={
            type === "horizontal"
              ? defaulSelectKey != "2"
                ? styles.styleNoSelect
                : styles.styleSelect
              : { color: "black" }
          }
          className="menu-merchandise"
        >
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
        <Menu.SubMenu
          title="Giao dịch"
          icon={<SwapOutlined style={{fontSize:"15px"}} />}
          key="3"
          style={
            type === "horizontal"
              ? defaulSelectKey != "3"
                ? styles.styleNoSelect
                : styles.styleSelect
              : { color: "black" }
          }
          className="menu-transaction"
        >
          <Menu.Item icon={<ShoppingCartOutlined />}>
            <Link to="/dashboard/transaction/buy" key="buy">
              Nhập Hàng
            </Link>
          </Menu.Item>
          <Menu.Item key="bill-success" icon={<FileDoneOutlined />}>
            <Link to="/dashboard/transaction/bill-success" key="bill-success-1">
              Hoá đơn
            </Link>
          </Menu.Item>
          <Menu.Item key="success" icon={<ContainerOutlined />}>
            <Link to="/dashboard/transaction/buy/history/bill-success">
              Đơn nhập
            </Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item
          icon={<UserOutlined style={{fontSize:"15px"}}/>}
          key="5"
          style={
            type === "horizontal"
              ? defaulSelectKey != "5"
                ? styles.styleNoSelect
                : styles.styleSelect
              : { color: "black" }
          }
        >
          <Link
            to="/dashboard/buyer"
            key="buyer"
            style={
              type === "horizontal" ? { color: "white" } : { color: "black" }
            }
          >
            Khách hàng
          </Link>
        </Menu.Item>
        <Menu.Item
          icon={<TeamOutlined style={{fontSize:"15px"}}/>}
          key="6"
          style={
            type === "horizontal"
              ? defaulSelectKey != "6"
                ? styles.styleNoSelect
                : styles.styleSelect
              : { color: "black" }
          }
        >
          <Link
            to="/dashboard/partner"
            key="partner"
            style={
              type === "horizontal" ? { color: "white" } : { color: "black" }
            }
          >
            Nhà cung cấp
          </Link>
        </Menu.Item>
        <Menu.Item
          icon={<DollarCircleOutlined style={{fontSize:"15px"}}/>}
          key="7"
          style={
            type === "horizontal"
              ? defaulSelectKey != "7"
                ? styles.styleNoSelect
                : styles.styleSelect
              : { color: "black" }
          }
        >
          <Link
            to="/dashboard/cashflow"
            style={
              type === "horizontal" ? { color: "white" } : { color: "black" }
            }
          >
            Sổ quỹ
          </Link>
        </Menu.Item>
        <Menu.SubMenu
          title="Báo cáo"
          icon={<BarChartOutlined style={{fontSize:"15px"}}/>}
          key="8"
          style={
            type === "horizontal"
              ? defaulSelectKey != "3"
                ? styles.styleNoSelect
                : styles.styleSelect
              : { color: "black" }
          }
          className="menu-transaction"
        >
          <Menu.Item icon={<PieChartOutlined />}>
            <Link to="/dashboard/transaction/buy" key="buy">
              Cuối ngày
            </Link>
          </Menu.Item>
          <Menu.Item key="bill-success" icon={<FileDoneOutlined />}>
            <Link to="/dashboard/transaction/bill-success" key="bill-success-1">
              Bán hàng
            </Link>
          </Menu.Item>
          <Menu.Item key="bill-save" icon={<InboxOutlined />}>
            <Link to="/dashboard/transaction/bill-save" key="bill-save-1">
              Hàng hóa
            </Link>
          </Menu.Item>
          <Menu.Item key="success" icon={<UserOutlined />}>
            <Link to="/dashboard/transaction/buy/history/bill-success">
              Khách hàng
            </Link>
          </Menu.Item>

          <Menu.Item key="save" icon={<TeamOutlined />}>
            <Link to="/dashboard/transaction/buy/history/bill-save">
              Nhà cung cấp
            </Link>
          </Menu.Item>
          <Menu.Item key="save" icon={<RiseOutlined />}>
            <Link to="/dashboard/transaction/buy/history/bill-save">
              Tài chính
            </Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item
          key="9"
          style={
            type === "horizontal"
              ? {
                  float: "right",
                  fontSize: "16px",
                  backgroundColor: "#fff",
                  padding: "0 8px 0px 8px",
                  fontWeight: 600,
                  zIndex:10
                }
              : { fontSize: "16px", backgroundColor: "#fff", fontWeight: 600,zIndex:10 }
          }
          className="redirect-sale"
        >
          <Link to="/sale">Chuyển sang bán hàng</Link>
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
