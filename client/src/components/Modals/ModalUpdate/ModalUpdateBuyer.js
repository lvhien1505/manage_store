import React from "react";
import { Modal, Form, Input, Select, InputNumber, Button } from "antd";
import { updateBuyer } from "../../../api/buyer";
import { notifyScreen } from "../../../utils/notify";

const ModalUpdateBuyer = ({ hideModal, handleHideModal, buyerEdit }) => {
  const handlerFormUpdate = async (values) => {
      
    try {
        let name = values.name || "";
        let age = values.age || "";
        let sex = values.sex || "";
        let phone = values.phone || "";
        let address = values.address || "";
        let note = values.note || "";
        let buyer = {name,phone,address,note,sex,age}
        let res = await updateBuyer(buyerEdit._id,buyer);
        if (res.status === 200) {
          notifyScreen("success", res.data.statusCode, res.data.message);
          return handleHideModal();
        }
      } catch (error) {
        if (error.response) {
          if (error.response.data) {
            notifyScreen("error",error.response.data.statusCode,error.response.data.message)
          }
        }else{
          notifyScreen("error","500","Lỗi không xác định")
        }
    }
  };

  return (
    <Modal
      visible={hideModal}
      onCancel={handleHideModal}
      title="Sửa khách hàng"
      footer={null}
    >
      <Form onFinish={handlerFormUpdate}>
        <span>Tên</span>
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập mã KH!" }]}
          initialValue={buyerEdit.name}
        >
          <Input placeholder="Nhập tên" />
        </Form.Item>
        <span>Tuổi</span>
        <Form.Item name="age" initialValue={buyerEdit.age}>
          <InputNumber placeholder="Nhập tuổi" />
        </Form.Item>
        <span>Giới tính</span>
        <Form.Item
          name="sex"
          rules={[{ required: true, message: "Vui lòng chọn giới tính!" }]}
          initialValue={buyerEdit.sex}
        >
          <Select placeholder="--Lựa chọn--">
            <Select.Option key="1" value="male">
              Nam
            </Select.Option>
            <Select.Option key="2" value="female">
              Nữ
            </Select.Option>
          </Select>
        </Form.Item>
        <span>Số điện thoại</span>
        <Form.Item name="phone" initialValue={buyerEdit.phone}>
          <Input placeholder="Nhập số điện thoại" />
        </Form.Item>
        <span>Địa chỉ</span>
        <Form.Item name="address" initialValue={buyerEdit.address}>
          <Input placeholder="Nhập địa chỉ" />
        </Form.Item>
        <span>Ghi chú</span>
        <Form.Item name="note" initialValue={buyerEdit.note}>
          <Input.TextArea placeholder="Nhập ghi chú" />
        </Form.Item>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Form.Item style={{ marginRight: "10px" }}>
            <Button type="primary" danger onClick={handleHideModal}>
              Thoát
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Cập nhật
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalUpdateBuyer;
