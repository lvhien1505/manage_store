import React, { useState, useEffect } from "react";
import { Button, Table, Space } from "antd";
import { PlusOutlined, StopOutlined, ToolOutlined } from "@ant-design/icons";
import Dashboard from "../../../components/DashBoard/Dashboard";
import ModalAddCategoryProduct from "../../../components/Modals/ModalAdd/ModalAddCategoryProduct";
import ModalUpdateCategoryProduct from "../../../components/Modals/ModalUpdate/ModalUpdateCategoryProduct";
import { getListCategory } from "../../../api/category";
import { notifyScreen } from "../../../utils/notify";
import "./styles/CategoryProduct.scss";
import ModalDeleteCategoryProduct from "../../../components/Modals/ModalConfirmDelete/ModalDeleteCategoryProduct";

const CategoryProduct = () => {
  const [idCategory, setIdCategory] = useState({});
  const [category, setCategory] = useState({});
  const [hideModalAdd, setHideModalAdd] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [hideModalUpdate, setHideModalUpdate] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [hideModalDelete, setHideModalDelete] = useState(false);
  const [listCategory, setListCategory] = useState([]);

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

  const handlerHideModal = () => {
    return setHideModalAdd(!hideModalAdd);
  };

  const handlerShowModalUpdate = (id) => {
    let newListCategory = listCategory.filter(
      (category) => category._id === id
    );
    setCategory(newListCategory[0]);
    setShowModalUpdate(true);
    return setHideModalUpdate(!hideModalUpdate);
  };

  const handlerShowModalDelete = (id) => {
    setIdCategory(id);
    setShowModalDelete(true);
    return setHideModalDelete(!hideModalDelete);
  };

  const handlerHideModalUpdate = () => {
    setHideModalUpdate(!hideModalUpdate);
    return setShowModalUpdate(false);
  };

  const handlerHideModalDelete = () => {
    setHideModalDelete(!hideModalDelete);
    return setShowModalDelete(false);
  };

  const columns = [
    {
      title: "Tên nhóm hàng",
      dataIndex: "name",
      key: "name",
      width: "80%",
    },
    {
      title: "Cập nhật",
      key: "id",
      dataIndex: "_id",
      render: (id) => (
        <Space>
          <Button
            type="primary"
            onClick={() => handlerShowModalUpdate(id)}
            icon={<ToolOutlined />}
            className="btn-update-category"
          >
            Sửa
          </Button>
          <Button
            type="primary"
            className="btn-remove-category"
            onClick={() => handlerShowModalDelete(id)}
            icon={<StopOutlined />}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    __getListCategory();
  }, [idCategory, hideModalAdd, hideModalUpdate, hideModalDelete]);

  return (
    <Dashboard nameSelect="Nhóm hàng" defaulCheckKey="2">
      <div className="category-wrapper">
        <div className="btn">
          <Button
            onClick={() => setHideModalAdd(!hideModalAdd)}
            className="btn-add__category"
            icon={<PlusOutlined className="icon-plus__edit" />}
          >
            Thêm nhóm hàng
          </Button>
        </div>
        <ModalAddCategoryProduct
          hideModal={hideModalAdd}
          handleHideModal={handlerHideModal}
        />
      </div>
      <div className="category-table">
        <Table
          columns={columns}
          dataSource={listCategory ? listCategory : []}
          size="small"
        />
        {showModalUpdate ? (
          <ModalUpdateCategoryProduct
            categoryEdit={category}
            hideModal={hideModalUpdate}
            handleHideModal={handlerHideModalUpdate}
          />
        ) : null}
        {showModalDelete ? (
          <ModalDeleteCategoryProduct
            idCategory={idCategory ? idCategory : null}
            hideModal={hideModalDelete}
            handleHideModal={handlerHideModalDelete}
          />
        ) : null}
      </div>
    </Dashboard>
  );
};
export default CategoryProduct;
