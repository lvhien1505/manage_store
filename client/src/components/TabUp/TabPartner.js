import React, { useState, useEffect } from "react";
import { Tabs, Button, Avatar, Image, Select, Row, Col, Table } from "antd";
import {
  ArrowLeftOutlined,
  DeliveredProcedureOutlined,
  TransactionOutlined,
  CreditCardOutlined,
  CopyOutlined,
  StopOutlined,
  ToolOutlined,
  EditOutlined,
} from "@ant-design/icons";
import Dashboard from "../DashBoard/Dashboard";
import { getPartnerWithId } from "../../api/partner";
import { getBillWithIdPartnerAndType } from "../../api/billBuy";
import { notifyScreen } from "../../utils/notify";
import NotifyScaleUp from "../../views/Notify/NotifyScaleUp";
import CurrencyFormat from "react-currency-format";
import avatar from "../../logo/avatar/default.jpg";
import { convertDay } from "../../utils/convert";
import "./styles/TabPartner.scss";
import ModalUpdatePartner from "../Modals/ModalUpdate/ModalUpdatePartner";
import ModalDeletePartner from "../Modals/ModalConfirmDelete/ModalDeletePartner";
import SectionTabPartner from "../SectionTab/SectionTabPartner";

const TabBuyer = ({ match, history }) => {
  const [hideModalUpdate, setHideModalUpdate] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [hideModalDelete, setHideModalDelete] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [partner, setPartner] = useState({});
  const [listBillDebt, setListBillDebt] = useState([]);

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

  const __getListBillWithPartnerIdAndType = async (id) => {
    try {
      let res = await getBillWithIdPartnerAndType(id);
      if (res.status === 200) {
        return setListBillDebt(
          res.data.map((bill, key) => {
            bill.key = bill._id;
            return bill;
          })
        );
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

  const onChangeTab = (key) => {
    if (key == "nocantra") {
      __getListBillWithPartnerIdAndType(match.params.id);
    }
  };

  const columns = [
    {
      title: "Mã phiếu nhập",
      dataIndex: "code",
      key: "code",
      render: (text, obj) => {
        if (obj.typeBill == "debt") {
          return "PN0000" + text;
        } else if (obj.typeBill == "paid") {
          return "TT0000" + text;
        } else {
          return "CB0000" + text;
        }
      },
    },
    {
      title: "Thời gian",
      dataIndex: "createdDay",
      key: "createdDay",
    },
    {
      title: "Giờ",
      dataIndex: "createdHour",
      key: "createdHour",
    },
    {
      title: "Loại",
      key: "typeBill",
      render: (obj) => {
        if (obj.typeBill == "debt") {
          return "Nhập hàng";
        } else if (obj.typeBill == "paid") {
          return "Thanh toán";
        } else {
          return "Điều chỉnh";
        }
      },
    },
    {
      title: "Giá trị",
      key: "totalBuyerPaidNeed",
      dataIndex: "totalBuyerPaidNeed",
    },
    {
      title: "Nợ cần trả NCC",
      key: "debtRedundancy",
      dataIndex: "debtRedundancy",
    },
  ];

  useEffect(() => {
    __getPartnerWithId(match.params.id);
  }, [hideModalUpdate, hideModalDelete]);

  return (
    <Dashboard nameSelect={partner.name ? partner.name : ""} defaulCheckKey="6">
      <div className="partner-tabup">
        <div className="partner-tabup__pc">
          <Tabs
            defaultActiveKey="thongtin"
            type="card"
            centered
            onChange={(key) => onChangeTab(key)}
            className="tabup-full"
          >
            <Tabs.TabPane tab="Thông tin" key="thongtin" style={{height:"400px",backgroundColor:"#fff"}}>
              <div className="info-wrapper">
                <div className="info-action">
                  <Button
                    className="info-action__btn"
                    type="primary"
                    size="large"
                    onClick={handlerShowModalUpdate}
                    icon={<CopyOutlined />}
                  >
                    Danh sách hóa đơn
                  </Button>
                  <Button
                    className="info-action__btn"
                    type="primary"
                    size="large"
                    onClick={handlerShowModalUpdate}
                    icon={<ToolOutlined />}
                  >
                    Cập nhật
                  </Button>
                  <Button
                    className="info-action__btn"
                    type="primary"
                    size="large"
                    icon={<StopOutlined />}
                    onClick={() => history.push("/notify")}
                  >
                    Ngừng hoạt động
                  </Button>
                  <Button
                    className="info-action__btn"
                    type="primary"
                    size="large"
                    icon={<StopOutlined />}
                    onClick={handlerShowModalDelete}
                  >
                    Xóa
                  </Button>
                </div>
                <div className="info-partner">
                  <div className="info-image">
                    <Avatar
                      src={avatar}
                      size="large"
                      shape="square"
                      style={{
                        width: "250px",
                        height: "250px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div className="info-detail">
                    <div className="left-info-detail">
                      <div className="info-detail-info">
                        <span> Mã NCC :</span>
                        <span>{"NCC" + partner.code}</span>
                      </div>
                      <div className="info-detail-info">
                        <span> Tên :</span>
                        <span>{partner.name}</span>
                      </div>
                      <div className="info-detail-info">
                        <span>Công ty:</span>
                        <span>{partner.nameCompany}</span>
                      </div>
                      <div className="info-detail-info">
                        <span>Điện thoại : </span>
                        <span>{partner.phone}</span>
                      </div>
                      <div className="info-detail-info info-detail-address">
                        <span> Địa chỉ : </span>
                        <span>{partner.address}</span>
                      </div>
                    </div>
                    <div className="right-info-detail">
                      
                      <div className="info-detail-info">
                        <span>Tổng mua :</span>
                        <CurrencyFormat
                          value={partner.totalBuy}
                          displayType={"text"}
                          thousandSeparator={true}
                          renderText={(value) => <span>{value}</span>}
                        />
                      </div>

                      <div className="info-detail-info">
                        <span>Công nợ :</span>
                        <CurrencyFormat
                          value={partner.debt}
                          displayType={"text"}
                          thousandSeparator={true}
                          renderText={(value) => <span>{value}</span>}
                        />
                      </div>
                      <div className="info-detail-info">
                        <span> Ngày tạo:</span>
                        <span>{convertDay(partner.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="note">
                    <span>
                      <EditOutlined /> {partner.note ? partner.note : "Ghi chú"}
                    </span>
                  </div>
                </div>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Nợ cần trả" key="nocantra">
              <Row className="row-tab-paid-debt">
                <Col span={5} className="wrapperleft-table">
                  <h2>Thanh Toán</h2>
                  <SectionTabPartner typeSection="partner" partner={partner} />
                </Col>
                <Col span={19}>
                  <div className="top-table-list-bill">
                    <Button type="primary" icon={<TransactionOutlined />}>
                      Điều chỉnh
                    </Button>
                    <Button type="primary" icon={<CreditCardOutlined />}>
                      Thanh toán
                    </Button>
                    <Button
                      type="primary"
                      icon={<DeliveredProcedureOutlined />}
                    >
                      Xuất file công nợ
                    </Button>
                    <Button
                      type="primary"
                      icon={<DeliveredProcedureOutlined />}
                    >
                      Xuất file
                    </Button>
                  </div>
                  <div className="table-list-bill">
                    <Table columns={columns} dataSource={listBillDebt} />
                  </div>
                </Col>
              </Row>
            </Tabs.TabPane>
          </Tabs>
          <div className="icon-goback" onClick={() => history.goBack()}>
            <ArrowLeftOutlined />
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
                <div className="info-detail-info partner-name">
                  {partner.name}
                </div>
                <div className="info-detail-info">
                  <span> Mã NCC</span>
                  <span className="partner-value">{"NCC" + partner.code}</span>
                </div>
                <div className="info-detail-info">
                  <span>Công ty</span>
                  <span className="partner-value">{partner.nameCompany}</span>
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
