import React from "react";
import { Modal, Form, Input, Button } from "antd";
import {removeProduct} from '../../../api/product';
import {notifyScreen} from '../../../utils/notify'

const ModalDeleteProduct = ({ idProduct,hideModal, handleHideModal }) => {
  const handlerFormDelete = async (id) => {
    try {
      let res = await removeProduct(id);
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
      title="Xóa hàng hóa"
      footer={null}
    >
      <Form onFinish={()=>handlerFormDelete(idProduct)}>  
      <div style={{width:"50%",margin:"0 auto",color:"red",marginBottom:"10px"}}>Bạn có muốn xóa hàng không ?</div> 
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

export default ModalDeleteProduct;
