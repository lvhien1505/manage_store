import { useState, useEffect } from "react";
import { Modal, Table, InputNumber, Input, Button } from "antd";
import {  StopOutlined,CheckSquareOutlined } from "@ant-design/icons";
import "../styles/ModalAdjust.scss";

const ModalAdjustDebt = ({ listBill, hideModal, handleHideModal }) => {
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

  useEffect(() => {
    __getTime();
  });

  return (
    <Modal
      centered
      title="Điều chỉnh"
      visible={hideModal}
      onCancel={handleHideModal}
      width={550}
      footer={null}
    >
      <h6>* Lưu ý : Khi điều chỉnh công nợ khách hàng, công nợ chi tiết của từng hóa đơn theo khách hàng sẽ không thay đổi. Vui lòng cân nhắc khi thực hiện chức năng này.</h6>
      <div className="main-adjust-modal">
        <div>
          <span>Nợ cần thu hiện tại</span>
          <span>10000</span>
        </div>
        <div>
          <span>Ngày điều chỉnh</span>
          <div className="time-action">
            <span>{dayCreateBill}</span>
            <span>{hourCreateBill}</span>
          </div>
        </div>
        <div>
          <span>Giá trị nợ điều chỉnh</span>
          <InputNumber className="input-money-debt" bordered={false}/>
        </div>
        <div>
          <span>Mô tả</span>
          <Input.TextArea className="input-money-note" bordered={false}/>
        </div>
      </div>

      <div className="bottom-adjust-modal">
        <Button icon={<CheckSquareOutlined />} type="primary">
          Cập nhật
        </Button>
        <Button icon={<StopOutlined />} type="primary">
          Bỏ qua
        </Button>
      </div>
    </Modal>
  );
};

export default ModalAdjustDebt;
