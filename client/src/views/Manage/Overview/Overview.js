import React, { useState, useEffect } from "react";
import { Button, Select, Space } from "antd";
import CurrencyFormat from "react-currency-format";
import { Link } from "react-router-dom";
import { DollarCircleFilled } from "@ant-design/icons";
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
  const [totalMoneyRevenueSelect, setTotalMoneyRevenueSelect] = useState(0);
  const [numBill, setNumbill] = useState(0);
  const [typeHistory, setTypeHistory] = useState("");
  const [listBillBuy, setlistBillBuy] = useState([]);
  let [dayBill, setDayBill] = useState("");
  let [monthBill, setMonthBill] = useState("");
  let [yearBill, setYearBill] = useState("");
  const [select, setSelect] = useState("");

  const __getListBillSell = async () => {
    try {
      let res = await getBillWithLimit();
      if (res.status === 200) {
        let total = filterRevenue("homnay");
        setDataChart([
          { "Doanh thu": total.totalMoney, action: "Hôm nay", type: "Hôm nay" },
        ]);
        setNumbill(total.numBill);
        setTotalMoneyRevenueToday(total.totalMoney);
        setTotalMoneyRevenueSelect(total.totalMoney);
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
    __getTime();
    let totalMoney = 0;
    let newListBillAfterFilter = [];
    dayBill = parseInt(dayBill);
    monthBill = parseInt(monthBill);
    yearBill = parseInt(yearBill);
    switch (value) {
      case "homnay":
        newListBillAfterFilter = [
          ...listBillSell.filter((bill) => {
            let arrayTime = bill.createdDay.split("/");
            return (
              parseInt(arrayTime[0]) == dayBill &&
              parseInt(arrayTime[1]) == monthBill &&
              parseInt(arrayTime[2]) == yearBill
            );
          }),
        ];
        totalMoney = newListBillAfterFilter.reduce(
          (previousValue, currentValue) =>
            previousValue + currentValue.totalBuyerPaidNeed,
          0
        );
        return {
          totalMoney,
          newListBillAfterFilter,
        };

        break;
      case "homqua":
        newListBillAfterFilter = [
          ...listBillSell.filter((bill) => {
            let arrayTime = bill.createdDay.split("/");

            if (dayBill == 1 && monthBill == 1) {
              return (
                parseInt(arrayTime[0]) == 31 &&
                parseInt(arrayTime[1]) == 12 &&
                parseInt(arrayTime[2]) == yearBill - 1
              );
            } else if (dayBill == 1) {
              if (monthBill == 3) {
                return (
                  parseInt(arrayTime[0]) == 28 &&
                  parseInt(arrayTime[1]) == 2 &&
                  parseInt(arrayTime[2]) == yearBill
                );
              }
              if (
                monthBill == 5 ||
                monthBill == 7 ||
                monthBill == 8 ||
                monthBill == 10 ||
                monthBill == 12
              ) {
                return (
                  parseInt(arrayTime[0]) == 30 &&
                  parseInt(arrayTime[1]) == monthBill - 1 &&
                  parseInt(arrayTime[2]) == yearBill
                );
              }
              return (
                parseInt(arrayTime[0]) == 31 &&
                parseInt(arrayTime[1]) == monthBill - 1 &&
                parseInt(arrayTime[2]) == yearBill
              );
            } else {
              return (
                parseInt(arrayTime[0]) == dayBill - 1 &&
                parseInt(arrayTime[1]) == monthBill &&
                parseInt(arrayTime[2]) == yearBill
              );
            }
          }),
        ];
        totalMoney = newListBillAfterFilter.reduce(
          (previousValue, currentValue) =>
            previousValue + currentValue.totalBuyerPaidNeed,
          0
        );
        return {
          totalMoney,
          newListBillAfterFilter,
        };

        break;

      case "7ngayqua":
        if (dayBill <= 6 && monthBill == 1) {
          for (let i = 0; i < 7; i++) {
            let copyListBillSellFilterWithDay = [];
            let dayBillCreated = `${dayBill}/${monthBill}`;

            if (dayBill == 0) {
              dayBill = 30;
              monthBill = 12;
              dayBillCreated = `${dayBill}/${monthBill}`;
              copyListBillSellFilterWithDay = [
                ...listBillSell.filter((bill) => {
                  let arrayTime = bill.createdDay.split("/");
                  return (
                    parseInt(arrayTime[0]) == dayBill &&
                    parseInt(arrayTime[1]) == monthBill &&
                    parseInt(arrayTime[2]) == yearBill - 1
                  );
                }),
              ];
              newListBillAfterFilter.push([
                {
                  listDataBillSell: copyListBillSellFilterWithDay,
                  dayBillCreated,
                },
              ]);
            } else {
              copyListBillSellFilterWithDay = [
                ...listBillSell.filter((bill) => {
                  let arrayTime = bill.createdDay.split("/");
                  return (
                    parseInt(arrayTime[0]) == dayBill &&
                    parseInt(arrayTime[1]) == monthBill &&
                    parseInt(arrayTime[2]) == yearBill
                  );
                }),
              ];
              newListBillAfterFilter.push([
                {
                  listDataBillSell: copyListBillSellFilterWithDay,
                  dayBillCreated,
                },
              ]);
            }
            dayBill = dayBill - 1;
          }
        } else if (dayBill <= 6) {
          for (let i = 0; i < 7; i++) {
            let copyListBillSellFilterWithDay = [];
            let dayBillCreated = `${dayBill}/${monthBill}`;

            if (
              dayBill == 0 &&
              (monthBill == 5 ||
                monthBill == 7 ||
                monthBill == 8 ||
                monthBill == 10 ||
                monthBill == 12)
            ) {
              dayBill = 30;
              monthBill = monthBill - 1;
              dayBillCreated = `${dayBill}/${monthBill}`;
              copyListBillSellFilterWithDay = [
                ...listBillSell.filter((bill) => {
                  let arrayTime = bill.createdDay.split("/");
                  return (
                    parseInt(arrayTime[0]) == dayBill &&
                    parseInt(arrayTime[1]) == monthBill &&
                    parseInt(arrayTime[2]) == yearBill
                  );
                }),
              ];
              newListBillAfterFilter.push([
                {
                  listDataBillSell: copyListBillSellFilterWithDay,
                  dayBillCreated,
                },
              ]);
            } else if (dayBill == 0 && monthBill == 3) {
              dayBill = 28;
              monthBill = 2;
              dayBillCreated = `${dayBill}/${monthBill}`;
              copyListBillSellFilterWithDay = [
                ...listBillSell.filter((bill) => {
                  let arrayTime = bill.createdDay.split("/");
                  return (
                    parseInt(arrayTime[0]) == dayBill &&
                    parseInt(arrayTime[1]) == monthBill &&
                    parseInt(arrayTime[2]) == yearBill
                  );
                }),
              ];
              newListBillAfterFilter.push([
                {
                  listDataBillSell: copyListBillSellFilterWithDay,
                  dayBillCreated,
                },
              ]);
            } else {
              dayBill = 31;
              monthBill = monthBill - 1;
              dayBillCreated = `${dayBill}/${monthBill}`;
              copyListBillSellFilterWithDay = [
                ...listBillSell.filter((bill) => {
                  let arrayTime = bill.createdDay.split("/");
                  return (
                    parseInt(arrayTime[0]) == dayBill &&
                    parseInt(arrayTime[1]) == monthBill &&
                    parseInt(arrayTime[2]) == yearBill
                  );
                }),
              ];
              newListBillAfterFilter.push([
                {
                  listDataBillSell: copyListBillSellFilterWithDay,
                  dayBillCreated,
                },
              ]);
            }
            dayBill = dayBill - i;
          }
        } else {
          for (let i = 0; i < 7; i++) {
            let copyListBillSellFilterWithDay = [];
            let dayBillCreated = `${dayBill}/${monthBill}`;
            copyListBillSellFilterWithDay = [
              ...listBillSell.filter((bill) => {
                let arrayTime = bill.createdDay.split("/");
                return (
                  parseInt(arrayTime[0]) == dayBill &&
                  parseInt(arrayTime[1]) == monthBill &&
                  parseInt(arrayTime[2]) == yearBill
                );
              }),
            ];
            newListBillAfterFilter.push([
              {
                listDataBillSell: copyListBillSellFilterWithDay,
                dayBillCreated,
              },
            ]);
            dayBill = dayBill - 1;
          }
        }
        for (let i = 0; i < newListBillAfterFilter.length; i++) {
          if (newListBillAfterFilter[i][0].listDataBillSell.length > 0) {
            totalMoney += newListBillAfterFilter[i][0].listDataBillSell.reduce(
              (previousValue, currentValue) =>
                previousValue + currentValue.totalBuyerPaidNeed,
              0
            );
          }
        }

        return {
          totalMoney: totalMoney,
          listDataBillSell: newListBillAfterFilter,
        };
        break;

      case "thangnay":
        let conditionStop = dayBill;
        for (let i = 0; i < conditionStop; i++) {
          let copyListBillSellFilterWithDay = [];
          let dayBillCreated = `${dayBill}/${monthBill}`;
          copyListBillSellFilterWithDay = [
            ...listBillSell.filter((bill) => {
              let arrayTime = bill.createdDay.split("/");
              return (
                parseInt(arrayTime[0]) == dayBill &&
                parseInt(arrayTime[1]) == monthBill &&
                parseInt(arrayTime[2]) == yearBill
              );
            }),
          ];

          newListBillAfterFilter.push([
            {
              listDataBillSell: copyListBillSellFilterWithDay,
              dayBillCreated,
            },
          ]);
          dayBill = dayBill - 1;
        }

        for (let i = 0; i < newListBillAfterFilter.length; i++) {
          if (newListBillAfterFilter[i][0].listDataBillSell.length > 0) {
            totalMoney += newListBillAfterFilter[i][0].listDataBillSell.reduce(
              (previousValue, currentValue) =>
                previousValue + currentValue.totalBuyerPaidNeed,
              0
            );
          }
        }

        return {
          totalMoney: totalMoney,
          listDataBillSell: newListBillAfterFilter,
        };
        break;

      case "thangtruoc":
        let previousMonthBill = monthBill - 1;
        if (previousMonthBill == 2) {
          for (let i = 0; i < 28; i++) {
            let copyListBillSellFilterWithDay = [];
            let dayBillCreated = `${i + 1}/${previousMonthBill}`;
            copyListBillSellFilterWithDay = [
              ...listBillSell.filter((bill) => {
                let arrayTime = bill.createdDay.split("/");
                return (
                  parseInt(arrayTime[0]) == i + 1 &&
                  parseInt(arrayTime[1]) == previousMonthBill &&
                  parseInt(arrayTime[2]) == yearBill
                );
              }),
            ];

            newListBillAfterFilter.push([
              {
                listDataBillSell: copyListBillSellFilterWithDay,
                dayBillCreated,
              },
            ]);
          }
        } else if (
          previousMonthBill == 1 ||
          previousMonthBill == 3 ||
          previousMonthBill == 5 ||
          previousMonthBill == 7 ||
          previousMonthBill == 8 ||
          previousMonthBill == 10 ||
          previousMonthBill == 12
        ) {
          for (let i = 0; i < 31; i++) {
            let copyListBillSellFilterWithDay = [];
            let dayBillCreated = `${i + 1}/${previousMonthBill}`;
            copyListBillSellFilterWithDay = [
              ...listBillSell.filter((bill) => {
                let arrayTime = bill.createdDay.split("/");
                return (
                  parseInt(arrayTime[0]) == i + 1 &&
                  parseInt(arrayTime[1]) == previousMonthBill &&
                  parseInt(arrayTime[2]) == yearBill
                );
              }),
            ];

            newListBillAfterFilter.push([
              {
                listDataBillSell: copyListBillSellFilterWithDay,
                dayBillCreated,
              },
            ]);
          }
        } else {
          for (let i = 0; i < 30; i++) {
            let copyListBillSellFilterWithDay = [];
            let dayBillCreated = `${i + 1}/${previousMonthBill}`;
            copyListBillSellFilterWithDay = [
              ...listBillSell.filter((bill) => {
                let arrayTime = bill.createdDay.split("/");
                return (
                  parseInt(arrayTime[0]) == i + 1 &&
                  parseInt(arrayTime[1]) == previousMonthBill &&
                  parseInt(arrayTime[2]) == yearBill
                );
              }),
            ];

            newListBillAfterFilter.push([
              {
                listDataBillSell: copyListBillSellFilterWithDay,
                dayBillCreated,
              },
            ]);
          }
        }

        for (let i = 0; i < newListBillAfterFilter.length; i++) {
          if (newListBillAfterFilter[i][0].listDataBillSell.length > 0) {
            totalMoney += newListBillAfterFilter[i][0].listDataBillSell.reduce(
              (previousValue, currentValue) =>
                previousValue + currentValue.totalBuyerPaidNeed,
              0
            );
          }
        }

        return {
          totalMoney: totalMoney,
          listDataBillSell: newListBillAfterFilter,
        };
        break;
      default:
        break;
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
    let total = null;
    let listDataChart = [];
    switch (value) {
      case "homnay":
        total = filterRevenue(value);
        setTotalMoneyRevenueSelect(total.totalMoney);
        setDataChart([
          { "Doanh thu": total.totalMoney, action: "Hôm nay", type: "Hôm nay" },
        ]);
        setSelect("hôm nay");
        break;
      case "homqua":
        total = filterRevenue(value);
        setTotalMoneyRevenueSelect(total.totalMoney);
        setDataChart([
          { "Doanh thu": total.totalMoney, action: "Hôm qua", type: "Hôm qua" },
        ]);
        setSelect("hôm qua");
        break;

      case "7ngayqua":
        listDataChart = [];
        total = filterRevenue(value);
        setTotalMoneyRevenueSelect(total.totalMoney);
        for (let i = 0; i < total.listDataBillSell.length; i++) {
          let totalMoney = total.listDataBillSell[i][0].listDataBillSell.reduce(
            (previousValue, currentValue) =>
              previousValue + currentValue.totalBuyerPaidNeed,
            0
          );
          listDataChart.push({
            "Doanh thu": totalMoney,
            action: `${total.listDataBillSell[i][0].dayBillCreated}`,
            type: `${total.listDataBillSell[i][0].dayBillCreated}`,
          });
        }
        setDataChart(listDataChart.sort(() => -1));
        setSelect("7 ngày qua");
        break;

      case "thangnay":
        listDataChart = [];
        total = filterRevenue(value);
        setTotalMoneyRevenueSelect(total.totalMoney);
        for (let i = 0; i < total.listDataBillSell.length; i++) {
          let totalMoney = total.listDataBillSell[i][0].listDataBillSell.reduce(
            (previousValue, currentValue) =>
              previousValue + currentValue.totalBuyerPaidNeed,
            0
          );
          listDataChart.push({
            "Doanh thu": totalMoney,
            action: `${total.listDataBillSell[i][0].dayBillCreated}`,
            type: `${total.listDataBillSell[i][0].dayBillCreated}`,
          });
        }
        setDataChart(listDataChart.sort(() => -1));
        setSelect("tháng này");
        break;

      case "thangtruoc":
        listDataChart = [];
        total = filterRevenue(value);
        setTotalMoneyRevenueSelect(total.totalMoney);
        for (let i = 0; i < total.listDataBillSell.length; i++) {
          let totalMoney = total.listDataBillSell[i][0].listDataBillSell.reduce(
            (previousValue, currentValue) =>
              previousValue + currentValue.totalBuyerPaidNeed,
            0
          );
          listDataChart.push({
            "Doanh thu": totalMoney,
            action: `${total.listDataBillSell[i][0].dayBillCreated}`,
            type: `${total.listDataBillSell[i][0].dayBillCreated}`,
          });
        }
        setDataChart(listDataChart.sort());
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
                  <CurrencyFormat
                    value={totalMoneyRevenueToday}
                    displayType={"text"}
                    thousandSeparator={true}
                    renderText={(value) => <span>{value}</span>}
                  />
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
                  <CurrencyFormat
                    value={totalMoneyRevenueSelect}
                    displayType={"text"}
                    thousandSeparator={true}
                    renderText={(value) => <span>{value}</span>}
                  />
                </h3>
              </div>
              <div className="select">
                <Select
                  style={{ width: "100px", backgroundColor: "#666682" }}
                  onChange={handleChangeSelect}
                  defaultValue={"homnay"}
                >
                  <Select.Option key="1" value="homnay">
                    Hôm nay
                  </Select.Option>
                  <Select.Option key="2" value="homqua">
                    Hôm qua
                  </Select.Option>
                  <Select.Option key="3" value="7ngayqua">
                    7 ngày qua
                  </Select.Option>
                  <Select.Option key="4" value="thangnay">
                    Tháng này
                  </Select.Option>
                  <Select.Option key="5" value="thangtruoc">
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
            {typeHistory
              ? typeHistory === "sell"
                ? listBillSell.map((bill) => (
                    <div
                      style={{
                        width: "75%",
                        margin: "0 auto",
                        marginTop: "10px",
                        borderBottom: "1px solid #c6d3df",
                        paddingBottom: "5px",
                      }}
                      key={bill._id}
                    >
                      <span>{bill.userSell}</span>
                      <Link
                        to={`/dashboard/transaction/bill-success/${bill._id}`}
                      >
                        <span style={{ marginLeft: "10px" }}>
                          vừa bán đơn hàng
                        </span>
                      </Link>
                      <div>
                        <span style={{ fontSize: "13px" }}>
                          với giá trị{" "}
                          <span style={{ color: "#4bac4d" }}>
                            {" "}
                            <CurrencyFormat
                              value={bill.totalBuyerPaidNeed}
                              displayType={"text"}
                              thousandSeparator={true}
                              renderText={(value) => <span>{value}</span>}
                            />
                          </span>
                        </span>
                      </div>
                      <div>
                        <span
                          style={{
                            fontSize: "13px",
                            color: "rgba(108, 97, 97, 0.85)",
                          }}
                        >
                          {bill.createdHour + " - " + bill.createdDay}
                        </span>
                      </div>
                    </div>
                  ))
                : listBillBuy.map((bill) => (
                    <div
                      style={{
                        width: "75%",
                        margin: "0 auto",
                        marginTop: "10px",
                        borderBottom: "1px solid #c6d3df",
                        paddingBottom: "5px",
                      }}
                      key={bill._id}
                    >
                      <span>{bill.userSell}</span>
                      <Link
                        to={`/dashboard/transaction/buy/bill-success/${bill._id}`}
                      >
                        <span style={{ marginLeft: "10px" }}>
                          vừa nhập đơn hàng
                        </span>
                      </Link>
                      <div>
                        <span style={{ fontSize: "13px" }}>
                          với giá trị{" "}
                          <span style={{ color: "#4bac4d" }}>
                            <CurrencyFormat
                              value={bill.totalPaidNeedPartner}
                              displayType={"text"}
                              thousandSeparator={true}
                              renderText={(value) => <span>{value}</span>}
                            />
                          </span>
                        </span>
                      </div>
                      <div>
                        <span
                          style={{
                            fontSize: "13px",
                            color: "rgba(108, 97, 97, 0.85)",
                          }}
                        >
                          {bill.createdHour + " - " + bill.createdDay}
                        </span>
                      </div>
                    </div>
                  ))
              : listBillSell.map((bill) => (
                  <div
                    style={{
                      width: "75%",
                      margin: "0 auto",
                      marginTop: "10px",
                      borderBottom: "1px solid #c6d3df",
                      paddingBottom: "5px",
                    }}
                    key={bill._id}
                  >
                    <span>{bill.userSell}</span>
                    <Link
                      to={`/dashboard/transaction/bill-success/${bill._id}`}
                    >
                      <span style={{ marginLeft: "10px" }}>
                        vừa bán đơn hàng
                      </span>
                    </Link>
                    <div>
                      <span style={{ fontSize: "13px" }}>
                        với giá trị{" "}
                        <span style={{ color: "#4bac4d" }}>
                          <CurrencyFormat
                            value={bill.totalBuyerPaidNeed}
                            displayType={"text"}
                            thousandSeparator={true}
                            renderText={(value) => <span>{value}</span>}
                          />
                        </span>
                      </span>
                    </div>
                    <div>
                      <span
                        style={{
                          fontSize: "13px",
                          color: "rgba(108, 97, 97, 0.85)",
                        }}
                      >
                        {bill.createdHour + " - " + bill.createdDay}
                      </span>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default Overview;
