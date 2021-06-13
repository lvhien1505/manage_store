import React from "react";
import { Modal, Form, Input, Select, Button, InputNumber } from "antd";
import { StopOutlined, PlusOutlined } from "@ant-design/icons";
import CurrencyFormat from 'react-currency-format'
import { createBuyer } from "../../../api/buyer";
import { notifyScreen } from "../../../utils/notify";
import "../styles/ModalAddAndUpdate.scss"

const ModalAddBuyer = ({ hideModal, handleHideModal }) => {
  const handlerFormAdd = async (values) => {
    try {
      let code = values.code || "";
      let name = values.name || "";
      let age = values.age || "";
      let sex = values.sex || "";
      let phone = values.phone || "";
      let address = values.address || "";
      let note = values.note || "";
      let buyer = { code, name, phone, address, note, sex, age };
      let res = await createBuyer(buyer);
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

  const checkDayBirth = (_, value) => {
    if (value) {
      let values = value.split("/")
      if (values.length<3) {
       return Promise.reject(new Error("Vui lòng nhập đúng định dạng DD/MM/YYYY !"));
      }else{
        if (parseInt(values[0])> 31) {
          return Promise.reject(new Error("Ngày sinh không đúng !"));
        }else{
          if (parseInt(values[1])> 12) {
            return Promise.reject(new Error("Tháng sinh không đúng !"));
          }else{
            if (parseInt(values[2]) > 2020) {
              return Promise.reject(new Error("Năm sinh không đúng !"));
            }else{
              return Promise.resolve();
            }
          }
        }
      }
     
    }

    return Promise.reject(new Error("Vui lòng nhập ngày sinh !"));
  };

  return (
    <Modal
      visible={hideModal}
      onCancel={handleHideModal}
      title="Thêm khách hàng"
      footer={null}
      width={800}
    >
      <Form onFinish={handlerFormAdd} className="form-add-buyer">
        <div className="wrapper-input-form">
          <div>
            <div>
              <span style={{width:"100px"}}>Mã KH</span>
              <Form.Item
                name="code"
                rules={[{ required: true, message: "Vui lòng nhập mã KH!" }]}
              >
                <Input placeholder="Nhập mã KH - VD : 0001" bordered={false}/>
              </Form.Item>
            </div>
            <div >
              <span style={{width:"100px"}}>Tên KH</span>
              <Form.Item
                name="name"
                rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
              >
                <Input placeholder="Nhập tên KH" bordered={false}/>
              </Form.Item>
            </div>
            <div>
              <span style={{width:"100px"}}>Ngày sinh</span>
              <Form.Item name="age" rules={[{ validator: checkDayBirth }]}>
                <CurrencyFormat format="##/##/####" placeholder="DD/MM/YYYY" mask={['D','D','M', 'M', 'Y', 'Y','Y','Y']} />
              </Form.Item>
            </div>
          </div>
          <div>
            <div>
              <span style={{width:"100px"}}>Giới tính</span>
              <Form.Item
                name="sex"
                rules={[
                  { required: true, message: "Vui lòng chọn giới tính!" },
                ]}
              >
                <Select placeholder="--Lựa chọn--" bordered={false}>
                  <Select.Option key="1" value="male">
                    Nam
                  </Select.Option>
                  <Select.Option key="2" value="female">
                    Nữ
                  </Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div>
              <span style={{width:"100px"}}>Số ĐT</span>
              <Form.Item name="phone" rules={[{ required: true, message: "Vui lòng nhập SĐT!" }]}>
                <CurrencyFormat format="####-###-##########" placeholder="Nhập SĐT"/>
              </Form.Item>
            </div>
            <div>
              <span style={{width:"100px"}}>Địa chỉ</span>
              <Form.Item name="address" rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}>
                <Input placeholder="Nhập địa chỉ" bordered={false}/>
              </Form.Item>
            </div>
          </div>
         
        </div>
        <div className="note">
            <span style={{width:"100px"}}>Ghi chú</span>
            <Form.Item name="note">
              <Input.TextArea placeholder="Nhập ghi chú" autoSize={{ minRows: 3}}/>
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

export default ModalAddBuyer;
