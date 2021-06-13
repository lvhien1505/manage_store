import { useState, useEffect } from "react";
import { Modal, Table, InputNumber, Input, Button } from "antd";
import {CreditCardOutlined,StopOutlined } from "@ant-design/icons";
import "../styles/ModalAdjust.scss";

const ModalPaidDebt = ({ listBill, hideModal, handleHideModal }) => {
  const [dayCreateBill, setDayCreateBill] = useState("");
  const [hourCreateBill, setHourCreateBill] = useState("");


  const __getTime = () => {
    let date = new Date();
    let hour = date.getHours() + " : " + date.getMinutes();
    let day =
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    setHourCreateBill(hour);
    return setDayCreateBill(day);
  };

  const columns = [
    {
      title: "Mã hóa đơn",
      dataIndex: "code",
      key: "code",
      render: (text) => {  
          return "HD0000" + text
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
    },
    {
      title: "Đã thu trước",
      key: "debtRedundancy",
      dataIndex: "debtRedundancy",
    },
    {
        title: "Còn cần thu",
        key: "debtRedundancy",
        dataIndex: "debtRedundancy",
    },
    {
        title: "Tiền thu",
        key: "moneypaid",
        render:()=>{
            return <InputNumber/>
        }
      }
     
  ];

  useEffect(()=>{
      __getTime()
  })

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
            <span>10000</span>
          </div>

          <div>
            <span>Thu từ khách</span>
            <InputNumber className="input-money" bordered={false} />
          </div>

          <div>
            <span>Nợ sau</span>
            <span>10000</span>
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
          <Table dataSource={[]} columns={columns}/>
          <div className="total-money">
              <div>
                  <span>Tổng thanh toán hóa đơn</span>
                  <span>0</span>
              </div>
              <div>
                  <span>Cộng vào tài khoản khách</span>
                  <span>0</span>
              </div>
          </div>
      </div>
      <div className="bottom-paid-modal">
          <Button icon={<CreditCardOutlined/>} type="primary">Tạo phiếu thu</Button>
          <Button icon={<CreditCardOutlined/>} type="primary">Tạo phiếu thu và in</Button>
          <Button icon={<StopOutlined />} type="primary">Bỏ qua</Button>
      </div>
    </Modal>
  );
};

export default ModalPaidDebt;
