import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, InputNumber, Upload, Button } from "antd";
import ImgCrop from "antd-img-crop";
import { getListCategory } from "../../../api/category";
import { getListUnit } from "../../../api/unit";
import {createProduct} from '../../../api/product'
import Cookies from "js-cookie";
import { notifyScreen } from "../../../utils/notify";

let token=Cookies.get("__t")
let headers={
  authorization:`Bearer ${token}`
}

const ModalAddMerchandise = ({ hideModal, handleHideModal }) => {
  const [listCategory, setListCategory] = useState([]);
  const [listUnit, setListUnit] = useState([]);
  const [fileList, setFileList] = useState([]);

  const __getListCategory = async () => {
    try {
      let res = await getListCategory();
      if (res.status === 200) {
        return setListCategory(res.data);
      }
    } catch (error) {
      notifyScreen("error", "500", "Lỗi không xác định");
    }
  };

  const __getListUnit = async () => {
    try {
      let res = await getListUnit();
      if (res.status === 200) {
        return setListUnit(res.data);
      }
    } catch (error) {
      notifyScreen("error", "500", "Lỗi không xác định");
    }
  };

  const handlerFormAdd=async (values)=>{
    try {
        let code = values.code || "";
        let name = values.name || "";
        let category = values.category || "";
        let unit = values.unit || "";
        let moneyIn = values.moneyIn || "";
        let moneyOut = values.moneyOut || "";
        let inventory = values.inventory || "";
        let merchandise = {code,name,category,unit,moneyIn,moneyOut,inventory}
        let res = await createProduct(merchandise);
        if (res.status === 200) {
          notifyScreen("success", res.data.statusCode, res.data.message);
          return handleHideModal();
        }
      } catch (error) {
        if (error.response) {
          if (error.response.data) {
            notifyScreen("error",error.response.data.statusCode,error.response.data.message)
          }
        }else{
          notifyScreen("error","500","Lỗi không xác định")
        }
    }
  }

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  useEffect(() => {
    __getListCategory();
    __getListUnit();
  }, []);
  return (
    <Modal
      visible={hideModal}
      onCancel={handleHideModal}
      title="Thêm hàng hóa"
      footer={null}
    >
      <Form onFinish={handlerFormAdd}>
        <span>Mã hàng</span>
        <Form.Item name="code">
          <Input placeholder="Nhập mã hàng" />
        </Form.Item >
        <span>Tên hàng</span>
        <Form.Item name="name">
          <Input placeholder="Nhập tên hàng" />
        </Form.Item>
        <span >Nhóm hàng</span>
        <Form.Item name="category">
          <Select placeholder="--Lựa chọn--">
            {listCategory.length > 0 ? (
              listCategory.map((category) => (
                <Select.Option key={category._id} value={category._id}>
                  {category.name}
                </Select.Option>
              ))
            ) : (
              <Select.Option>Trống</Select.Option>
            )}
          </Select>
        </Form.Item>
        <span>Đơn vị</span>
        <Form.Item name="unit">
          <Select placeholder="--Lựa chọn--">
            {listUnit.length > 0 ? (
              listUnit.map((unit) => (
                <Select.Option key={unit.name} value={unit._id}>
                  {unit.name}
                </Select.Option>
              ))
            ) : (
              <Select.Option>Trống</Select.Option>
            )}
          </Select>
        </Form.Item>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ width: "30%" }}>
            <span>Giá nhập</span>
            <Form.Item name="moneyIn">
              <InputNumber placeholder="Nhập giá" />
            </Form.Item>
          </div>
          <div style={{ width: "30%" }}>
            <span>Giá bán</span>
            <Form.Item name="moneyOut">
              <InputNumber placeholder="Nhập giá bán" />
            </Form.Item>
          </div>
          <div style={{ width: "30%" }}>
            <span>Tồn kho</span>
            <Form.Item name="inventory">
              <InputNumber placeholder="Nhập số lượng" />
            </Form.Item>
          </div>
        </div>
        <span>Ảnh</span>
        <ImgCrop rotate>
          <Upload
            listType="picture-card"
            onChange={onChange}
            action={
              process.env.NODE_ENV === "development"
                ? `${process.env.REACT_APP_BACKEND_URL}/product/upload/image`
                : "/product/upload/image"
            }
            headers={headers}
          >
            {fileList.length < 1 && "+ Upload"}
          </Upload>
        </ImgCrop>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Form.Item style={{ marginRight: "10px" }}>
            <Button type="primary" danger onClick={handleHideModal}>
              Thoát
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Thêm
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalAddMerchandise;
