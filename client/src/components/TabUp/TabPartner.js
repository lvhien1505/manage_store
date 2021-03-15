import React, { useState, useEffect } from "react";
import { Tabs, Button, Avatar,Image } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Dashboard from "../DashBoard/Dashboard";
import { getPartnerWithId } from "../../api/partner";
import { notifyScreen } from "../../utils/notify";
import NotifyScaleUp from "../../views/Notify/NotifyScaleUp";
import avatar from "../../logo/avatar/default.jpg";
import { convertDay } from "../../utils/convert";
import "./styles/TabPartner.scss";
import ModalUpdatePartner from "../Modals/ModalUpdate/ModalUpdatePartner";
import ModalDeletePartner from "../Modals/ModalConfirmDelete/ModalDeletePartner";

const TabBuyer = ({ match, history }) => {
  const [hideModalUpdate, setHideModalUpdate] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [hideModalDelete, setHideModalDelete] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [partner, setPartner] = useState({});

  const __getPartnerWithId = async (id) => {
    try {
      let res = await getPartnerWithId(id);
      if (res.status === 200) {
        return setPartner(res.data);
      }
    } catch (error) {
      notifyScreen("error", "500", "Lỗi không xác định");
    }
  };

  const handlerHideModalUpdate = () => {
    setHideModalUpdate(!hideModalUpdate);
    return setShowModalUpdate(false);
  };

  const handlerShowModalUpdate = () => {
    setShowModalUpdate(true);
    return setHideModalUpdate(!hideModalUpdate);
  };

  const handlerHideModalDelete = () => {
    setHideModalDelete(!hideModalDelete);
    return setHideModalDelete(false);
  };

  const handlerShowModalDelete = () => {
    setShowModalDelete(true);
    return setHideModalDelete(!hideModalDelete);
  };

  useEffect(() => {
    __getPartnerWithId(match.params.id);
  }, [hideModalUpdate, hideModalDelete]);

  return (
    <Dashboard nameSelect={partner.name ? partner.name : ""} defaulCheckKey="6">
      <div className="partner-tabup">
        <div className="partner-tabup__pc">
          <Tabs defaultActiveKey="thongtin" type="card" centered>
            <Tabs.TabPane tab="Thông tin" key="thongtin">
              <div className="info-wrapper">
                <div className="info-image">
                  <Avatar
                    src={avatar}
                    size="large"
                    shape="square"
                    style={{
                      width: "200px",
                      height: "250px",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="info-detail">
                  <div className="info-detail-info">
                    Mã NCC : {"NCC" + partner.code}
                  </div>
                  <div className="info-detail-info">Tên : {partner.name}</div>
                  <div className="info-detail-info">
                    Công ty: {partner.nameCompany}
                  </div>
                  <div className="info-detail-info">
                    Điện thoại : {partner.phone}
                  </div>
                  <div className="info-detail-info">
                    Tổng mua : {partner.totalBuy}
                  </div>
                  <div className="info-detail-info">
                    Công nợ : {partner.debt}
                  </div>
                  <div className="info-detail-info">
                    Ngày tạo: {convertDay(partner.createdAt)}
                  </div>
                </div>
                <div className="note">
                  {partner.note ? partner.note : "..Ghi chú"}
                </div>
                <div className="info-action">
                  <Button
                    className="info-action__btn"
                    type="primary"
                    size="large"
                    onClick={handlerShowModalUpdate}
                  >
                    Cập nhật
                  </Button>
                  <Button
                    className="info-action__btn"
                    type="primary"
                    size="large"
                    danger
                    onClick={() => history.push("/notify")}
                  >
                    Ngừng hoạt động
                  </Button>
                  <Button
                    className="info-action__btn"
                    type="primary"
                    size="large"
                    danger
                    onClick={handlerShowModalDelete}
                  >
                    Xóa
                  </Button>
                </div>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Nợ cần trả" key="nocantra">
              <NotifyScaleUp />
            </Tabs.TabPane>
          </Tabs>
          <div className="icon-goback" onClick={() => history.goBack()}>
            <ArrowLeftOutlined />
            <span style={{ marginLeft: "5px" }}>Quay lại</span>
          </div>
        </div>
        <div className="partner-tabup__mobile">
          <div className="icon-goback" onClick={() => history.goBack()}>
            <ArrowLeftOutlined style={{ color: "white" }} />
          </div>
          <Tabs defaultActiveKey="thongtin" type="card">
            <Tabs.TabPane tab="Thông tin" key="thongtin">
              <div className="buyer-header">
                <div className="buyer-image">
                  <Image
                    src={avatar}
                    alt={partner.name}
                    style={{ objectFit: "cover" }}
                    width="80px"
                    height="80px"
                  />
                </div>
              </div>
              <div className="info-detail">
                <div className="info-detail-info partner-name">{partner.name}</div>
                <div className="info-detail-info">
                  <span> Mã NCC</span>
                  <span className="partner-value">{"NCC" + partner.code}</span>
                </div>
                <div className="info-detail-info">
                  <span>Công ty</span>
                  <span className="partner-value">
                    {partner.nameCompany}
                  </span>
                </div>
                <div className="info-detail-info">
                  <span>Điện thoại</span>
                  <span className="partner-value">{partner.phone}</span>
                </div>
                <div className="info-detail-info">
                  <span>Địa chỉ</span>
                  <span className="partner-value">{partner.address}</span>
                </div>
                <div className="info-detail-info">
                  <span>Email</span>
                  <span className="partner-value">{partner.email}</span>
                </div>
                <div className="info-detail-info">
                  <span>Tổng nhập</span>
                  <span className="partner-value">{partner.totalBuy}</span>
                </div>
                <div className="info-detail-info">
                  <span>Công nợ</span>
                  <span className="partner-value">{partner.debt}</span>
                </div>
                <div className="info-detail-info">
                  <span>Ngày tạo</span>
                  <span className="partner-value">
                    {convertDay(partner.createdAt)}
                  </span>
                </div>
              </div>
              <div className="note">
                {partner.note ? partner.note : "..Ghi chú"}
              </div>

              <div className="partner-action">
                <Button
                  className="partner-action__btn"
                  type="primary"
                  size="small"
                  onClick={handlerShowModalUpdate}
                >
                  Cập nhật
                </Button>
                <Button
                  className="partner-action__btn"
                  type="primary"
                  size="small"
                  danger
                  onClick={handlerShowModalDelete}
                >
                  Xóa
                </Button>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Công nợ" key="nocanthu">
              <NotifyScaleUp />
            </Tabs.TabPane>
          </Tabs>
        </div>
        {showModalUpdate ? (
          <ModalUpdatePartner
            partnerEdit={partner}
            hideModal={hideModalUpdate}
            handleHideModal={handlerHideModalUpdate}
          />
        ) : null}
        {showModalDelete ? (
          <ModalDeletePartner
            idPartner={partner._id ? partner._id : null}
            hideModal={hideModalDelete}
            handleHideModal={handlerHideModalDelete}
          />
        ) : null}
      </div>
    </Dashboard>
  );
};

export default TabBuyer;
