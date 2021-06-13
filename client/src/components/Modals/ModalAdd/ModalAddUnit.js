import React from "react";
import { Modal, Form, Input, Button } from "antd";
import { StopOutlined, PlusOutlined } from "@ant-design/icons";
import { createUnit } from "../../../api/unit";
import { notifyScreen } from "../../../utils/notify";
import "../styles/ModalAddAndUpdate.scss";

const ModalAddUnit = ({ hideModal, handleHideModal }) => {
  const handlerFormAdd = async (values) => {
    try {
      let name = values.name;
      if (name) {
        let unit = { name };
        let res = await createUnit(unit);
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
      title="Thêm đơn vị"
      footer={null}
    >
      <Form onFinish={handlerFormAdd} className="form-add-unit">
        <div className="wrapper-input-form">
          <div>
            <span style={{ width: "100px" }}>Tên đơn vị</span>
            <Form.Item
              name="name"
              rules={[
                { required: true, message: "Vui lòng nhập tên đơn vị !" },
              ]}
            >
              <Input placeholder="Nhập tên đơn vị" bordered={false} />
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

export default ModalAddUnit;
