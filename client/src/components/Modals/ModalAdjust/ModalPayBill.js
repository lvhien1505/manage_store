import { useState, useEffect } from "react";
import { Modal, Table, InputNumber, Input, Button } from "antd";
import {CreditCardOutlined,StopOutlined } from "@ant-design/icons";
import CurrencyFormat from "react-currency-format";
import "../styles/ModalAdjust.scss";

const ModalPaidDebt = ({ listBill, hideModal, handleHideModal,buyer }) => {
  const [dayCreateBill, setDayCreateBill] = useState("");
  const [hourCreateBill, setHourCreateBill] = useState("");
  const [valueCollectDebt,setValueCollectDebt] =useState(0);
  const [valueCollectDebtBill,setValueCollectDebtBill] =useState(0);
  const [valueTotalCollectDebtBill,setValueTotalCollectDebtBill] =useState(0);
  const [valueAfterCollectDebt,setValueAfterCollectDebt] =useState(buyer.debt)

  const __getTime = () => {
    let date = new Date();
    let hour = date.getHours() + " : " + date.getMinutes();
    let day =
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    setHourCreateBill(hour);
    return setDayCreateBill(day);
  };

  const handleChangeValueCollectDebt = (values)=>{
    let value = parseInt(values.value)
    if (isNaN(value)) {
      setValueCollectDebt(0);
      setValueAfterCollectDebt(buyer.debt)
      return
    }else{
      setValueCollectDebt(value);
      setValueAfterCollectDebt(buyer.debt - value)
      return
    }
   
   
  }

  const handleChangeValueCollectDebtBill = (values)=>{
    let value = parseInt(values.value)
    if (isNaN(value)) {
      setValueTotalCollectDebtBill(valueTotalCollectDebtBill + 0);
      return
    }else{
      setValueTotalCollectDebtBill(valueTotalCollectDebtBill + value);
      return
    }
   
   
  }

  const handleCollectDebt = (values)=>{
    if (valueCollectDebt > 0 && valueCollectDebtBill > 0) {
      
    }else{
      alert("error")
    }
   
  }

  const columns = [
    {
      title: "Mã hóa đơn",
      dataIndex: "code",
      key: "code",
      render: (text) => {  
          return "HD00" + text
      }
    },
    {
      title: "Thời gian",
      dataIndex: "createdDay",
      key: "createdDay",
    },
    {
      title: "Giờ",
      dataIndex: "createdHour",
      key: "createdHour",
    },
    {
      title: "Giá trị hóa đơn",
      key: "totalBuyerPaidNeed",
      dataIndex: "totalBuyerPaidNeed",
      render: (text) => (
        <CurrencyFormat
          value={text}
          displayType={"text"}
          thousandSeparator={true}
          renderText={(value) => <span>{value}</span>}
        />
      ),
      align:"right",
    },
    {
      title: "Đã thu trước",
      key: "totalBuyerPaid",
      dataIndex: "totalBuyerPaid",
      render: (text) => (
        <CurrencyFormat
          value={text}
          displayType={"text"}
          thousandSeparator={true}
          renderText={(value) => <span>{value}</span>}
        />
      ),
      align:"right"
    },
    {
        title: "Còn cần thu",
        key: "debtRedundancy",
        render: (obj) => (
          <CurrencyFormat
            value={obj.totalBuyerPaidNeed - obj.totalBuyerPaid}
            displayType={"text"}
            thousandSeparator={true}
            renderText={(value) => <span>{value}</span>}
          />
        ),
        align:"right"
    },
    {
        title: "Tiền thu",
        key: "moneyPayBill",
        render:(obj)=>{
          let value = obj.totalBuyerPaidNeed - obj.totalBuyerPaid;
          if (value > valueCollectDebt) {
            value=valueCollectDebt
          }
            return <CurrencyFormat thousandSeparator={true} value={value} className="input-money" onValueChange={handleChangeValueCollectDebtBill}/>
        },
        align:"right"
      }
     
  ];

  useEffect(()=>{
      __getTime();
  },[])

  return (
    <Modal
      centered
      title="Thanh toán"
      visible={hideModal}
      onCancel={handleHideModal}
      width={1000}
      footer={null}
    >
      <div className="top-paid-modal">
        <div>
          <div>
            <span>Nợ hiện tại</span>
            <CurrencyFormat value={buyer.debt} displayType={'text'} thousandSeparator={true}  renderText={value => <span>{value}</span>} />
          </div>

          <div>
            <span>Thu từ khách</span>
            <CurrencyFormat thousandSeparator={true}  className="input-money" onValueChange={handleChangeValueCollectDebt}/>
          </div>

          <div>
            <span>Nợ sau</span>
            <CurrencyFormat value={valueAfterCollectDebt} displayType={'text'} thousandSeparator={true}  renderText={value => <span>{value}</span>} />
          </div>
        </div>
        <div>
          <span>Thời gian</span>
          <div>
            <span>{dayCreateBill}</span>
            <span>{hourCreateBill}</span>
          </div>
        </div>
        <div>
           <Input.TextArea placeholder="Ghi chú"/>
        </div>
      </div>
      <div className="middle-paid-modal">
          <Table dataSource={listBill} columns={columns} pagination={{position:["bottomLeft"]}}/>
          <div className="total-money">
              <div>
                  <span>Tổng thanh toán hóa đơn</span>
                  <CurrencyFormat value={valueTotalCollectDebtBill} displayType={'text'} thousandSeparator={true}  renderText={value => <span>{value}</span>} />
              </div>
              <div>
                  <span>Cộng vào tài khoản khách</span>
                  <span>0</span>
              </div>
          </div>
      </div>
      <div className="bottom-paid-modal">
          <Button icon={<CreditCardOutlined/>} type="primary" onClick={handleCollectDebt}>Tạo phiếu thu</Button>
          <Button icon={<CreditCardOutlined/>} type="primary" onClick={handleCollectDebt}>Tạo phiếu thu và in</Button>
          <Button icon={<StopOutlined />} type="primary">Bỏ qua</Button>
      </div>
    </Modal>
  );
};

export default ModalPaidDebt;
