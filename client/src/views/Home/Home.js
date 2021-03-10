import React, { useState,useEffect } from "react";
import {Link} from 'react-router-dom'
import { Button, Space, Menu } from "antd";
import { ShopFilled, DatabaseFilled, CaretDownFilled } from "@ant-design/icons";
import {checkAuth} from '../../api/login';
import {notifyScreen} from '../../utils/notify'
import "./Home.scss";
import Cookies from "js-cookie";


let token=Cookies.get("__t");

const Home = ({history}) => {
  const [hideMenu, setHideMenu] = useState(false);
  const [name, setName] = useState("");

  const __checkAuth = async ()=>{
    try {
      let res= await checkAuth(token);
      if (res.status === 200) {
        return setName(res.data.name);
      }
      
    } catch (error) {   
      if (error) {
        notifyScreen("error","401","Lỗi xác thực !")
        history.push("/")
      }
    }
  }
  

  useEffect(() => {
    __checkAuth()
  }, [name])
  
  return (
    <div className="home">
      <div className="home-header">
        <h4>Chào {name ? name : ""}</h4>
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
                <Menu.Item key="2"><Link to="/">Đăng xuất</Link></Menu.Item>
              </Menu>
            ) : null}
          </div>
        </div>
      </div>
      <div className="home-content">
        <Space>
        <Link to="/sale">
          <Button
            icon={<ShopFilled />}
            type="primary"
            className="btn-select btn-select__sell"
          >
           Bán Hàng
          </Button>
          </Link>
          <Link to="/dashboard">
          <Button
            icon={<DatabaseFilled />}
            type="primary"
            className="btn-select btn-select__manage"
          >
            Quản lý
          </Button>
          </Link>
        </Space>
      </div>
    </div>
  );
};

export default Home;
