import React from "react";
import { Modal, Form, Input, Button } from "antd";
import { StopOutlined, PlusOutlined } from "@ant-design/icons";
import { createCategory } from "../../../api/category";
import { notifyScreen } from "../../../utils/notify";

const ModalAddCategoryProduct = ({ hideModal, handleHideModal }) => {
  const handlerFormAdd = async (values) => {
    try {
      let name = values.name;
      if (name) {
        let categoryProduct = { name };
        let res = await createCategory(categoryProduct);
        if (res.status === 200) {
          notifyScreen("success", res.data.statusCode, res.data.message);
          return handleHideModal();
        }
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
      <Form onFinish={handlerFormAdd} className="form-add-category">
        <div className="wrapper-input-form">
          <div>
            <span style={{ width: "120px" }}>Tên nhóm hàng</span>
            <Form.Item
              name="name"
              rules={[
                { required: true, message: "Vui lòng nhập tên nhóm hàng !" },
              ]}
            >
              <Input placeholder="Nhập tên nhóm hàng" bordered={false} />
            </Form.Item>
          </div>
        </div>
        <div className="btn-action-modal-add">
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              icon={<PlusOutlined />}
              className="btn-submit-form-add"
            >
              Thêm
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              onClick={handleHideModal}
              icon={<StopOutlined />}
              className="btn-close-form-add"
            >
              Thoát
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalAddCategoryProduct;
