import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Tabs, Button, Avatar, Image, Row, Col, Table, Select } from "antd";
import {
  ArrowLeftOutlined,
  DeliveredProcedureOutlined,
  CreditCardOutlined,
  TransactionOutlined,
  CopyOutlined,
  StopOutlined,
  ToolOutlined
} from "@ant-design/icons";
import Dashboard from "../DashBoard/Dashboard";
import { getBuyerWithId } from "../../api/buyer";
import { getBillWithIdBuyerAndType } from "../../api/billSell";
import CurrencyFormat from "react-currency-format";
import { notifyScreen } from "../../utils/notify";
import { convertDay } from "../../utils/convert";
import avatar from "../../logo/avatar/default.jpg";
import ModalUpdateBuyer from "../Modals/ModalUpdate/ModalUpdateBuyer";
import ModalPaidDebt from "../Modals/ModalAdjust/ModalPaidDebt";
import ModalAdjustDebt from "../Modals/ModalAdjust/ModalAdjustDebt";
import SectionTabBuyer from "../SectionTab/SectionTabPartner";
import "./styles/TabBuyer.scss";
import ModalDeleteBuyer from "../Modals/ModalConfirmDelete/ModalDeleteBuyer";

const TabBuyer = ({ match, history }) => {
  const [hideModalUpdate, setHideModalUpdate] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [hideModalDelete, setHideModalDelete] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [hideModalPaidDebt, setHideModalPaidDebt] = useState(false);
  const [showModalPaidDebt, setShowModalPaidDebt] = useState(false);
  const [hideModalAdjustDebt, setHideModalAdjustDebt] = useState(false);
  const [showModalAdjustDebt, setShowModalAdjustDebt] = useState(false);
  const [buyer, setBuyer] = useState({});
  const [listBillDebt, setListBillDebt] = useState([]);

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

  const __getListBillWithBuyerIdAndType = async (id) => {
    try {
      let res = await getBillWithIdBuyerAndType(id);
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
    return setShowModalDelete(false);
  };

  const handlerShowModalDelete = () => {
    setShowModalDelete(true);
    return setHideModalDelete(!hideModalDelete);
  };

  const handlerHideModalPaidDebt = () => {
    setHideModalPaidDebt(!hideModalPaidDebt);
    return setShowModalPaidDebt(false);
  };

  const handlerShowModalPaidDebt = () => {
    setShowModalPaidDebt(true);
    return setHideModalPaidDebt(!hideModalPaidDebt);
  };

  const handlerHideModalAdjustDebt = () => {
    setHideModalAdjustDebt(!hideModalAdjustDebt);
    return setShowModalAdjustDebt(false);
  };

  const handlerShowModalAdjustDebt = () => {
    setShowModalAdjustDebt(true);
    return setHideModalAdjustDebt(!hideModalAdjustDebt);
  };

  const onChangeTab = (key) => {
    if (key == "nocanthu") {
      __getListBillWithBuyerIdAndType(match.params.id);
    }
  };

  const columns = [
    {
      title: "Mã phiếu",
      dataIndex: "code",
      key: "code",
      render: (text, obj) => {
        if (obj.typeBill == "debt") {
          return (
            <Link to={`/dashboard/transaction/bill-success/${obj._id}`}>
              {"HD0000" + text}
            </Link>
          );
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
          return "Bán hàng";
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
      render: (text) => (
        <CurrencyFormat
          value={text}
          displayType={"text"}
          thousandSeparator={true}
          renderText={(value) => <span>{value}</span>}
        />
      ),
    },
    {
      title: "Dư nợ khách hàng",
      key: "debtRedundancy",
      dataIndex: "debtRedundancy",
      render: (text) => (
        <CurrencyFormat
          value={text}
          displayType={"text"}
          thousandSeparator={true}
          renderText={(value) => <span>{value}</span>}
        />
      ),
    },
  ];

  useEffect(() => {
    __getBuyerWithId(match.params.id);
  }, [hideModalUpdate]);

  return (
    <Dashboard nameSelect={buyer.name ? buyer.name : ""} defaulCheckKey="5">
      <div className="buyer-tabup">
        <div className="buyer-tabup__pc">
          <Tabs
            defaultActiveKey="thongtin"
            type="card"
            centered
            onChange={(key) => onChangeTab(key)}
            className="tabup-full"
          >
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
                  <div className="info-detail-info">Ngày sinh: {buyer.age}</div>
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
                    Tổng bán :{" "}
                    <CurrencyFormat
                      value={buyer.totalSell}
                      displayType={"text"}
                      thousandSeparator={true}
                      renderText={(value) => <span>{value}</span>}
                    />
                  </div>
                  <div className="info-detail-info">
                    Công nợ :{" "}
                    <CurrencyFormat
                      value={buyer.debt}
                      displayType={"text"}
                      thousandSeparator={true}
                      renderText={(value) => <span>{value}</span>}
                    />
                  </div>
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
                    icon={<CopyOutlined/>}
                  >
                    Danh sách hóa đơn
                  </Button>
                  <Button
                    className="info-action__btn"
                    type="primary"
                    size="large"
                    onClick={handlerShowModalUpdate}
                    icon={<ToolOutlined/>}
                  >
                    Cập nhật
                  </Button>
                  <Button
                    className="info-action__btn"
                    type="primary"
                    size="large"
                    icon={<StopOutlined/>}
                    onClick={() => history.push("/notify")}
                  >
                    Ngừng hoạt động
                  </Button>
                  <Button
                    className="info-action__btn"
                    type="primary"
                    size="large"
                    icon={<StopOutlined/>}
                    onClick={handlerShowModalDelete}
                  >
                    Xóa
                  </Button>
                </div>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Nợ cần thu từ khách" key="nocanthu">
              <Row className="row-tab-paid-debt">
                <Col span={5} className="wrapperleft-table">
                  <h2>Thanh toán</h2>
                  <SectionTabBuyer buyer={buyer} typeSection="buyer" />
                </Col>
                <Col span={19}>
                  <div className="top-table-list-bill">
                    <Button
                      type="primary"
                      icon={<TransactionOutlined />}
                      onClick={handlerShowModalAdjustDebt}
                    >
                      Điều chỉnh
                    </Button>
                    <Button
                      type="primary"
                      icon={<CreditCardOutlined />}
                      onClick={handlerShowModalPaidDebt}
                    >
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
            <span style={{ marginLeft: "5px" }}>Quay lại</span>
          </div>
        </div>
        <div className="buyer-tabup__mobile">
          <div className="icon-goback" onClick={() => history.goBack()}>
            <ArrowLeftOutlined style={{ color: "white" }} />
          </div>
          <Tabs defaultActiveKey="thongtin" type="card" onChange={(key) => {}}>
            <Tabs.TabPane tab="Thông tin" key="thongtin">
              <div className="buyer-header">
                <div className="buyer-image">
                  <Image
                    src={avatar}
                    alt={buyer.name}
                    style={{ objectFit: "cover" }}
                    width="80px"
                    height="80px"
                  />
                </div>
              </div>
              <div className="info-detail">
                <div className="info-detail-info buyer-name">{buyer.name}</div>
                <div className="info-detail-info">
                  <span> Mã KH</span>
                  <span className="buyer-value">{"KH" + buyer.code}</span>
                </div>
                <div className="info-detail-info">
                  <span>Ngày sinh</span>
                  <span className="buyer-value">{buyer.age}</span>
                  </div>
                <div className="info-detail-info">
                  <span>Giới tính</span>
                  <span className="buyer-value">
                    {buyer.sex === "male" ? "Nam" : "Nữ"}
                  </span>
                </div>
                <div className="info-detail-info">
                  <span>Điện thoại</span>
                  <span className="buyer-value">{buyer.phone}</span>
                </div>
                <div className="info-detail-info">
                  <span>Địa chỉ</span>
                  <span className="buyer-value">{buyer.address}</span>
                </div>
                <div className="info-detail-info">
                  <span>Tổng bán</span>
                  <span className="buyer-value">{buyer.totalSell}</span>
                </div>
                <div className="info-detail-info">
                  <span>Công nợ</span>
                  <span className="buyer-value">{buyer.debt}</span>
                </div>
                <div className="info-detail-info">
                  <span>Ngày tạo</span>
                  <span className="buyer-value">
                    {convertDay(buyer.createdAt)}
                  </span>
                </div>
              </div>
              <div className="note">
                {buyer.note ? buyer.note : "..Ghi chú"}
              </div>

              <div className="buyer-action">
                <Button
                  className="buyer-action__btn"
                  type="primary"
                  size="small"
                  onClick={handlerShowModalUpdate}
                >
                  Cập nhật
                </Button>
                <Button
                  className="buyer-action__btn"
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
              aaa
            </Tabs.TabPane>
          </Tabs>
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
        {showModalPaidDebt ? (
          <ModalPaidDebt
            hideModal={hideModalPaidDebt}
            handleHideModal={handlerHideModalPaidDebt}
          />
        ) : null}
        {showModalAdjustDebt ? (
          <ModalAdjustDebt
            hideModal={hideModalAdjustDebt}
            handleHideModal={handlerHideModalAdjustDebt}
          />
        ) : null}
      </div>
    </Dashboard>
  );
};

export default TabBuyer;
