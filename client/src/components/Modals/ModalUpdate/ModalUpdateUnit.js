import React,{useState} from 'react';
import { Modal, Form, Input, Button } from "antd";
import {updateUnit,getUnitWithId} from '../../../api/unit';
import {notifyScreen} from '../../../utils/notify'

const ModalUpdateUnit = ({idUnit,hideModal,handleHideModal}) => {
    const [nameUnit,setNameUnit]=useState("");

    const __getUnitWithId=async (id)=>{
        try {
            let res = await getUnitWithId(id);
            if (res.status === 200) {
              return setNameUnit(res.data.name)
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
    }

    const handlerFormUpdate = async (values) => {
        try {
          let name = values.name || "";
          let unit = { name };
          let res = await updateUnit(idUnit,unit);
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

      useState(()=>{
        __getUnitWithId(idUnit);
      },[nameUnit])

      return (
        <Modal
          visible={hideModal}
          onCancel={handleHideModal}
          title="Sửa đơn vị"
          footer={null}
        >
          <Form onFinish={handlerFormUpdate}>
            <span>Tên đơn vị ({nameUnit})</span>
            <Form.Item name="name" initialValue={nameUnit ? nameUnit :null}>
              <Input placeholder="Nhập tên đơn vị"/>
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
}

export default ModalUpdateUnit
