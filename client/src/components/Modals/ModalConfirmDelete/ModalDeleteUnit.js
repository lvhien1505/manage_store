import React from "react";
import { Modal, Form, Input, Button } from "antd";
import {removeUnit} from '../../../api/unit';
import {notifyScreen} from '../../../utils/notify'

const ModalDeleteUnit = ({ idUnit,hideModal, handleHideModal }) => {
  const handlerFormDelete = async (id) => {
    try {
      let res = await removeUnit(id);
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
      title="Xóa đơn vị"
      footer={null}
    >
      <Form onFinish={()=>handlerFormDelete(idUnit)}>  
      <div style={{width:"50%",margin:"0 auto",color:"red",marginBottom:"10px"}}>Bạn có muốn xóa đơn vị không ?</div> 
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Form.Item style={{ marginRight: "5px" }}>
            <Button type="primary" onClick={handleHideModal} style={{width:"70px"}}>
              Không
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" danger style={{width:"70px"}}>
              Có
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalDeleteUnit;
