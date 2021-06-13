import React from "react";
import { Modal, Form, Input, Button } from "antd";
import { StopOutlined, PlusOutlined } from "@ant-design/icons";
import CurrencyFormat from "react-currency-format";
import { createPartner } from "../../../api/partner";
import { notifyScreen } from "../../../utils/notify";
import "../styles/ModalAddAndUpdate.scss";

const ModalAddPartner = ({ hideModal, handleHideModal }) => {
  const handlerFormAdd = async (values) => {
    try {
      let code = values.code;
      let name = values.name;
      let nameCompany = values.nameCompany;
      let phone = values.phone;
      let email = values.email;
      let address = values.address;
      let note = values.note || "";
      if ((code, name, nameCompany, phone, email, address)) {
        let partner = { code, name, nameCompany, phone, email, address, note };
        let res = await createPartner(partner);
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
      title="Thêm NCC"
      footer={null}
      width={800}
    >
      <Form onFinish={handlerFormAdd} className="form-add-partner">
        <div className="wrapper-input-form">
          <div>
            <div>
              <span style={{ width: "100px" }}>Mã NCC</span>
              <Form.Item
                name="code"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mã nhà cung cấp !",
                  },
                ]}
              >
                <Input placeholder="Nhập mã NCC - VD : 0001" bordered={false} />
              </Form.Item>
            </div>
            <div>
              <span style={{ width: "100px" }}>Tên NCC</span>
              <Form.Item
                name="name"
                rules={[{ required: true, message: "Vui lòng nhập tên NCC !" }]}
              >
                <Input placeholder="Nhập tên NCC" bordered={false} />
              </Form.Item>
            </div>
            <div>
              <span style={{ width: "100px" }}>Công ty</span>
              <Form.Item
                name="nameCompany"
                rules={[
                  { required: true, message: "Vui lòng nhập tên công ty!" },
                ]}
              >
                <Input placeholder="Nhập tên công ty" bordered={false} />
              </Form.Item>
            </div>
          </div>
          <div>
            <div>
              <span style={{ width: "100px" }}>Số ĐT</span>
              <Form.Item
                name="phone"
                rules={[{ required: true, message: "Vui lòng nhập SĐT !" }]}
              >
                <CurrencyFormat
                  format="####-###-##########"
                  placeholder="Nhập SĐT"
                />
              </Form.Item>
            </div>
            <div>
              <span style={{ width: "100px" }}>Email</span>
              <Form.Item
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "Không đúng định dạng email !",
                  },
                  {
                    required: true,
                    message: "Vui lòng nhập email!",
                  },
                ]}
              >
                <Input placeholder="Nhập email" bordered={false} />
              </Form.Item>
            </div>
            <div>
              <span style={{ width: "100px" }}>Địa chỉ</span>
              <Form.Item
                name="address"
                rules={[{ required: true, message: "Vui lòng nhập địa chỉ !" }]}
              >
                <Input placeholder="Nhập địa chỉ" bordered={false} />
              </Form.Item>
            </div>
          </div>
        </div>
        <div className="note">
          <span style={{ width: "100px" }}>Ghi chú</span>
          <Form.Item name="note">
            <Input.TextArea
              placeholder="Nhập ghi chú"
              autoSize={{ minRows: 3 }}
            />
          </Form.Item>
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
              Hủy bỏ
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalAddPartner;
