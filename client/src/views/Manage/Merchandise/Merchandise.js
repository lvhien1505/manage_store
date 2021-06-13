import React, { useState, useEffect } from "react";
import { Button, Table, Avatar, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { PlusOutlined, DeliveredProcedureOutlined } from "@ant-design/icons";
import CurrencyFormat from "react-currency-format";
import Dashboard from "../../../components/DashBoard/Dashboard";
import ModalAddMerchandise from "../../../components/Modals/ModalAdd/ModalAddMerchandise";
import SectionCategoryMerchandise from "../../../components/SectionTab/SectionCategoryMerchandise";
import { getProduct } from "../../../api/product";
import { getListCategory } from "../../../api/category";
import { notifyScreen } from "../../../utils/notify";
import "./styles/Merchandise.scss";

const Merchandise = ({ history }) => {
  const [hideModalAdd, setHideModalAdd] = useState(false);
  const [listMerchandise, setListMerchandise] = useState([]);
  const [listCategory, setListCategory] = useState([]);

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

  const __getCategory = async () => {
    try {
      let res = await getListCategory();
      if (res.status === 200) {
        res.data.push({name:"Tất cả"})
        return setListCategory(res.data);
      }
    } catch (error) {
      notifyScreen("error", "500", "Lỗi không xác định");
    }
  };

  const handleFilterListMerchandise = (list)=>{
    console.log(list);
  }

  const columns = [
    {
      title: "Mã hàng",
      dataIndex: "code",
      key: "code",
      render: (text, obj) => (
        <Link to={`/dashboard/merchandise/${obj._id}`}>{"SP" + text}</Link>
      ),
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
      render: (text) => (
        <CurrencyFormat
          value={text}
          displayType={"text"}
          thousandSeparator={true}
          renderText={(value) => <span>{value}</span>}
        />
      ),
    },
    {
      title: "Giá bán",
      key: "moneyOut",
      dataIndex: "moneyOut",
      render: (text) => (
        <CurrencyFormat
          value={text}
          displayType={"text"}
          thousandSeparator={true}
          renderText={(value) => <span>{value}</span>}
        />
      ),
    },
    {
      title: "Tồn kho",
      key: "inventory",
      dataIndex: "inventory",
    },
  ];

  useEffect(() => {
    __getProduct();
    __getCategory();
  }, [hideModalAdd]);

  return (
    <Dashboard nameSelect="Hàng hóa" defaulCheckKey="2">
      <div className="modal-merchandise">
      <ModalAddMerchandise
          hideModal={hideModalAdd}
          handleHideModal={handlerHideModal}
        />
      </div>
      <div className="merchandise-table__pc">
        <h2>Hàng hóa</h2>
        <Row>
          <Col span={5}>
            <SectionCategoryMerchandise
              listMerchandise={
                listMerchandise.length > 0 ? listMerchandise : []
              }
              listCategory={listCategory.length > 0 ? listCategory : []}
              handleFilter={handleFilterListMerchandise}
            />
          </Col>
          <Col span={19}>
            <div className="top-table-list-product">
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setHideModalAdd(!hideModalAdd)}
              >
                Thêm mới
              </Button>
              <Button type="primary" icon={<DeliveredProcedureOutlined />}>
                Xuất file
              </Button>
            </div>
            <div className="table-list-product">
              {" "}
              <Table dataSource={listMerchandise} columns={columns} />
            </div>
          </Col>
        </Row>
        
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
                          process.env.REACT_APP_ENV === "development"
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
                        <CurrencyFormat
                          value={merchandise.moneyOut}
                          displayType={"text"}
                          thousandSeparator={true}
                          renderText={(value) => <span>{value}</span>}
                        />
                      </div>
                      <div className="inventory">
                        <CurrencyFormat
                          value={merchandise.inventory}
                          displayType={"text"}
                          thousandSeparator={true}
                          renderText={(value) => <span>{value}</span>}
                        />
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
