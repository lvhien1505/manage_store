import React from "react";
import { Modal, Form, Input, Button } from "antd";
import { updateUnit } from "../../../api/unit";
import { notifyScreen } from "../../../utils/notify";

const ModalUpdateUnit = ({ hideModal, handleHideModal, unitEdit }) => {
  const handlerFormUpdate = async (values) => {
    try {
      let name = values.name || "";
      let unit = { name };
      let res = await updateUnit(unitEdit._id, unit);
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
      title="Sửa đơn vị"
      footer={null}
    >
      <Form onFinish={handlerFormUpdate}>
        <span>Tên đơn vị</span>
        <Form.Item name="name" initialValue={unitEdit.name}>
          <Input placeholder="Nhập tên đơn vị" />
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

export default ModalUpdateUnit;
