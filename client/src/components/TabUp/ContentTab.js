import React, { useState, useEffect } from "react";
import { Input, Form, Button, List, InputNumber, Radio } from "antd";
import { UserOutlined, DeleteOutlined } from "@ant-design/icons";
import SearchBuyer from "../Search/Search";
import { createBillSell } from "../../api/billSell";
import { notifyScreen } from "../../utils/notify";
import CurrencyFormat from "react-currency-format";
import "./styles/ContentTab.scss";

const ContentTab = ({
  listBuyer,
  keyBill,
  listSell,
  removeProduct,
  nameSale,
  countNumProduct,
}) => {
  const [totalSaleOffMoney, setTotalSaleOffMoney] = useState(0);
  const [totalPaidMoney, setTotalPaidMoney] = useState(0);
  const [totalExcessMoney, setExcessMoney] = useState(0);
  const [totalMoney, setTotalMoney] = useState(0);
  const [totalMoneyBuyerPaid, setTotalMoneyBuyerPaid] = useState(0);
  const [listProduct, setListProduct] = useState(listSell);
  const [buyer, setBuyer] = useState({});
  const [typeSelectPay, setTypeSelectPay] = useState("selectPaid");
  const [dayCreateBill, setDayCreateBill] = useState("");
  const [hourCreateBill, setHourCreateBill] = useState("");
  const [note, setNote] = useState("");

  const __initTotalMoney = () => {
    let totalMoneyInit = 0;
    listSell.forEach((product) => {
      totalMoneyInit += product.totalMoney;
    });
    setTotalPaidMoney(totalMoneyInit - totalSaleOffMoney);
    setExcessMoney(totalMoneyBuyerPaid - (totalMoneyInit - totalSaleOffMoney));
    return setTotalMoney(totalMoneyInit);
  };

  const onChangeValueNumProduct = (value, idProduct) => {
    let newListProduct = listProduct.map((product) => {
      if (product._id === idProduct) {
        product.countNum = value;
        product.totalMoney = product.countNum * parseInt(product.moneyOut);
      }
      return product;
    });
    return setListProduct(newListProduct);
  };

  const onChangeValueSaleOff = (values) => {
    let value = values.value;
    let newPaidMoney = totalMoney - parseInt(value);
    if (value == "") {
      value = 0;
      newPaidMoney = totalMoney - parseInt(value);
    }
    setTotalSaleOffMoney(value);
    return setTotalPaidMoney(newPaidMoney);
  };

  const onChangeValuePaidMoney = (values) => {
    let value = values.value;
    let newExcessMoney = parseInt(value) - totalPaidMoney;
    if (value == "") {
      value = 0;
      newExcessMoney = parseInt(value) - totalPaidMoney;
    }
    setTotalMoneyBuyerPaid(value);
    return setExcessMoney(newExcessMoney);
  };

  const handleSelectBuyer = (info) => {
    console.log(info);
    return setBuyer(info);
  };

  const __getTime = () => {
    let date = new Date();
    let hour = date.getHours() + " : " + date.getMinutes();
    let day =
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    setHourCreateBill(hour);
    return setDayCreateBill(day);
  };

  const handleChangeSelectRadio =(e)=>{
    return setTypeSelectPay(e.target.value)
  }

  const onFinish = async (type, listProduct) => {
    try {
      let listSell = [...listProduct];
      let buyerId = "";
      if (listSell.length > 0) {
        if (buyer) {
          buyerId = buyer._id ? buyer._id : "";
        }
        let createdHour = hourCreateBill || "";
        let createdDay = dayCreateBill || "";
        let userCreate = nameSale;
        let userSell = nameSale;

        let countNumSell = listSell.reduce((previousValue,currentValue)=>previousValue + currentValue.countNum,0);
        let totalMoneySell = totalMoney || 0;
        let totalSaleOffMoneySell = totalSaleOffMoney || 0;
        let totalBuyerPaidNeed = totalPaidMoney || 0;
        let totalBuyerPaid = totalMoneyBuyerPaid || 0;
        let totalExcessPaid = totalExcessMoney || 0;
        let noteSell = note || "";
        let bill = {
          buyerId,
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
        if (type === "success") {
          bill.status = true;
          if (totalExcessPaid > 0) {
            if (typeSelectPay == "selectDebt") {
              bill.typeSelectPay="debt"
            }else{
              bill.typeSelectPay="paid"
            }
          }
          let res = await createBillSell(bill);
          if (res.status === 200) {
            return notifyScreen("success", res.status, res.data.message);
          }
        }
      } else {
        notifyScreen("error", "400", "Hóa đơn trống !");
      }
    } catch (error) {
      notifyScreen("error", "500", "Lỗi không xác định !");
    }
  };
  useEffect(() => {
    __getTime();
    __initTotalMoney();
    setListProduct(listSell);
  }, [totalMoney, totalSaleOffMoney, buyer, countNumProduct]);

  return (
    <div className="content-tab-wrapper">
      <div className="list-product">
        <div className="list-product-list">
          {listProduct.length > 0 ? (
            <List>
              {listProduct.map((product, i) => (
                <List.Item
                  key={i}
                  style={
                    i % 2 != 0
                      ? {
                          backgroundColor: "#f9f9f9",
                          paddingBottom: "20px",
                          border: "1px solid #eee",
                          borderRadius: "2px",
                          boxShadow: "1px 1px 1px #ebebeb",
                        }
                      : {
                          paddingBottom: "20px",
                          border: "1px solid #eee",
                          borderRadius: "2px",
                          boxShadow: "1px 1px 1px #ebebeb",
                        }
                  }
                >
                  <div className="info-product">
                    <div className="info-product__left">
                      <div
                        style={{
                          width: "20%",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span>{i + 1}</span>
                        <span
                          onClick={() => removeProduct(product._id)}
                          className="action-remove"
                        >
                          <DeleteOutlined className="symbol-icon-delete" />
                        </span>
                      </div>
                      <div style={{ width: "50%" }}>
                        <span>SP{product.code}</span>
                      </div>
                    </div>
                    <div className="info-product__center">
                      <span>{product.name}</span>
                    </div>
                    <div className="info-product__right">
                      <span style={{ marginTop: "-5px" }}>
                        <InputNumber
                          onChange={(value) =>
                            onChangeValueNumProduct(value, product._id)
                          }
                          defaultValue={product.countNum}
                          value={product.countNum}
                          style={
                            i % 2 != 0
                              ? {
                                  width: "55px",
                                  border: "none",
                                  borderBottom: "1px solid #d9d9d9",
                                  fontSize: "13px",
                                  backgroundColor: "#f9f9f9",
                                  boxShadow: "none",
                                }
                              : {
                                  width: "55px",
                                  border: "none",
                                  borderBottom: "1px solid #d9d9d9",
                                  fontSize: "13px",
                                  boxShadow: "none",
                                }
                          }
                        />
                      </span>
                      <CurrencyFormat
                        value={product.moneyOut}
                        displayType={"text"}
                        thousandSeparator={true}
                        renderText={(value) => <span>{value}</span>}
                      />

                      <span style={{ marginTop: "-5px" }}></span>
                      <span
                        style={{
                          fontWeight: "700",
                          color: "rgba(0, 0, 0, 0.85)",
                        }}
                      >
                        <CurrencyFormat
                          value={product.totalMoney}
                          displayType={"text"}
                          thousandSeparator={true}
                          renderText={(value) => <span>{value}</span>}
                        />
                      </span>
                    </div>
                  </div>
                </List.Item>
              ))}
            </List>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="form-sell">
        <div className="sell-header">
          <div className="info-seller">
            <UserOutlined /> <span>{nameSale}</span>
          </div>
          <div className="info-time">
            <span>{dayCreateBill}</span>
            <span>{hourCreateBill}</span>
          </div>
        </div>
        <div className="form">
          <Form>
            <div className="search-buyer-search">
              <Form.Item name="buyer">
                <SearchBuyer
                  listBuyer={listBuyer}
                  valueSelectBuyer={(info) => handleSelectBuyer(info)}
                  typeSearch="buyer"
                />
              </Form.Item>
              {buyer._id ? null : (
                <div
                  style={{ fontSize: "12px", color: "red", marginTop: "-10px" }}
                >
                  * Hệ thống không theo dõi công nợ đối với khách lẻ
                </div>
              )}
            </div>
            <div className="name-bill">
              <div>{keyBill}</div>
            </div>
            <div className="info-bill">
              <div className="total-money">
                <span>Tổng tiền hàng</span>
                <span style={{ fontSize: "14px" }}>
                  <CurrencyFormat
                    value={totalMoney}
                    displayType={"text"}
                    thousandSeparator={true}
                    renderText={(value) => <span>{value}</span>}
                  />
                </span>
              </div>
              <div className="sale-money">
                <span>Giảm giá</span>
                <CurrencyFormat
                  thousandSeparator={true}
                  onValueChange={onChangeValueSaleOff}
                  className="input-current-format"
                  disabled={listProduct.length > 0 ? false : true}
                />
              </div>
              <div className="need-money">
                <span>Khách cần trả</span>
                <span style={{ fontSize: "16px", color: "#3d933c" }}>
                  <CurrencyFormat
                    value={totalPaidMoney}
                    displayType={"text"}
                    thousandSeparator={true}
                    renderText={(value) => <span>{value}</span>}
                  />
                </span>
              </div>
              <div className="paid-money">
                <span>Khách thanh toán</span>
                <CurrencyFormat
                  thousandSeparator={true}
                  onValueChange={onChangeValuePaidMoney}
                  className="input-current-format"
                  disabled={listProduct.length > 0 ? false : true}
                />
              </div>
              <div className="excess-money">
                {buyer._id ? (
                  totalExcessMoney > 0 ? (
                    <Radio.Group
                      options={[
                        { label: "Tiền thừa trả khách", value: "selectPaid" },
                        { label: "Tính vào công nợ", value: "selectDebt" },
                      ]}
                      defaultValue="selectPaid"
                      onChange={handleChangeSelectRadio}
                    ></Radio.Group>
                  ) : (
                    <span>Tính vào công nợ</span>
                  )
                ) : (
                  <span>Tiền thừa trả khách</span>
                )}

                <span style={{ fontSize: "14px" }}>
                  <CurrencyFormat
                    value={totalExcessMoney}
                    displayType={"text"}
                    thousandSeparator={true}
                    renderText={(value) => <span>{value}</span>}
                  />
                </span>
              </div>
              <div className="note">
                <Input.TextArea
                  placeholder="Ghi chú"
                  bordered={false}
                  style={{
                    borderBottom: "1px solid #e1e1e1",
                    padding: "0",
                    fontSize: "14px",
                    height: "40px",
                    maxHeight: "80px",
                  }}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
            </div>
            <div className="btn-action">
              <Form.Item name="success">
                <Button
                  type="primary"
                  htmlType="button"
                  className="btn btn-success-bill"
                  onClick={() => onFinish("success", listProduct)}
                >
                  <span style={{ fontSize: "18px", fontWeight: "600" }}>
                    Thanh toán
                  </span>
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ContentTab;
