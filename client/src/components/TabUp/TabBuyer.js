import React, { useState, useEffect } from "react";
import { Tabs, Button, Avatar } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Dashboard from "../DashBoard/Dashboard";
import { getBuyerWithId } from "../../api/buyer";
import { notifyScreen } from "../../utils/notify";
import { convertDay } from "../../utils/convert";
import avatar from "../../logo/avatar/default.jpg";
import ModalUpdateBuyer from "../Modals/ModalUpdate/ModalUpdateBuyer";
import NotifyScaleUp from '../../views/Notify/NotifyScaleUp'
import "./styles/TabBuyer.scss";
import ModalDeleteBuyer from "../Modals/ModalConfirmDelete/ModalDeleteBuyer";

const TabBuyer = ({ match, history }) => {
  const [hideModalUpdate, setHideModalUpdate] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [hideModalDelete, setHideModalDelete] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
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
    __getBuyerWithId(match.params.id);
  }, [hideModalUpdate]);

  return (
    <Dashboard nameSelect={buyer.name ? buyer.name : ""} defaulCheckKey="5">
      <div className="buyer-tabup">
        <div className="buyer-tabup__pc">
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
                    Mã khách hàng : {"KH" + buyer.code}
                  </div>
                  <div className="info-detail-info">
                    Tên khách : {buyer.name}
                  </div>
                  <div className="info-detail-info">Tuổi: {buyer.age}</div>
                  <div className="info-detail-info">
                    Giới tính : {buyer.sex === "male" ? "Nam" : "Nữ"}
                  </div>
                  <div className="info-detail-info">
                    Điện thoại : {buyer.phone}
                  </div>
                  <div className="info-detail-info">
                    Địa chỉ : {buyer.address}
                  </div>
                  <div className="info-detail-info">
                    Tổng bán : {buyer.totalSell}
                  </div>
                  <div className="info-detail-info">Công nợ : {buyer.debt}</div>
                  <div className="info-detail-info">
                    Ngày tạo: {convertDay(buyer.createdAt)}
                  </div>
                </div>
                <div className="note">
                  {buyer.note ? buyer.note : "..Ghi chú"}
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
                    onClick={()=>history.push("/notify")}
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
            <Tabs.TabPane
              tab="Nợ cần thu từ khách"
              key="nocanthu"
            >
             <NotifyScaleUp/>
            </Tabs.TabPane>
          </Tabs>
          <div className="icon-goback" onClick={() => history.goBack()}>
            <ArrowLeftOutlined />
            <span style={{ marginLeft: "5px" }}>Quay lại</span>
          </div>
        </div>
        <div className="buyer-tabup__mobile">
          <Tabs defaultActiveKey="thongtin" type="card">
            <Tabs.TabPane tab="Thông tin" key="thongtin">
              <NotifyScaleUp/>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Công nợ" key="nocanthu">
              <NotifyScaleUp/>
            </Tabs.TabPane>
          </Tabs>
          <div className="icon-goback" onClick={() => history.goBack()}>
            <ArrowLeftOutlined />
          </div>
        </div>
        {showModalUpdate ? (
          <ModalUpdateBuyer
            buyerEdit={buyer}
            hideModal={hideModalUpdate}
            handleHideModal={handlerHideModalUpdate}
          />
        ) : null}
         {showModalDelete ? (
          <ModalDeleteBuyer
            idBuyer={buyer._id ? buyer._id : null}
            hideModal={hideModalDelete}
            handleHideModal={handlerHideModalDelete}
          />
        ) : null}
      </div>
    </Dashboard>
  );
};

export default TabBuyer;
