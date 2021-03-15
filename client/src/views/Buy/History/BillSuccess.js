import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom'
import { Button, Space, Table } from "antd";
import Dashboard from "../../../components/DashBoard/Dashboard";
import ModalDeleteBillBuy from "../../../components/Modals/ModalConfirmDelete/ModalDeleteBillBuy";
import { getBillWithStatus } from "../../../api/billBuy";
import { notifyScreen } from "../../../utils/notify";
import "./styles/BillSuccess.scss"

const BillSuccess = ({ history }) => {
  const [listBill, setListBill] = useState([]);
  const [bill, setBill] = useState({});
  const [hideModalDelete, setHideModalDelete] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);

  const __getListBill = async () => {
    try {
      let res = await getBillWithStatus({ status: true });
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
      title: "Mã PN",
      dataIndex: "code",
      key: "code",
      render: (text) => "PN0000" + text,
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
      title: "Nhà cung cấp",
      key: "namePartner",
      dataIndex: "namePartner",
    },
    {
      title: "Tổng tiền nhập hàng",
      key: "totalMoneyBuy",
      dataIndex: "totalMoneyBuy",
    },
    {
      title: "Giảm giá",
      key: "totalSaleOffMoneyBuy",
      dataIndex: "totalSaleOffMoneyBuy",
    },
    {
      title: "Tổng tiền cần trả",
      key: "totalPaidNeedPartner",
      dataIndex: "totalPaidNeedPartner",
    },
    {
      title: "Đã trả",
      key: "totalMoneyPaid",
      dataIndex: "totalMoneyPaid",
    },
    {
      title: "Công nợ",
      key: "totalDebtMath",
      dataIndex: "totalDebtMath",
    },
    {
      title: "Cập nhật",
      key: "id",
      dataIndex: "_id",
      render: (id) => (
        <Space>
          <Button
            type="primary"
            onClick={() => {
              let bill = listBill.filter((bill) => bill._id === id);
              return history.push({
                pathname: `/dashboard/transaction/buy/bill-success/${id}`,
                state: {
                  codeBill: bill[0].code,
                },
              });
            }}
          >
            Thông tin/Điều chỉnh
          </Button>
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
    <Dashboard nameSelect="Đơn hàng nhập hoàn thành" defaulCheckKey="3">
      <div className="bill-success__pc">
        <div>
          <h1>Đơn hàng hoàn thành</h1>
        </div>
        <Table dataSource={listBill} columns={columns} />
        {showModalDelete ? (
          <ModalDeleteBillBuy
            idBill={bill._id ? bill._id : null}
            hideModal={hideModalDelete}
            handleHideModal={handlerHideModalDelete}
          />
        ) : null}
      </div>
      <div className="bill-success__mobile">
        <div className="total-bill">
          <span>
            Tổng số {listBill.length > 0 ? listBill.length : 0} hóa đơn{" "}
          </span>
        </div>
        <div className="list-bill">
          {listBill.length > 0
            ? listBill.map((billSuccess, i) => (
                <div className="element-bill" key={i}>
                  <Link
                    to={`/dashboard/transaction/buy/bill-success/${billSuccess._id}`}
                  >
                    <div className="left">
                      <span className="code">HD0000{billSuccess.code}</span>
                      <span className="name">
                        {billSuccess.namePartner
                          ? billSuccess.namePartner
                          : "Không có khách hàng"}
                      </span>
                      <div className="time">
                        <span>{billSuccess.createdDay}</span>
                        <span>{billSuccess.createdHour}</span>
                      </div>
                    </div>
                  </Link>
                  <div className="right">
                    <Link
                      to={`/dashboard/transaction/buy/bill-success/${billSuccess._id}`}
                    >
                      <div className="math">
                        <span className="money">
                          {billSuccess.totalBuyerPaidNeed}
                        </span>
                        <span className="status">
                          {billSuccess.status
                            ? "Hoàn thành"
                            : "Chưa hoàn thành"}
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
                        onClick={() => handlerShowModalDelete(billSuccess._id)}
                      >
                        Xóa
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            : null}

          {showModalDelete ? (
            <ModalDeleteBillBuy
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

export default BillSuccess;
