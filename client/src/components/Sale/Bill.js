import React, { useState } from "react";
import { Button, Input } from "antd";
import { CloseOutlined, UserOutlined } from "@ant-design/icons";
import DashboardSaleMobile from "../DashBoard/DashboardSaleMobile";
import "./styles/Bill.scss";

const Bill = ({ listSelectProduct, hideBill, infoBuyer }) => {
  return (
    <div className="bill">
      <div className="icon-exit">
        <Button
          onClick={() => hideBill()}
          icon={<CloseOutlined style={{ color: "white", fontSize: "20px" }} />}
          type="link"
        ></Button>
      </div>
      <DashboardSaleMobile nameSelect="Hóa đơn">
        <div className="info-buyer">
          <div className="left-name">
            <UserOutlined />
            <span style={{marginLeft:"10px"}}>Khách hàng</span>
          </div>
          <div className="name">
            <span>{infoBuyer.name ? infoBuyer.name : "Không có"}</span>
          </div>
        </div>
        <div className="list-product">
          {listSelectProduct.length > 0
            ? listSelectProduct.map((product, i) => (
                <div className="product-item" key={i}>
                  <div className="wrapper">
                  <div className="left">
                      <span className="name" style={{fontSize:"15px",fontWeight:"600"}}>{product.name}</span>
                      <div>
                        <span>{product.moneyOut}</span>
                        <span style={{color:"rgba(145, 128, 128, 0.85)"}}> x {product.countNum}</span>
                      </div>
                  </div>
                  <div className="right">
                    <div className="input-saleoff">
                    <span>Giảm giá</span>
                    <Input style={{width:"55%",border:"none",borderBottom:"1px solid #eee",boxShadow:"none",marginTop:"-5px"}} placeholder="VND"/>
                    </div>
                    <span style={{color:"#77d672",fontWeight:"600"}}>{product.totalMoney}</span>
                  </div>
                  </div>
                </div>
              ))
            : null}
        </div>
        <div className="footer-fixed">
          <div className="math">
             <div className="sale-off">
             <span>Giảm giá</span>
             <Input style={{width:"55%",border:"none",borderBottom:"1px solid #eee",boxShadow:"none"}} placeholder="VND"/>
             </div>
             <div>
             <span className="total-money">Tổng tiền : </span>
             </div>
          </div>
          <div className="action-btn">
            <Button type="primary" className="btn btn-save">Lưu</Button>
            <Button type="primary" className="btn btn-success">Hoàn thành</Button>
          </div>
        </div>
      </DashboardSaleMobile>
    </div>
  );
};

export default Bill;
