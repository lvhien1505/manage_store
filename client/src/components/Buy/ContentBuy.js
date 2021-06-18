import React, { useState, useEffect } from "react";
import { Input, Form, Button, List, InputNumber } from "antd";
import { UserOutlined, DeleteOutlined } from "@ant-design/icons";
import SearchPartner from "../Search/Search";
import {createBillBuy} from '../../api/billBuy'
import {notifyScreen} from '../../utils/notify'
import "./styles/ContentBuy.scss";

const ContentBuy = ({ listPartner, listBuy,removeProduct,nameSale,countNumProduct }) => {
  const [totalSaleOffMoney, setTotalSaleOffMoney] = useState(0);
  const [totalPaidMoney, setTotalPaidMoney] = useState(0);
  const [totalDebt, setTotalDebt] = useState(0);
  const [totalMoney, setTotalMoney] = useState(0);
  const [totalMoneyPaidPartner, setTotalMoneyPaidPartner] = useState(0);
  const [listProduct, setListProduct] = useState([]);
  const [partner, setPartner] = useState({});
  const [dayCreateBill, setDayCreateBill] = useState("");
  const [hourCreateBill, setHourCreateBill] = useState("");
  const [note, setNote] = useState("");

  const __initTotalMoney=()=>{
    let totalMoneyInit=0;
        listProduct.forEach((product)=>{
        totalMoneyInit += product.totalMoney;
    })
    setTotalPaidMoney(totalMoneyInit - totalSaleOffMoney)
    setTotalDebt(totalMoneyPaidPartner - (totalMoneyInit-totalSaleOffMoney));
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
    setTotalMoneyPaidPartner(value)
    return setTotalDebt(newExcessMoney);
  }

  const handleSelectPartner =(info)=>{
      return setPartner(info);
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
      let partnerId=partner._id ? partner._id : ""
      let partnerCode=partner.code ? partner.code : ""
      let namePartner =partner.name ? partner.name : ""
      let phone = partner.phone ? partner.phone: ""
      let createdHour = hourCreateBill || ""
      let createdDay = dayCreateBill || ""
      let userCreate = nameSale;
      let userSell = nameSale;
      let listBuy =listProduct;
      let countNumBuy=0;
      listProduct.forEach((product)=>{
        countNumBuy=product.countNum + countNumBuy
      })
      let totalMoneyBuy=totalMoney || 0;
      let totalSaleOffMoneyBuy=totalSaleOffMoney || 0;
      let totalPaidNeedPartner=totalPaidMoney || 0;
      let totalMoneyPaid=totalMoneyPaidPartner || 0;
      let totalDebtMath=totalDebt ||0;
      let noteBuy =note || "";
      let bill={partnerId,partnerCode,namePartner,phone,createdHour,createdDay,userCreate,userSell,listBuy,countNumBuy,totalMoneyBuy,totalSaleOffMoneyBuy,totalPaidNeedPartner,totalMoneyPaid,totalDebtMath,noteBuy}
      if (type==="success") {
        bill.status=true;
        let res = await createBillBuy(bill);
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
    setListProduct(listBuy);
    __initTotalMoney();
  }, [listProduct,totalMoney,listBuy.length,totalSaleOffMoney,partner,countNumProduct]);

  return (
    <div className="content-tab-wrapper-buy">
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
                <SearchPartner listPartner={listPartner} valueSelectPartner={(info)=>handleSelectPartner(info)} typeSearch="partner"/>
              </Form.Item>
            </div>
            <div className="name-bill">
              <div>Nhập hàng</div>
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
                <span>Cần trả nhà cung cấp</span>
                <span style={{ fontSize: "16px", color: "#3d933c" }}>
                  {totalPaidMoney}
                </span>
              </div>
              <div className="paid-money">
                <span>Tiền trả nhà cung cấp</span>
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
                <span>Công nợ</span>
                <span style={{ fontSize: "14px" }}>{totalDebt}</span>
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
              <Form.Item name="success">
                <Button
                  type="primary"
                  htmlType="button"
                  onClick={()=>onFinish("success",listProduct)}
                >
                  <span style={{ fontSize: "18px", fontWeight: "600" }}>
                    Hoàn Thành
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

export default ContentBuy;
