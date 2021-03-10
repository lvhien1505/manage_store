import React, { useState, useEffect } from "react";
import { Button, Space, Table } from "antd";
import Dashboard from "../../../components/DashBoard/Dashboard";
import ModalDeleteBillBuy from "../../../components/Modals/ModalConfirmDelete/ModalDeleteBillBuy";
import { getBillWithStatus } from "../../../api/billBuy";
import { notifyScreen } from "../../../utils/notify";

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
          bill.code = `0000${i + 1}`;
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
      render: (text) => "HD" + text,
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
                pathname: `/dashboard/transaction/buy/bill-save/${id}`,
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
    <Dashboard nameSelect="Đơn hàng" defaulCheckKey="3">
      <div>
        <h1>Đơn hàng tạm</h1>
      </div>
      <Table dataSource={listBill} columns={columns} />
      {showModalDelete ? (
        <ModalDeleteBillBuy
          idBill={bill._id ? bill._id : null}
          hideModal={hideModalDelete}
          handleHideModal={handlerHideModalDelete}
        />
      ) : null}
    </Dashboard>
  );
};

export default BillSave;
