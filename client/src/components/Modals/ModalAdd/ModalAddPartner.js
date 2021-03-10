import React from "react";
import { Modal, Form, Input, Button } from "antd";
import {createPartner} from '../../../api/partner';
import {notifyScreen} from '../../../utils/notify'

const ModalAddPartner = ({ hideModal, handleHideModal }) => {
  const handlerFormAdd=async (values)=>{
    try {
        let code = values.code || "";
        let name = values.name || "";
        let nameCompany = values.nameCompany || "";
        let phone = values.phone || "";
        let email = values.email || "";
        let address = values.address || "";
        let note = values.note || "";
        let partner = {code,name,nameCompany,phone,email,address,note}
        let res = await createPartner(partner);
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
  }

  return (
    <Modal
      visible={hideModal}
      onCancel={handleHideModal}
      title="Thêm nhà cung cấp"
      footer={null}
    >
      <Form onFinish={handlerFormAdd}>
        <span>Mã NCC</span>
        <Form.Item
          name="code"
          rules={[{ required: true, message: "Vui lòng nhập mã nhà cung cấp!" }]}
        >
          <Input placeholder="Nhập mã - VD : 0001" required />
        </Form.Item>
        <span>Tên</span>
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên" }]}
        >
          <Input placeholder="Nhập tên" />
        </Form.Item>
        <span>Công ty</span>
        <Form.Item
          name="nameCompany"
          rules={[{ required: true, message: "Vui lòng nhập tên công ty!" }]}
        >
          <Input placeholder="Nhập công ty" />
        </Form.Item>
        <span>Số điện thoại</span>
        <Form.Item 
           name="phone"
        >
          <Input placeholder="Nhập số điện thoại" />
        </Form.Item>
        <span>Email</span>
        <Form.Item
           name="email"
        >
          <Input placeholder="Nhập email" />
        </Form.Item>
        <span>Địa chỉ</span>
        <Form.Item
           name="address"
        >
          <Input placeholder="Nhập địa chỉ" />
        </Form.Item>
        <span>Ghi chú</span>
        <Form.Item
           name="note"
        >
          <Input.TextArea placeholder="Nhập ghi chú" />
        </Form.Item>
        <div style={{display:"flex",justifyContent:"flex-end"}}>
          <Form.Item style={{marginRight:"10px"}}>
            <Button type="primary" danger onClick={handleHideModal}>
              Thoát
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Thêm</Button>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalAddPartner;
