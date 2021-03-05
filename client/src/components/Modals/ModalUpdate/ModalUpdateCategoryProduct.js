import React,{useState} from 'react';
import { Modal, Form, Input, Button } from "antd";
import {updateCategory,getCategoryWithId} from '../../../api/category';
import {notifyScreen} from '../../../utils/notify'

const ModalUpdateCategoryProduct = ({idCategory,hideModal,handleHideModal}) => {
    const [nameCategory,setNameCategory]=useState("");

    const __getCategoryWithId=async (id)=>{
        try {
            let res = await getCategoryWithId(id);
            if (res.status === 200) {
              return setNameCategory(res.data.name)
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
          let categoryProduct = { name };
          let res = await updateCategory(idCategory,categoryProduct);
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
        __getCategoryWithId(idCategory);
      },[nameCategory])

      return (
        <Modal
          visible={hideModal}
          onCancel={handleHideModal}
          title="Sửa nhóm hàng"
          footer={null}
        >
          <Form onFinish={handlerFormUpdate}>
            <span>Tên nhóm hàng ({nameCategory})</span>
            <Form.Item name="name" initialValue={nameCategory ? nameCategory :null}>
              <Input placeholder="Nhập tên nhóm hàng"/>
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

export default ModalUpdateCategoryProduct
