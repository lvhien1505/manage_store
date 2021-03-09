import React, { useState, useEffect } from "react";
import { Input, Form, Button, List, InputNumber } from "antd";
import { UserOutlined, DeleteOutlined } from "@ant-design/icons";
import SearchBuyer from "../Search/Search";
import {createBillSell} from '../../api/billSell'
import {notifyScreen} from '../../utils/notify'
import "./styles/ContentTab.scss";

const ContentTab = ({ listBuyer, keyBill, listSell,removeProduct,nameSale }) => {
  const [totalSaleOffMoney, setTotalSaleOffMoney] = useState(0);
  const [totalPaidMoney, setTotalPaidMoney] = useState(0);
  const [totalExcessMoney, setExcessMoney] = useState(0);
  const [totalMoney, setTotalMoney] = useState(0);
  const [totalMoneyBuyerPaid, setTotalMoneyBuyerPaid] = useState(0);
  const [listProduct, setListProduct] = useState([]);
  const [buyer, setBuyer] = useState({});
  const [dayCreateBill, setDayCreateBill] = useState("");
  const [hourCreateBill, setHourCreateBill] = useState("");
  const [note, setNote] = useState("");

  const __initTotalMoney=()=>{
    let totalMoneyInit=0;
        listProduct.forEach((product)=>{
        totalMoneyInit += product.totalMoney;
    })
    setTotalPaidMoney(totalMoneyInit - totalSaleOffMoney)
    setExcessMoney(totalMoneyBuyerPaid - (totalMoneyInit-totalSaleOffMoney));
    return setTotalMoney(totalMoneyInit);

  }

  const onChangeValueNumProduct = (value, idProduct) => {
    let newListProduct = listProduct.map((product) => {
      if (product._id === idProduct) {
        product.countNum=value;
        product.totalMoney = product.countNum * parseInt(product.moneyOut);  
      }
      return product;
    });
    return setListProduct(newListProduct);
  };

  const onChangeValueSaleOffProduct = (value, idProduct) => {
    let newListProduct = listProduct.map((product) => {
      if (product._id === idProduct) {
        product.totalMoney =  parseInt(product.totalMoney)-value;
      }
      return product;
    });
    return setListProduct(newListProduct);
  };

  const onChangeValueSaleOff=(e)=>{
    let value=e.target.value;
    if (!e.target.value || e.target.value === "0") {
      value=0;
    }
    let newPaidMoney=totalMoney - parseInt(value);
    setTotalSaleOffMoney(value);
    return setTotalPaidMoney(newPaidMoney);
  }

  const onChangeValuePaidMoney=(e)=>{
    let value=e.target.value;
    if (!e.target.value || e.target.value === "0") {
      value=0;
    }
    let newExcessMoney= parseInt(value) - totalPaidMoney;
    setTotalMoneyBuyerPaid(value)
    return setExcessMoney(newExcessMoney);
  }

  const handleSelectBuyer =(info)=>{
      return setBuyer(info);
  }

  const __getTime =()=>{
    let date =new Date()
    let hour=date.getHours() + " : " + date.getMinutes();
    let day=date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() 
    setHourCreateBill(hour)
    return setDayCreateBill(day);
  }

  const onFinish =async (type,listProduct)=>{
    try {
      let buyerId=buyer._id ? buyer._id : ""
      let buyerCode=buyer.code ? buyer.code : ""
      let nameBuyer =buyer.name ? buyer.name : ""
      let phone = buyer.phone ? buyer.phone: ""
      let createdHour = hourCreateBill || ""
      let createdDay = dayCreateBill || ""
      let userCreate = nameSale;
      let userSell = nameSale;
      let listSell =listProduct;
      let countNumSell=0;
      listProduct.forEach((product)=>{
        countNumSell=product.countNum + countNumSell
      })
      let totalMoneySell=totalMoney || 0;
      let totalSaleOffMoneySell=totalSaleOffMoney || 0;
      let totalBuyerPaidNeed=totalPaidMoney || 0;
      let totalBuyerPaid=totalMoneyBuyerPaid || 0;
      let totalExcessPaid=totalExcessMoney ||0;
      let noteSell =note || "";
      let bill={buyerId,buyerCode,nameBuyer,phone,createdHour,createdDay,userCreate,userSell,listSell,countNumSell,totalMoneySell,totalSaleOffMoneySell,totalBuyerPaidNeed,totalBuyerPaid,totalExcessPaid,noteSell}
      if (type === "save") {
          bill.status=false;
          let res = await createBillSell(bill);
          if (res.status === 200) {
            return notifyScreen("success",res.status,res.data.message)
          }
      }
      if (type==="success") {
        bill.status=true;
        let res = await createBillSell(bill);
          if (res.status === 200) {
            return notifyScreen("success",res.status,res.data.message)
          }
      }
    } catch (error) {
      notifyScreen("error", "500", "Lỗi không xác định");
    }
    
  }
  useEffect(() => {
    __getTime();
    setListProduct(listSell);
    __initTotalMoney();
  }, [listProduct,totalMoney,listSell.length,totalSaleOffMoney,buyer]);

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
                        <span>{i+1}</span>
                        <span onClick={()=>removeProduct(product._id)} className="action-remove">
                          <DeleteOutlined />
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
                      <span>{product.moneyOut}</span>
                      <span style={{ marginTop: "-5px" }}>
                        <InputNumber
                          onChange={(value) =>
                            onChangeValueSaleOffProduct(value, product._id)
                          }
                          defaultValue={0}
                          style={
                            i % 2 != 0
                              ? {
                                  border: "none",
                                  borderBottom: "1px solid #d9d9d9",
                                  fontSize: "13px",
                                  backgroundColor: "#f9f9f9",
                                  boxShadow: "none",
                                }
                              : {
                                  border: "none",
                                  borderBottom: "1px solid #d9d9d9",
                                  fontSize: "13px",
                                  boxShadow: "none",
                                }
                          }
                        />
                      </span>
                      <span
                        style={{
                          fontWeight: "700",
                          color: "rgba(0, 0, 0, 0.85)",
                        }}
                      >
                        {product.totalMoney}
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
          <Form >
            <div className="search-buyer-search">
              <Form.Item name="buyer">
                <SearchBuyer listBuyer={listBuyer} valueSelectBuyer={(info)=>handleSelectBuyer(info)} typeSearch="buyer"/>
              </Form.Item>
            </div>
            <div className="name-bill">
              <div>{keyBill}</div>
            </div>
            <div className="info-bill">
              <div className="total-money">
                <span>Tổng tiền hàng</span>
                <span style={{ fontSize: "14px" }}>{totalMoney}</span>
              </div>
              <div className="sale-money">
                <span>Giảm giá</span>
                <Input
                  bordered={false}
                  style={{
                    borderBottom: "1px solid #e1e1e1",
                    width: "30%",
                    padding: "0",
                    fontSize: "14px",
                  }}
                  defaultValue="0"
                  onChange={onChangeValueSaleOff}
                />
              </div>
              <div className="need-money">
                <span>Khách cần trả</span>
                <span style={{ fontSize: "16px", color: "#3d933c" }}>
                  {totalPaidMoney}
                </span>
              </div>
              <div className="paid-money">
                <span>Khách thanh toán</span>
                <Input
                  bordered={false}
                  style={{
                    borderBottom: "1px solid #e1e1e1",
                    width: "30%",
                    padding: "0",
                    fontSize: "14px",
                  }}
                  defaultValue="0"
                  onChange={onChangeValuePaidMoney}
                />
              </div>
              <div className="excess-money">
                <span>Tiền thừa trả khách</span>
                <span style={{ fontSize: "14px" }}>{totalExcessMoney}</span>
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
                  onChange={(e)=>setNote(e.target.value)}
                />
              </div>
            </div>
            <div className="btn-action">
              <Form.Item name="save">
                <Button
                  type="primary"
                  htmlType="button"
                  style={{
                    backgroundColor: "#56ad51",
                    width: "100%",
                    height: "66px",
                    textAlign: "center",
                  }}
                  onClick={()=>onFinish("save",listProduct)}
                >
                  <span style={{ fontSize: "18px", fontWeight: "600" }}>
                    Lưu (F9)
                  </span>
                </Button>
              </Form.Item>
              <Form.Item name="success">
                <Button
                  type="primary"
                  htmlType="button"
                  style={{
                    backgroundColor: "#56ad51",
                    width: "100%",
                    height: "66px",
                    textAlign: "center",
                  }}
                  onClick={()=>onFinish("success",listProduct)}
                >
                  <span style={{ fontSize: "18px", fontWeight: "600" }}>
                    Thanh toán (F10)
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
