import React, { useState,useEffect } from "react";
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
  GoldOutlined,
} from "@ant-design/icons";
import "./Dashboard.scss";

const Dashboard = ({ children, nameSelect, defaulCheckKey }) => {
  const [hideMenuMobile, setHideMenuMobile] = useState(false);
  const [defaulSelectKey,setDefaultSelectKey]=useState("")

  useEffect(() => {
    setDefaultSelectKey(defaulCheckKey ? defaulCheckKey :"1");
  }, [])
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
      >
        <Menu.Item
          icon={<EyeFilled />}
          key="1"
          style={
            type === "horizontal"
              ? defaulSelectKey != "1"
                ? { color: "white" }
                : {
                  color:"white",
                    backgroundColor: "#0078b6",
                    paddingLeft: "7px",
                    paddingRight: "7px",
                  }
              : { color: "black" }
          }
        >
          <Link to="/dashboard" style={type ==="horizontal" ? {color:"white"} :{color:"black"}}>
            Tổng quan
          </Link>
        </Menu.Item>
        <Menu.SubMenu
          title="Hàng hóa"
          icon={<DropboxOutlined />}
          key="2"
          style={
            type === "horizontal"
              ? defaulSelectKey != "2"
                ? { color: "white" }
                : {
                    color:"white",
                    backgroundColor: "#0078b6",
                    paddingLeft: "7px",
                    paddingRight: "7px",
                  }
              : { color: "black" }
          }
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
          icon={<BuildFilled />}
          key="3"
          style={
            type === "horizontal"
              ? defaulSelectKey != "3"
                ? { color: "white" }
                : {
                  color:"white",
                    backgroundColor: "#0078b6",
                    paddingLeft: "7px",
                    paddingRight: "7px",
                  }
              : { color: "black" }
          }
        >
          <Menu.SubMenu icon={<DollarCircleOutlined />} title="Hóa Đơn">
            <Menu.Item key="bill-save">
              <Link to="/dashboard/transaction/bill-save" key="bill-save-1">
                Hoá đơn tạm
              </Link>
            </Menu.Item>
            <Menu.Item key="bill-success" >
              <Link
                to="/dashboard/transaction/bill-success"
                key="bill-success-1"
              >
                Hoá đơn hoàn thành
              </Link>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu
            icon={<ShopOutlined />}
            key="4"
            title="Nhập hàng"
          >
           <Menu.Item>
             <Link to="/dashboard/transaction/buy" key="buy">
              Nhập Hàng
             </Link>
           </Menu.Item>
           <Menu.SubMenu key="history" title="Lịch sử">
             <Menu.Item key="save">
              <Link to="/dashboard/transaction/buy/history/bill-save" >
                Đơn tạm 
              </Link>
             </Menu.Item>
             <Menu.Item key="success">
              <Link to="/dashboard/transaction/buy/history/bill-success" >
                Đơn hoàn thành
              </Link>
             </Menu.Item>
           </Menu.SubMenu>
          </Menu.SubMenu>
        </Menu.SubMenu>
        <Menu.Item
          icon={<MehFilled />}
          key="5"
          style={
            type === "horizontal"
              ? defaulSelectKey != "5"
                ? { color: "white" }
                : {
                  color:"white",
                    backgroundColor: "#0078b6",
                    paddingLeft: "7px",
                    paddingRight: "7px",
                  }
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
          icon={<SlackOutlined />}
          key="6"
          style={
            type === "horizontal"
              ? defaulSelectKey != "6"
                ? { color: "white" }
                : {
                  color:"white",
                    backgroundColor: "#0078b6",
                    paddingLeft: "7px",
                    paddingRight: "7px",
                  }
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
          key="7"
          style={
            type === "horizontal"
              ? {
                  float: "right",
                  fontSize: "15px",
                  backgroundColor: "#eee",
                  padding: "0 8px 0 8px",
                }
              : { fontSize: "15px", backgroundColor: "#eee" }
          }
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
