import React, { useState, useEffect } from "react";
import { Button, Input } from "antd";
import { CloseOutlined, UserOutlined } from "@ant-design/icons";
import DashboardSaleMobile from "../DashBoard/DashboardSaleMobile";
import { createBillSell } from "../../api/billSell";
import { notifyScreen } from "../../utils/notify";
import CurrencyFormat from "react-currency-format";
import "./styles/Bill.scss";

const Bill = ({ listSelectProduct, hideBill, infoBuyer, nameSale }) => {
  const [hourCreateBill, setHourCreateBill] = useState("");
  const [dayCreateBill, setDayCreateBill] = useState("");
  const [totalMoney, setTotalMoney] = useState(0);
  const [totalSaleOff, setTotalSaleOff] = useState(0);
  const [totalAfterSaleOffMoney, setAfterTotalSaleOffMoney] = useState(0);
  const [totalMoneyBuyerPaid, setTotalMoneyBuyerPaid] = useState(0);
  const [totalExcessMoney, setTotalExcessMoney] = useState(0);
  const [note, setNote] = useState("");

  const __getTime = () => {
    let date = new Date();
    let hour = date.getHours() + " : " + date.getMinutes();
    let day =
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    setHourCreateBill(hour);
    return setDayCreateBill(day);
  };

  const __setTotalMoney = () => {
    let totalMoneyBill = 0;
    listSelectProduct.forEach((product) => {
      totalMoneyBill += product.totalMoney;
    });
    setAfterTotalSaleOffMoney(totalMoneyBill);
    return setTotalMoney(totalMoneyBill);
  };

  const onChangeTotalSaleOff = (event) => {
    if (event.target.value) {
      let totalMoneyAfterSaleOff = totalMoney - parseInt(event.target.value);
      setTotalSaleOff(event.target.value);
      return setAfterTotalSaleOffMoney(totalMoneyAfterSaleOff);
    }
  };

  const onChangeValueBuyerPaid = (event) => {
    if (event.target.value) {
      let excessMoney = parseInt(event.target.value) - totalAfterSaleOffMoney;
      setTotalMoneyBuyerPaid(event.target.value);
      return setTotalExcessMoney(excessMoney);
    }
  };

  const onFinish = async (type) => {
    try {
      let buyerId = infoBuyer._id ? infoBuyer._id : "";
      let nameBuyer = infoBuyer.name ? infoBuyer.name : "";
      let phone = infoBuyer.phone ? infoBuyer.phone : "";
      let createdHour = hourCreateBill || "";
      let createdDay = dayCreateBill || "";
      let userCreate = nameSale;
      let userSell = nameSale;
      let listSell = listSelectProduct;
      let countNumSell = 0;
      listSell.forEach((product) => {
        countNumSell = product.countNum + countNumSell;
      });
      let totalMoneySell = totalMoney || 0;
      let totalSaleOffMoneySell = totalSaleOff || 0;
      let totalBuyerPaidNeed = totalAfterSaleOffMoney || 0;
      let totalBuyerPaid = totalMoneyBuyerPaid || 0;
      let totalExcessPaid = totalExcessMoney || 0;
      let noteSell = note || "";
      let bill = {
        buyerId,
        nameBuyer,
        phone,
        createdHour,
        createdDay,
        userCreate,
        userSell,
        listSell,
        countNumSell,
        totalMoneySell,
        totalSaleOffMoneySell,
        totalBuyerPaidNeed,
        totalBuyerPaid,
        totalExcessPaid,
        noteSell,
      };
      if (type === "save") {
        bill.status = false;
        let res = await createBillSell(bill);
        if (res.status === 200) {
          return notifyScreen("success", res.status, res.message);
        }
      }
      if (type === "success") {
        bill.status = true;
        let res = await createBillSell(bill);
        if (res.status === 200) {
          return notifyScreen("success", res.status, res.data.message);
        }
      }
    } catch (error) {
      notifyScreen("error", "500", "L???i kh??ng x??c ?????nh");
    }
  };

  useEffect(() => {
    __getTime();
    __setTotalMoney();
  }, []);

  return (
    <div className="bill">
      <div className="icon-exit">
        <Button
          onClick={() => hideBill()}
          icon={<CloseOutlined style={{ color: "white", fontSize: "20px" }} />}
          type="link"
        ></Button>
      </div>
      <DashboardSaleMobile nameSelect="H??a ????n">
        <div className="info-buyer">
          <div className="left-name">
            <UserOutlined />
            <span style={{ marginLeft: "10px" }}>Kh??ch h??ng</span>
          </div>
          <div className="name">
            <span>{infoBuyer.name ? infoBuyer.name : "Kh??ng c??"}</span>
          </div>
        </div>
        <div className="time-sell">
          <span>{dayCreateBill ? dayCreateBill : "0/0/0000"}</span>
          <span>{hourCreateBill ? hourCreateBill : "0:00"}</span>
        </div>
        <div className="list-product">
          {listSelectProduct.length > 0
            ? listSelectProduct.map((product, i) => (
                <div className="product-item" key={i}>
                  <div className="wrapper">
                    <div className="left">
                      <span
                        className="name"
                        style={{ fontSize: "15px", fontWeight: "600" }}
                      >
                        {product.name}
                      </span>
                      <div>
                        <CurrencyFormat
                          value={product.moneyOut}
                          displayType={"text"}
                          thousandSeparator={true}
                          renderText={(value) => <span>{value}</span>}
                        />
                        <span style={{ color: "rgba(145, 128, 128, 0.85)" }}>
                          {" "}
                          x {product.countNum}
                        </span>
                      </div>
                    </div>
                    <div className="right">
                      <div className="input-saleoff">
                        {/* <span>Gi???m gi??</span>
                        <Input
                          style={{
                            width: "55%",
                            border: "none",
                            borderBottom: "1px solid #eee",
                            boxShadow: "none",
                            marginTop: "-5px",
                          }}
                          placeholder="VND"
                        /> */}
                      </div>
                      <span style={{ color: "#77d672", fontWeight: "600" }}>
                        <CurrencyFormat
                          value={product.totalMoney}
                          displayType={"text"}
                          thousandSeparator={true}
                          renderText={(value) => <span>{value}</span>}
                        />
                      </span>
                    </div>
                  </div>
                </div>
              ))
            : null}
        </div>
        <div style={{ marginTop: "20px" }}>
          <Input.TextArea
            placeholder="Ghi ch??"
            style={{ border: "none", height: "100px" }}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
        <div className="footer-fixed">
          <div className="math">
            <div className="sale-off">
              <span style={{ fontSize: "15px", fontWeight: "600" }}>
                Gi???m gi??
              </span>
              <Input
                onChange={onChangeTotalSaleOff}
                style={{
                  width: "55%",
                  border: "none",
                  borderBottom: "1px solid #eee",
                  boxShadow: "none",
                }}
                placeholder="VND"
              />
            </div>
            <div style={{ fontSize: "15px", fontWeight: "600" }}>
              T???ng ti???n :{" "}
              <span className="total-money" style={{ color: "#77d672" }}>
                <CurrencyFormat
                  value={totalMoney}
                  displayType={"text"}
                  thousandSeparator={true}
                  renderText={(value) => <span>{value}</span>}
                />
              </span>
            </div>
          </div>
          <div className="math">
            <div className="sale-off">
              <span style={{ fontSize: "15px", fontWeight: "600" }}>
                Kh??ch tr???
              </span>
              <Input
                onChange={onChangeValueBuyerPaid}
                style={{
                  width: "55%",
                  border: "none",
                  borderBottom: "1px solid #eee",
                  boxShadow: "none",
                }}
                placeholder="VND"
              />
            </div>
            <div style={{ fontSize: "15px", fontWeight: "600" }}>
              Ti???n th???a tr??? :{" "}
              <span className="total-money" style={{ color: "#77d672" }}>
                <CurrencyFormat
                  value={totalExcessMoney}
                  displayType={"text"}
                  thousandSeparator={true}
                  renderText={(value) => <span>{value}</span>}
                />
              </span>
            </div>
          </div>
          <div className="action-btn">
            <Button
              type="primary"
              className="btn btn-save"
              onClick={() => onFinish("save")}
            >
              L??u
            </Button>
            <Button
              type="primary"
              className="btn btn-success"
              onClick={() => onFinish("success")}
            >
              Ho??n th??nh
            </Button>
          </div>
        </div>
      </DashboardSaleMobile>
    </div>
  );
};

export default Bill;
