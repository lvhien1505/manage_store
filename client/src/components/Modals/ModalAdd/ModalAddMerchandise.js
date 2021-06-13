import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, InputNumber, Upload, Button } from "antd";
import { StopOutlined, PlusOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import { getListCategory } from "../../../api/category";
import { getListUnit } from "../../../api/unit";
import { createProduct } from "../../../api/product";
import CurrencyFormat from "react-currency-format";
import Cookies from "js-cookie";
import { notifyScreen } from "../../../utils/notify";
import "../styles/ModalAddAndUpdate.scss";

let token = Cookies.get("__t");
let headers = {
  authorization: `Bearer ${token}`,
};

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

  const handlerFormAdd = async (values) => {
    try {
      let code = values.code;
      let name = values.name;
      let category = values.category;
      let unit = values.unit;
      let moneyIn = values.moneyIn
        ? parseInt(values.moneyIn.split(",").join(""))
        : "";
      let moneyOut = values.moneyOut
        ? parseInt(values.moneyOut.split(",").join(""))
        : "";
      let inventory = values.inventory
        ? parseInt(values.inventory.split(",").join(""))
        : "";
      if (name, category, unit, moneyIn, moneyOut, inventory) {
        let merchandise = {
          code,
          name,
          category,
          unit,
          moneyIn,
          moneyOut,
          inventory,
        };
        let res = await createProduct(merchandise);
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

  const checkPrice = (_, value) => {
    if (value) {
      value = parseInt(value.split(",").join(""));
      if (value >= 0) {
        return Promise.resolve();
      }

      return Promise.reject(new Error("Vui lòng nhập số lớn hơn 0 !"));
    }

    return Promise.reject(new Error("Vui lòng nhập giá trị vào !"));
  };

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
      width={800}
    >
      <Form onFinish={handlerFormAdd} className="form-add-merchandise">
        <div className="wrapper-input-form">
          <div>
            <div className="code-merchandise">
              <span style={{ width: "100px" }}>Mã hàng</span>
              <Form.Item
                name="code"
                rules={[{ required: true, message: "Vui lòng nhập mã hàng !" }]}
              >
                <Input
                  placeholder="Nhập mã hàng - VD : 0001"
                  bordered={false}
                />
              </Form.Item>
            </div>
            <div className="name-merchandise">
              {" "}
              <span style={{ width: "100px" }}>Tên hàng</span>
              <Form.Item
                name="name"
                rules={[
                  { required: true, message: "Vui lòng nhập tên hàng !" },
                ]}
              >
                <Input placeholder="Nhập tên hàng" bordered={false} />
              </Form.Item>
            </div>
            <div className="category-merchandise">
              <span style={{ width: "100px" }}>Nhóm hàng</span>
              <Form.Item
                name="category"
                rules={[
                  { required: true, message: "Vui lòng chọn nhóm hàng !" },
                ]}
              >
                <Select placeholder="--Lựa chọn--" bordered={false}>
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
            </div>
            <div className="unit-merchandise">
              <span style={{ width: "100px" }}>Đơn vị</span>
              <Form.Item
                name="unit"
                rules={[{ required: true, message: "Vui lòng chọn đơn vị !" }]}
              >
                <Select placeholder="--Lựa chọn--" bordered={false}>
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
            </div>
          </div>
          <div className="input-money-merchandise">
            <div>
              <span style={{ width: "100px" }}>Giá nhập</span>
              <Form.Item name="moneyIn" rules={[{ validator: checkPrice }]}>
                <CurrencyFormat
                  placeholder="Nhập giá"
                  thousandSeparator={true}
                />
              </Form.Item>
            </div>
            <div>
              <span style={{ width: "100px" }}>Giá bán</span>
              <Form.Item name="moneyOut" rules={[{ validator: checkPrice }]}>
                <CurrencyFormat
                  placeholder="Nhập giá bán"
                  thousandSeparator={true}
                />
              </Form.Item>
            </div>
            <div>
              <span style={{ width: "100px" }}>Tồn kho</span>
              <Form.Item name="inventory" rules={[{ validator: checkPrice }]}>
                <CurrencyFormat
                  thousandSeparator={true}
                  placeholder="Nhập số lượng"
                />
              </Form.Item>
            </div>
          </div>
        </div>
        <div className="contain-select-img">
          <span style={{ width: "100px" }}>Chọn ảnh</span>
          <ImgCrop rotate>
            <Upload
              listType="picture-card"
              onChange={onChange}
              action={
                process.env.REACT_APP_ENV === "development"
                  ? `${process.env.REACT_APP_BACKEND_URL}/product/upload/image`
                  : "/product/upload/image"
              }
              headers={headers}
            >
              {fileList.length < 1 && "+ Upload"}
            </Upload>
          </ImgCrop>
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

export default ModalAddMerchandise;
