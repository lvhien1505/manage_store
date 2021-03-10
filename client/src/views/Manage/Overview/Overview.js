import React, { useState, useEffect } from "react";
import { Button, Select, Space } from "antd";
import { Link } from "react-router-dom";
import {
  DollarCircleFilled,
  ShopFilled,
  ShoppingFilled,
} from "@ant-design/icons";
import { Column } from "@ant-design/charts";
import Dashboard from "../../../components/DashBoard/Dashboard";
import { getBillBuyWithLimit } from "../../../api/billBuy";
import { getBillWithLimit } from "../../../api/billSell";
import { notifyScreen } from "../../../utils/notify";
import "./Overview.scss";

const Overview = () => {
  const [listBillSell, setListBillSell] = useState([]);
  const [dataChart, setDataChart] = useState([{ "Doanh thu": 2000000 }]);
  const [totalMoneyRevenueToday, setTotalMoneyRevenueToday] = useState(0);
  const [numBill, setNumbill] = useState(0);
  const [typeHistory, setTypeHistory] = useState("");
  const [listBillBuy, setlistBillBuy] = useState([]);
  const [dayBill, setDayBill] = useState("");
  const [monthBill, setMonthBill] = useState("");
  const [yearBill, setYearBill] = useState("");
  const [select, setSelect] = useState("");

  const __getListBillSell = async () => {
    try {
      let res = await getBillWithLimit();
      if (res.status === 200) {
        let total = filterRevenue("1");
        setDataChart([
          { "Doanh thu ": 200000 },
          { "Doanh thu": total.totalMoney, action: "Hôm nay" },
        ]);
        setNumbill(total.numBill);
        setTotalMoneyRevenueToday(total.totalMoney);
        return setListBillSell(res.data);
      }
    } catch (error) {
      notifyScreen("error", "500", "Lỗi không xác định");
    }
  };

  const __getListBillBuy = async () => {
    try {
      let res = await getBillBuyWithLimit();
      if (res.status === 200) {
        return setlistBillBuy(res.data);
      }
    } catch (error) {
      notifyScreen("error", "500", "Lỗi không xác định");
    }
  };

  const filterRevenue = (value) => {
    let totalMoney = 0;
    if (value === "1") {
      let newListBillAfterFilter = listBillSell.filter((bill) => {
        let arrayTime = bill.createdDay.split("/");
        return (
          arrayTime[0] == dayBill &&
          arrayTime[1] == monthBill &&
          arrayTime[2] == yearBill
        );
      });
      newListBillAfterFilter.forEach((bill) => {
        totalMoney += bill.totalBuyerPaidNeed;
      });
      return {
        totalMoney,
        numBill: newListBillAfterFilter.length,
      };
    }
  };

  const __getTime = () => {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    setDayBill(day);
    setMonthBill(month);
    return setYearBill(year);
  };

  const handleChangeSelect = (value) => {
    switch (value) {
      case "1":
        let total = filterRevenue(value);
        setTotalMoneyRevenueToday(total.totalMoney);
        setDataChart([
          { "Doanh thu ": 200000 },
          { "Doanh thu": total.totalMoney, action: "Hôm nay" },
        ]);
        setSelect("hôm nay");
        break;
      case "2":
        setSelect("hôm qua");
        break;

      case "3":
        setSelect("hôm nay");
        break;

      case "4":
        setSelect("tháng này");
        break;

      case "5":
        setSelect("tháng trước");
        break;
      default:
        setSelect("hôm nay");
        break;
    }
    return;
  };

  const handleShowHistory = (type) => {
    return setTypeHistory(type);
  };

  useEffect(() => {
    __getListBillBuy();
    __getListBillSell();
    __getTime();
  }, [listBillSell.length]);
  return (
    <Dashboard nameSelect="Tổng quan" defaulCheckKey={"1"}>
      <div className="overview">
        <div className="overview-left">
          <div className="total-revenue">
            <h3>Kết quả bán hàng hôm nay</h3>
            <div className="total-revenue-total">
              <div>
                <DollarCircleFilled
                  style={{ color: "#0094da", fontSize: "30px" }}
                />
              </div>
              <div className="total-revenue__info">
                <span style={{ fontWeight: "600" }}>{numBill} Hoá đơn</span>
                <span
                  style={{
                    fontWeight: "600",
                    fontSize: "20px",
                    color: "#0094da",
                  }}
                >
                  {totalMoneyRevenueToday}
                </span>
                <span style={{ color: "#666682" }}>Doanh thu</span>
              </div>
            </div>
          </div>
          <div className="chart-revenue">
            <div className="chart-revenue__header">
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <h3>Doanh thu {select ? select : "hôm nay"}</h3>
                <h3
                  style={{
                    fontWeight: "600",
                    color: "#4bac4d",
                    marginLeft: "15px",
                  }}
                >
                  {totalMoneyRevenueToday}
                </h3>
              </div>
              <div className="select">
                <Select
                  style={{ width: "100px", backgroundColor: "#666682" }}
                  onChange={handleChangeSelect}
                  defaultValue={"1"}
                >
                  <Select.Option key="1" value="1">
                    Hôm nay
                  </Select.Option>
                  <Select.Option key="3" value="3">
                    7 ngày qua
                  </Select.Option>
                  <Select.Option key="4" value="4">
                    Tháng này
                  </Select.Option>
                  <Select.Option key="5" value="5">
                    Tháng trước
                  </Select.Option>
                </Select>
              </div>
            </div>
            <Column
              data={dataChart}
              height={300}
              xField={"action"}
              yField={"Doanh thu"}
              maxColumnWidth={50}
            />
          </div>
        </div>
        <div className="overview-right">
          <div className="overview-right__header">
            <h3>Các hoạt động gần đây</h3>
          </div>
          <div style={{ width: "100%" }}>
            <div style={{ width: "60%", margin: "0 auto" }}>
              <Space>
                <Button
                  type="link"
                  style={{ borderBottom: "1px solid #c6d3df" }}
                  onClick={() => handleShowHistory("sell")}
                >
                  Bán Hàng
                </Button>
                <Button
                  onClick={() => handleShowHistory("buy")}
                  type="link"
                  style={{ borderBottom: "1px solid #c6d3df" }}
                >
                  Nhập hàng
                </Button>
              </Space>
            </div>
            {typeHistory ? (
              typeHistory === "sell" ? (
                listBillSell.map((bill) => (
                  <div style={{width:"75%",margin:"0 auto",marginTop:"10px",borderBottom:"1px solid #c6d3df",paddingBottom:"5px"}}>
                    <span>{bill.userSell}</span>
                    <Link
                      to={`/dashboard/transaction/bill-success/${bill._id}`}
                    >
                      <span style={{marginLeft:"10px"}}>vừa bán đơn hàng</span>
                    </Link>
                    <div>
                      <span style={{fontSize:"13px"}}>với giá trị <span style={{color: "#4bac4d"}}>{bill.totalBuyerPaidNeed}</span></span>
                    </div>
                    <div>
                      <span style={{fontSize:"13px",color:"rgba(108, 97, 97, 0.85)"}}>{bill.createdHour + " - " + bill.createdDay}</span>
                    </div>
                  </div>
                ))
              ) :  (
                listBillBuy.map((bill) => (
                  <div style={{width:"75%",margin:"0 auto",marginTop:"10px",borderBottom:"1px solid #c6d3df",paddingBottom:"5px"}}>
                    <span>{bill.userSell}</span>
                    <Link
                      to={`/dashboard/transaction/buy/bill-success/${bill._id}`}
                    >
                      <span style={{marginLeft:"10px"}}>vừa nhập đơn hàng</span>
                    </Link>
                    <div>
                      <span style={{fontSize:"13px"}}>với giá trị <span style={{color: "#4bac4d"}}>{bill.totalPaidNeedPartner}</span></span>
                    </div>
                    <div>
                      <span style={{fontSize:"13px",color:"rgba(108, 97, 97, 0.85)"}}>{bill.createdHour + " - " + bill.createdDay}</span>
                    </div>
                  </div>
                ))
              )
            ) : (
              listBillSell.map((bill) => (
                <div style={{width:"75%",margin:"0 auto",marginTop:"10px",borderBottom:"1px solid #c6d3df",paddingBottom:"5px"}}>
                  <span>{bill.userSell}</span>
                  <Link
                    to={`/dashboard/transaction/bill-success/${bill._id}`}
                  >
                    <span style={{marginLeft:"10px"}}>vừa bán đơn hàng</span>
                  </Link>
                  <div>
                    <span style={{fontSize:"13px"}}>với giá trị <span style={{color: "#4bac4d"}}>{bill.totalBuyerPaidNeed}</span></span>
                  </div>
                  <div>
                    <span style={{fontSize:"13px",color:"rgba(108, 97, 97, 0.85)"}}>{bill.createdHour + " - " + bill.createdDay}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default Overview;
