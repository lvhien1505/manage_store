import React, { useState, useEffect } from "react";
import { Button, Space, Table } from "antd";
import Dashboard from "../../../../components/DashBoard/Dashboard";
import ModalDeleteBill from "../../../../components/Modals/ModalConfirmDelete/ModalDeleteBill";
import { getBillWithStatus } from "../../../../api/billSell";
import { notifyScreen } from "../../../../utils/notify";

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
      render: (text) => "HD0000" + text,
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
    },
    {
      title: "Giảm giá",
      key: "totalSaleOffMoneySell",
      dataIndex: "totalSaleOffMoneySell",
    },
    {
      title: "Khách trả",
      key: "totalBuyerPaid",
      dataIndex: "totalBuyerPaid",
    },
    {
      title: "Tiền thừa trả khách",
      key: "totalExcessPaid",
      dataIndex: "totalExcessPaid",
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
              return history.push(`/dashboard/transaction/bill-save/${id}`);
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
    <Dashboard nameSelect="Hóa đơn tạm" defaulCheckKey="3">
      <div>
        <h1>Hóa đơn tạm</h1>
      </div>
      <Table dataSource={listBill} columns={columns} />
      {showModalDelete ? (
        <ModalDeleteBill
          idBill={bill._id ? bill._id : null}
          hideModal={hideModalDelete}
          handleHideModal={handlerHideModalDelete}
        />
      ) : null}
    </Dashboard>
  );
};

export default BillSave;
