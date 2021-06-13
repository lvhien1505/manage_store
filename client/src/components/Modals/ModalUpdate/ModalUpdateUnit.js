import React from "react";
import { Modal, Form, Input, Button } from "antd";
import { StopOutlined, ToolOutlined } from "@ant-design/icons";
import { updateUnit } from "../../../api/unit";
import { notifyScreen } from "../../../utils/notify";

const ModalUpdateUnit = ({ hideModal, handleHideModal, unitEdit }) => {
  const handlerFormUpdate = async (values) => {
    try {
      let name = values.name;
      if (name) {
        let unit = { name };
        let res = await updateUnit(unitEdit._id, unit);
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
      title="Sửa đơn vị"
      footer={null}
    >
      <Form onFinish={handlerFormUpdate} className="form-update-unit">
        <div className="wrapper-input-form">
          <div>
            <span style={{ width: "100px" }}>Tên đơn vị</span>
            <Form.Item
              name="name"
              rules={[
                { required: true, message: "Vui lòng nhập tên đơn vị !" },
              ]}
              initialValue={unitEdit.name}
            >
              <Input placeholder="Nhập tên đơn vị" bordered={false} />
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

export default ModalUpdateUnit;
