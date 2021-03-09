import React, { useState, useEffect } from "react";
import { Button, Table, Space } from "antd";
import { Link } from "react-router-dom";
import Dashboard from "../../components/DashBoard/Dashboard";
import { getBillWithId } from "../../api/billSell";
import { notifyScreen } from "../../utils/notify";
import "./styles/TabBillSell.scss";

const TabBillSell = ({ match }) => {
  const [bill, setBill] = useState({});
  const __getBillWithId = async () => {
    try {
      let res = await getBillWithId(match.params.id);
      if (res.status === 200) {
        return setBill(res.data);
      }
    } catch (error) {
      notifyScreen("error", "500", "Lỗi không xác định");
    }
  };
  const columns = [
    {
      title: "Mã hàng",
      dataIndex: "code",
      key: "code",
      render: (text) => "SP" + text,
    },
    {
      title: "Tên hàng",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số lượng",
      dataIndex: "countNum",
      key: "countNum",
    },
    {
      title: "Giá bán",
      dataIndex: "moneyOut",
      key: "moneyOut",
    },
    {
      title: "Giảm giá",
      dataIndex: "saleOff",
      key: "saleOff",
    },
    {
      title: "Thành tiền",
      dataIndex: "totalMoney",
      key: "totalMoney",
    },
  ];
  useEffect(() => {
    __getBillWithId();
  }, []);
  return (
    <Dashboard nameSelect={"HD" + bill.code} defaulCheckKey="3">
      <div className="content-wrapper">
        <div className="content-wrapper__top">
          <div className="info-bill">
            <div>
              <span>Mã hóa đơn : {"HD" + bill.code}</span>
            </div>
            <div>
              <span>
                Trạng thái : {bill.status ? "Hoàn thành" : "Chưa hoàn thành"}
              </span>
            </div>
            <div>
              <span>
                Thời gian : {bill.createdDay + " " + bill.createdHour}
              </span>
            </div>
            <div>
              <span>
                Khách hàng :{" "}
                <Link to={`/dashboard/buyer/${bill.buyerId}`}>
                  {"KH" + bill.buyerCode + "-" + bill.nameBuyer}
                </Link>
              </span>
            </div>
            <div>
              <span>
                Thời gian : {bill.createdDay + " " + bill.createdHour}
              </span>
            </div>
            <div>
              <span>Người bán : {bill.userSell}</span>
            </div>
            <div>
              <span>Người tạo : {bill.userCreate}</span>
            </div>
          </div>
          <div className="note-bill">
            {bill.noteSell ? bill.noteSell : "...Ghi chú"}
          </div>
          <div className="btn-action">
            <Space direction="vertical">
              <Button type="primary" size="large" style={{ width: "150px" }}>
                Điều chỉnh
              </Button>
              {bill.status ? (
                <Space  direction="vertical">
                  <Button
                    type="primary"
                    size="large"
                    style={{
                      width: "150px",
                      backgroundColor: "rgba(149, 129, 129, 0.85)",
                    }}
                  >
                    In
                  </Button>
                  <Button
                    type="primary"
                    size="large"
                    style={{ width: "150px", backgroundColor: "#4bac4d" }}
                  >
                    Xuất File
                  </Button>
                </Space>
              ) : (
                <Button
                  type="primary"
                  size="large"
                  style={{ width: "150px", backgroundColor: "#4bac4d" }}
                >
                  Hoàn thành
                </Button>
              )}
            </Space>
          </div>
        </div>
        <div className="content-wrapper__bottom">
          <div className="table-list__product">
            <Table
              columns={columns}
              dataSource={bill.listSell ? bill.listSell : []}
              pagination={false}
            />
          </div>
          <div className="math-bill">
            <div>
              <span>Tổng số lượng : </span>
              <span>{bill.countNumSell}</span>
            </div>
            <div>
              <span>Tổng tiền hàng : </span>
              <span>{bill.totalMoneySell}</span>
            </div>
            <div>
              <span>Giảm giá hóa đơn : </span>
              <span>{bill.totalSaleOffMoneySell}</span>
            </div>
            <div>
              <span>Khách cần trả : </span>
              <span>{bill.totalBuyerPaidNeed}</span>
            </div>
            <div>
              <span>Tổng đã trả: </span>
              <span>{bill.totalBuyerPaid}</span>
            </div>
            <div>
              <span>Công nợ: </span>
              <span>{bill.totalExcessPaid}</span>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default TabBillSell;
