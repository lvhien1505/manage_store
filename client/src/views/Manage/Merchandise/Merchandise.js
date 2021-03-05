import React, { useState, useEffect } from "react";
import { Button, Table,Avatar } from "antd";
import {Link} from 'react-router-dom'
import { PlusOutlined } from "@ant-design/icons";
import Dashboard from "../../../components/DashBoard/Dashboard";
import ModalAddMerchandise from "../../../components/Modals/ModalAdd/ModalAddMerchandise";
import { getProduct } from "../../../api/product";
import { notifyScreen } from "../../../utils/notify";
import "./styles/Merchandise.scss";

const Merchandise = ({ history }) => {
  const [hideModalAdd, setHideModalAdd] = useState(false);
  const [listMerchandise, setListMerchandise] = useState([]);

  const handlerHideModal = () => {
    return setHideModalAdd(!hideModalAdd);
  };

  const __getProduct = async () => {
    try {
      let res = await getProduct();
      if (res.status === 200) {
        return setListMerchandise(res.data);
      }
    } catch (error) {
      notifyScreen("error", "500", "Lỗi không xác định");
    }
  };

  const columns = [
    {
      title: "Mã hàng",
      dataIndex: "code",
      key: "code",
      render: (text) => "SP" + text,
    },
    {
      title: "Tên hàng",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Giá nhập",
      dataIndex: "moneyIn",
      key: "moneyIn",
    },
    {
      title: "Giá bán",
      key: "moneyOut",
      dataIndex: "moneyOut",
    },
    {
      title: "Tồn kho",
      key: "inventory",
      dataIndex: "inventory",
    },
    {
      title: "Cập nhật",
      key: "id",
      dataIndex: "_id",
      render: (id) => (
        <Button
          type="primary"
          onClick={() => history.push(`/dashboard/merchandise/${id}`)}
        >
          Thông tin/Điều chỉnh
        </Button>
      ),
    },
  ];

  useEffect(() => {
    __getProduct();
  }, [hideModalAdd]);

  return (
    <Dashboard nameSelect="Hàng hóa">
      <div className="merchandise-wrapper">
        <div className="btn">
          <Button
            onClick={() => setHideModalAdd(!hideModalAdd)}
            className="btn-add__merchandise"
            icon={<PlusOutlined className="icon-plus__edit" />}
          >
            Thêm hàng hóa
          </Button>
        </div>
        <ModalAddMerchandise
          hideModal={hideModalAdd}
          handleHideModal={handlerHideModal}
        />
      </div>
      <div className="merchandise-table__pc">
        <Table
          columns={columns}
          dataSource={listMerchandise.length > 0 ? listMerchandise : []}
        />
      </div>
      <div className="merchandise-table__mobile">
        <div className="total-merchandise">
          <span>
            Tổng số {listMerchandise.length > 0 ? listMerchandise.length : 0}{" "}
            hàng hóa
          </span>
        </div>
        <div className="merchandise-list">
          {listMerchandise.length > 0
            ? listMerchandise.map((merchandise) => (
                <Link to={`/dashboard/merchandise/${merchandise._id}`}>
                  <div key={merchandise._id} className="merchandise-info">
                    <div className="merchandise-info__avatar">
                      <Avatar
                        src={
                          process.env.NODE_ENV === "development"
                            ? `${process.env.REACT_APP_BACKEND_URL}/${merchandise.image}`
                            : `/${merchandise.image}`
                        }
                        size={{ xs: 48 }}
                       shape="square"
                      />
                    </div>
                    <div className="merchandise-info__info">
                      <div className="name">{merchandise.name}</div>
                      <div className="code">{"SP" + merchandise.code}</div>
                    </div>
                    <div className="merchandise-info__count">
                      <div className="money-out">
                        {merchandise.moneyOut}
                      </div>
                      <div className="inventory">
                        {merchandise.inventory}
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            : null}
        </div>
      </div>
    </Dashboard>
  );
};

export default Merchandise;
