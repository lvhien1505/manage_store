import React, { useState, useEffect } from "react";
import { Tabs,Button } from "antd";
import {ArrowLeftOutlined} from '@ant-design/icons'
import Dashboard from "../DashBoard/Dashboard";
import { getBuyerWithId } from "../../api/buyer";
import { notifyScreen } from "../../utils/notify";
import { convertDay } from "../../utils/convert";
import "./styles/TabBuyer.scss";

const TabBuyer = ({ match,history }) => {
  const [buyer, setBuyer] = useState({});

  const __getBuyerWithId = async (id) => {
    try {
      let res = await getBuyerWithId(id);
      if (res.status === 200) {
        return setBuyer(res.data);
      }
    } catch (error) {
      notifyScreen("error", "500", "Lỗi không xác định");
    }
  };

  useEffect(() => {
    __getBuyerWithId(match.params.id);
  }, []);

  return (
    <Dashboard nameSelect={buyer.name ? buyer.name : ""}>
      <div className="buyer-tabup">
        <div className="buyer-tabup__pc">
          <Tabs defaultActiveKey="thongtin" type="card" centered>
            <Tabs.TabPane tab="Thông tin" key="thongtin">
              <div className="info-wrapper">
                <div className="info-image"></div>
                <div className="info-detail">
                  <div className="info-detail-info">Mã khách hàng : {"KH" + buyer.code}</div>
                  <div className="info-detail-info">Tên khách : {buyer.name}</div>
                  <div className="info-detail-info">Tuổi: {buyer.age}</div>
                  <div className="info-detail-info">Giới tính : {buyer.sex === "male" ? "Nam" : "Nữ"}</div>
                  <div className="info-detail-info">Điện thoại : {buyer.phone}</div>
                  <div className="info-detail-info">Địa chỉ : {buyer.address}</div>
                  <div className="info-detail-info">Ngày tạo: {convertDay(buyer.createdAt)}</div>
                </div>
                <div className="note">{buyer.note ? buyer.note : "..Ghi chú"}</div>
                <div className="info-action">
                  <Button className="info-action__btn" type="primary" size="large">Cập nhật</Button>
                  <Button className="info-action__btn" type="primary" size="large" danger>Ngừng hoạt động</Button>
                  <Button className="info-action__btn" type="primary" size="large" danger>Xóa</Button>
                </div>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane
              tab="Nợ cần thu từ khách"
              key="nocanthu"
            ></Tabs.TabPane>
          </Tabs>
          <div className="icon-goback" onClick={()=>history.goBack()}> 
             <ArrowLeftOutlined  /> 
             <span style={{marginLeft:"5px"}}>Quay lại</span>
          </div>
        </div>
        <div className="buyer-tabup__mobile">
          <Tabs defaultActiveKey="thongtin" type="card">
            <Tabs.TabPane tab="Thông tin" key="thongtin"></Tabs.TabPane>
            <Tabs.TabPane
              tab="Công nợ"
              key="nocanthu"
            ></Tabs.TabPane>
          </Tabs>
          <div className="icon-goback" onClick={()=>history.goBack()}> 
             <ArrowLeftOutlined/> 
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default TabBuyer;
