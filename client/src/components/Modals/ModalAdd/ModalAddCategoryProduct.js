import React from "react";
import { Modal, Form, Input, Button } from "antd";
import {createCategory} from '../../../api/category';
import {notifyScreen} from '../../../utils/notify'

const ModalAddCategoryProduct = ({ hideModal, handleHideModal }) => {
  const handlerFormAdd = async (values) => {
    try {
      let name = values.name || "";
      let categoryProduct = { name };
      let res = await createCategory(categoryProduct);
      if (res.status === 200) {
        notifyScreen("success", res.data.statusCode, res.data.message);
        return handleHideModal();
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          notifyScreen(
            "error",
            error.response.data.statusCode,
            error.response.data.message
          );
        }
      } else {
        notifyScreen("error", "500", "Lỗi không xác định");
      }
    }
  };
  return (
    <Modal
      visible={hideModal}
      onCancel={handleHideModal}
      title="Thêm nhóm hàng"
      footer={null}
    >
      <Form onFinish={handlerFormAdd}>
        <span>Tên nhóm hàng</span>
        <Form.Item name="name">
          <Input placeholder="Nhập tên nhóm hàng" />
        </Form.Item>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Form.Item style={{ marginRight: "10px" }}>
            <Button type="primary" danger onClick={handleHideModal}>
              Thoát
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Thêm
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalAddCategoryProduct;
