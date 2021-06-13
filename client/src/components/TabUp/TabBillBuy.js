import React, { useState, useEffect } from "react";
import { Button, Table, Space } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Dashboard from "../DashBoard/Dashboard";
import { getBillWithId, updateStatusBill } from "../../api/billBuy";
import CurrencyFormat from "react-currency-format";
import { notifyScreen } from "../../utils/notify";
import "./styles/TabBill.scss";

const TabBillBuy = ({ match, history }) => {
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

  const handleSuccessBill = async (id) => {
    try {
      let res = await updateStatusBill(match.params.id, { status: true });
      if (res.status === 200) {
        notifyScreen("success", "200", "Cập nhật hóa đơn thành công");
        return history.push("/dashboard/transaction/buy/history/bill-save");
      }
    } catch (error) {
      notifyScreen("error", "500", "Cập nhật hóa đơn thất bại !");
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
    <Dashboard nameSelect={"PN0000" + bill.code} defaulCheckKey="3">
      <div className="tab-pc">
        <div className="content-wrapper">
          <div className="content-wrapper__top">
            <div className="info-bill">
              <div>
                <span>Mã hóa đơn : {"PN0000" + bill.code}</span>
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
                  Nhà cung cấp :{" "}
                  {!bill.partnerId || !bill.partnerCode ? (
                    "Không có"
                  ) : (
                    <Link to={`/dashboard/partner/${bill.partnerId}`}>
                      {"NCC" + bill.partnerCode + "-" + bill.namePartner}
                    </Link>
                  )}
                </span>
              </div>
              <div>
                <span>
                  Thời gian : {bill.createdDay + " " + bill.createdHour}
                </span>
              </div>
              <div>
                <span>Người nhập : {bill.userSell}</span>
              </div>
              <div>
                <span>Người tạo : {bill.userCreate}</span>
              </div>
            </div>
            <div className="note-bill">
              {bill.noteBuy ? bill.noteBuy : "...Ghi chú"}
            </div>
            <div className="btn-action">
              <Space direction="vertical">
                <Button
                  type="primary"
                  size="large"
                  style={{ width: "150px" }}
                  onClick={() => history.push("/notify")}
                >
                  Điều chỉnh
                </Button>
                {bill.status ? (
                  <Space direction="vertical">
                    <Button
                      type="primary"
                      size="large"
                      style={{
                        width: "150px",
                        backgroundColor: "rgba(149, 129, 129, 0.85)",
                      }}
                      onClick={() => history.push("/notify")}
                    >
                      In
                    </Button>
                    <Button
                      type="primary"
                      size="large"
                      style={{ width: "150px", backgroundColor: "rgba(149, 129, 129, 0.85)" }}
                      onClick={() => history.push("/notify")}
                    >
                      Xuất File
                    </Button>
                  </Space>
                ) : (
                  <Button
                    type="primary"
                    size="large"
                    style={{ width: "150px", backgroundColor: "#4bac4d" }}
                    onClick={() => handleSuccessBill(match.params.id)}
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
                dataSource={bill.listBuy ? bill.listBuy : []}
                pagination={false}
              />
            </div>
            <div className="math-bill">
              <div>
                <span>Tổng số lượng : </span>
                <span>{bill.countNumBuy}</span>
              </div>
              <div>
                <span>Tổng tiền hàng : </span>
                <span>{bill.totalMoneyBuy}</span>
              </div>
              <div>
                <span>Giảm giá hóa đơn : </span>
                <span>{bill.totalSaleOffMoneyBuy}</span>
              </div>
              <div>
                <span>Tiền cần trả</span>
                <span>{bill.totalPaidNeedPartner}</span>
              </div>
              <div>
                <span>Tổng đã trả: </span>
                <span>{bill.totalMoneyPaid}</span>
              </div>
              <div>
                <span>Công nợ: </span>
                <span>{bill.totalDebtMath}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="tab-mobile">
        <div className="icon-goback" onClick={() => history.goBack()}>
          <ArrowLeftOutlined style={{ color: "white" }} />
        </div>
        <div className="info">
          <div className="info-status">
            <span>Trạng thái</span>
            <span style={bill.status ? { color: "green" } : { color: "red" }}>
              {bill.status ? "Hoàn thành" : "Chưa hoàn thành"}
            </span>
          </div>
          <div className="info-buyer">
            <span>Đối tác</span>
            <span>{bill.namePartner ? bill.namePartner : "Không có"}</span>
          </div>
          <div className="info-time">
            <span className="info-time__title">Thời gian</span>
            <div className="info-time__math">
              <span>{bill.createdDay}</span>
              <span>{bill.createdHour}</span>
            </div>
          </div>
        </div>
        <div className="list-product">
          {bill.listBuy
            ? bill.listBuy.length > 0
              ? bill.listBuy.map((billBuy, i) => (
                  <div className="element-product" key={i}>
                    <div className="left">
                      <span className="product-name">{billBuy.name}</span>
                      <span className="product-code">SP{billBuy.code}</span>
                      <span className="product-math">
                        {billBuy.moneyOut} x {billBuy.countNum}
                      </span>
                    </div>
                    <div className="right">
                      <span>{billBuy.totalMoney}</span>
                    </div>
                  </div>
                ))
              : null
            : ""}
        </div>
        <div className="math-money">
          <div>
            {" "}
            <span>Tổng tiền hàng</span>
            <span
              style={{
                fontSize: "13px",
                border: "0.6px solid #53cbab",
                paddingLeft: "4px",
                paddingRight: "4px",
              }}
            >
              {bill.countNumBuy}
            </span>
            <span style={{ color: "#0090da" }}>{bill.totalMoneyBuy}</span>
          </div>
          <div>
            <span>Giảm giá hóa đơn</span>
            <span>{bill.totalSaleOffMoneyBuy}</span>
          </div>
          <div>
            <span>Cần trả NCC</span>
            <span style={{ color: "#0090da" }}>
              {bill.totalPaidNeedPartner}
            </span>
          </div>
          <div>
            <span>Đã trả</span>
            <span>{bill.totalMoneyPaid}</span>
          </div>
          <div>
            <span>Công nợ</span>
            <span>{bill.totalDebtMath}</span>
          </div>
        </div>
        <div className="user-create">
          <span>Người tạo</span>
          <span> : {bill.userSell}</span>
          <div style={{ marginTop: "10px" }}>
            {bill.noteBuy ? bill.noteBuy : "...Ghi chú"}
          </div>
        </div>
        <div className="btn-action">
          {bill.status ? (
            <Button
              type="primary"
              style={{ width: "100%", height: "70px" }}
              onClick={() => history.push("/notify")}
            >
              Điều chỉnh
            </Button>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                width: "100%",
              }}
            >
              <Button
                type="primary"
                size="large"
                style={{ width: "50%", height: "70px" }}
                onClick={() => history.push("/notify")}
              >
                Điều chỉnh
              </Button>
              <Button
                type="primary"
                size="large"
                style={{
                  width: "50%",
                  height: "70px",
                  backgroundColor: "#02c54b",
                }}
                onClick={() => handleSuccessBill(match.params.id)}
              >
                Hoàn thành
              </Button>
            </div>
          )}
        </div>
      </div>
    </Dashboard>
  );
};

export default TabBillBuy;
