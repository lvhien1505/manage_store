import React from "react";
import { Modal, Form, Input, Button } from "antd";
import { StopOutlined, ToolOutlined } from "@ant-design/icons";
import { updateCategory } from "../../../api/category";
import { notifyScreen } from "../../../utils/notify";

const ModalUpdateCategoryProduct = ({
  hideModal,
  handleHideModal,
  categoryEdit,
}) => {
  const handlerFormUpdate = async (values) => {
    try {
      let name = values.name;
      if (name) {
        let categoryProduct = { name };
        let res = await updateCategory(categoryEdit._id, categoryProduct);
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
      title="Cập nhật nhóm hàng"
      footer={null}
    >
      <Form onFinish={handlerFormUpdate} className="form-update-category">
        <div className="wrapper-input-form">
          <div>
            <span style={{ width: "120px" }}>Tên nhóm hàng</span>
            <Form.Item
              name="name"
              rules={[
                { required: true, message: "Vui lòng nhập tên nhóm hàng !" },
              ]}
              initialValue={categoryEdit.name}
            >
              <Input placeholder="Nhập tên nhóm hàng" bordered={false} />
            </Form.Item>
          </div>
        </div>
        <div className="btn-action-modal-update">
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              icon={<ToolOutlined />}
              className="btn-submit-form-update"
            >
              Cập nhật
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              onClick={handleHideModal}
              icon={<StopOutlined />}
              className="btn-close-form-update"
            >
              Thoát
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalUpdateCategoryProduct;
