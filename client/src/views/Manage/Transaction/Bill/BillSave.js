import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Space, Table,Row,Col } from "antd";
import {PlusOutlined } from "@ant-design/icons";
import CurrencyFormat from 'react-currency-format';
import Dashboard from "../../../../components/DashBoard/Dashboard";
import ModalDeleteBill from "../../../../components/Modals/ModalConfirmDelete/ModalDeleteBill";
import SectionBill from "../../../../components/SectionTab/SectionBill";
import { getBillWithStatus } from "../../../../api/billSell";
import { notifyScreen } from "../../../../utils/notify";
import "./styles/BillSave.scss";

const BillSave = ({ history }) => {
  const [listBill, setListBill] = useState([]);
  const [bill, setBill] = useState({});
  const [hideModalDelete, setHideModalDelete] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);

  const __getListBill = async () => {
    try {
      let res = await getBillWithStatus({ status: false });
      if (res.status === 200) {
        let listBill = [...res.data];
        let newListBill = listBill.map((bill, i) => {
          bill.key = i + 1;
          return bill;
        });
        return setListBill(newListBill);
      }
    } catch (error) {
      notifyScreen("error", "500", "Lỗi không xác định");
    }
  };

  const handlerHideModalDelete = () => {
    setHideModalDelete(!hideModalDelete);
    return setHideModalDelete(false);
  };

  const handlerShowModalDelete = (id) => {
    let newListBill = listBill.filter((bill) => bill._id === id);
    setBill(newListBill[0]);
    setShowModalDelete(true);
    return setHideModalDelete(!hideModalDelete);
  };

  const columns = [
    {
      title: "Mã HD",
      dataIndex: "code",
      key: "code",
      render: (text,obj) => <Link to={`/dashboard/transaction/bill-save/${obj._id}`}>{"HD0000" + text}</Link>
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (value) => (value ? "Hoàn thành" : "Chưa hoàn thành"),
    },
    {
      title: "Ngày",
      dataIndex: "createdDay",
      key: "createdDay",
    },
    {
      title: "Giờ",
      dataIndex: "createdHour",
      key: "createdHour",
    },
    {
      title: "Khách hàng",
      key: "nameBuyer",
      dataIndex: "nameBuyer",
    },
    {
      title: "Tổng tiền hàng",
      key: "totalMoneySell",
      dataIndex: "totalMoneySell",
      render: (text)=><CurrencyFormat value={text} displayType={'text'} thousandSeparator={true}  renderText={value => <span>{value}</span>} />
    },
    {
      title: "Giảm giá",
      key: "totalSaleOffMoneySell",
      dataIndex: "totalSaleOffMoneySell",
      render: (text)=><CurrencyFormat value={text} displayType={'text'} thousandSeparator={true}  renderText={value => <span>{value}</span>} />
    },
    {
      title: "Khách trả",
      key: "totalBuyerPaid",
      dataIndex: "totalBuyerPaid",
      render: (text)=><CurrencyFormat value={text} displayType={'text'} thousandSeparator={true}  renderText={value => <span>{value}</span>} />
    },
    {
      title: "Cập nhật",
      key: "id",
      dataIndex: "_id",
      render: (id) => (
        <Space>
          <Button
            type="primary"
            onClick={() => handlerShowModalDelete(id)}
            danger
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    __getListBill();
  }, [hideModalDelete]);
  return (
    <Dashboard nameSelect="Hóa đơn bán tạm" defaulCheckKey="3">
      <div className="bill-save__pc">
      <h2>Hóa đơn tạm
      </h2>
        <Row>
          <Col span={5}><SectionBill listBill={listBill.length > 0 ? listBill : [] } status={false}/></Col>
          <Col span={19}>
          <div className="top-table-list-bill">
              <Button type="primary" icon={<PlusOutlined />} onClick={()=>history.push("/sale")}>Thêm mới</Button>
            </div>
           <div className="table-list-bill"> <Table dataSource={listBill} columns={columns} /></div>
          </Col>
        </Row>
        {showModalDelete ? (
          <ModalDeleteBill
            idBill={bill._id ? bill._id : null}
            hideModal={hideModalDelete}
            handleHideModal={handlerHideModalDelete}
          />
        ) : null}
      </div>
      <div className="bill-save__mobile">
        <div className="total-bill">
          <span>
            Tổng số {listBill.length > 0 ? listBill.length : 0} hóa đơn{" "}
          </span>
        </div>
        <div className="list-bill">
          {listBill.length > 0
            ? listBill.map((billSave,i) => (
                <div className="element-bill" key={i}>
                  <Link to={`/dashboard/transaction/bill-save/${billSave._id}`}>
                    <div className="left">
                      <span className="code">HD0000{billSave.code}</span>
                      <span className="name">
                        {billSave.nameBuyer
                          ? billSave.nameBuyer
                          : "Không có khách hàng"}
                      </span>
                      <div className="time">
                        <span>{billSave.createdDay}</span>
                        <span>{billSave.createdHour}</span>
                      </div>
                    </div>
                  </Link>
                  <div className="right">
                    <Link to={`/dashboard/transaction/bill-save/${billSave._id}`}>
                      <div className="math">
                        <span className="money">
                        <CurrencyFormat value={billSave.totalBuyerPaidNeed} displayType={'text'} thousandSeparator={true}  renderText={value => <span>{value}</span>} />
                        </span>
                        <span className="status">
                          {billSave.status ? "Hoàn thành" : "Chưa hoàn thành"}
                        </span>
                      </div>
                    </Link>
                    <div style={{ marginTop: "6px" }}>
                      <Button
                        type="primary"
                        danger
                        style={{
                          width: "35px",
                          height: "35px",
                          textAlign: "center",
                        }}
                        size="small"
                        onClick={()=>handlerShowModalDelete(billSave._id)}
                      >
                        Xóa
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            : null}

          {showModalDelete ? (
            <ModalDeleteBill
              idBill={bill._id ? bill._id : null}
              hideModal={hideModalDelete}
              handleHideModal={handlerHideModalDelete}
            />
          ) : null}
        </div>
      </div>
    </Dashboard>
  );
};

export default BillSave;
