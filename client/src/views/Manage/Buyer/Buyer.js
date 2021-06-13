import React, { useState, useEffect } from "react";
import { Button, Table, Avatar, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { PlusOutlined, UserOutlined, PhoneOutlined,DeliveredProcedureOutlined } from "@ant-design/icons";
import CurrencyFormat from "react-currency-format";
import Dashboard from "../../../components/DashBoard/Dashboard";
import ModalAddBuyer from "../../../components/Modals/ModalAdd/ModalAddBuyer";
import SectionBuyer from "../../../components/SectionTab//SectionPartner";
import { getBuyer } from "../../../api/buyer";
import { notifyScreen } from "../../../utils/notify";
import avatar from "../../../logo/avatar/default.jpg";
import "./Buyer.scss";

const Buyer = ({ history }) => {
  const [hideModalAdd, setHideModalAdd] = useState(false);
  const [listBuyer, setListBuyer] = useState([]);

  const __getListBuyer = async () => {
    try {
      let res = await getBuyer();
      if (res.status === 200) {
        return setListBuyer(res.data);
      }
    } catch (error) {
      notifyScreen("error", "500", "Lỗi không xác định");
    }
  };

  const handlerHideModal = () => {
    return setHideModalAdd(!hideModalAdd);
  };

  const columns = [
    {
      title: "Mã KH",
      dataIndex: "code",
      key: "code",
      render: (text, obj) => (
        <Link to={`/dashboard/buyer/${obj._id}`}>{"KH" + text}</Link>
      ),
    },
    {
      title: "Tên KH",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Nợ hiện tại",
      key: "debt",
      dataIndex: "debt",
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
      title: "Tổng bán",
      key: "totalSell",
      dataIndex: "totalSell",
      render: (text) => (
        <CurrencyFormat
          value={text}
          displayType={"text"}
          thousandSeparator={true}
          renderText={(value) => <span>{value}</span>}
        />
      ),
    },
  ];

  useEffect(() => {
    __getListBuyer();
  }, [hideModalAdd]);

  return (
    <Dashboard nameSelect="Khách hàng" defaulCheckKey="5">
      <div className="modal-buyer">
        <ModalAddBuyer
          hideModal={hideModalAdd}
          handleHideModal={handlerHideModal}
        />
      </div>
      <div className="buyer-table__pc">
        <h2>Khách hàng</h2>
        <Row>
          <Col span={5}>
            <SectionBuyer
            listBuyer={listBuyer.length >0 ? listBuyer :[]}
            typeSection="buyer"
            />
          </Col>
          <Col span={19}>
            <div className="top-table-list-buyer">
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
            <div className="table-list-buyer">
              {" "}
              <Table
                columns={columns}
                dataSource={listBuyer ? listBuyer : []}
              />
            </div>
          </Col>
        </Row>
      </div>
      <div className="buyer-table__mobile">
        <div className="total-buyer">
          <span>
            Tổng số {listBuyer.length > 0 ? listBuyer.length : 0} khách hàng
          </span>
        </div>
        <div className="buyer-list">
          {listBuyer.length > 0
            ? listBuyer.map((buyer, i) => (
                <Link to={`/dashboard/buyer/${buyer._id}`} key={i + "-link"}>
                  <div key={buyer._id} className="buyer-info" key={i}>
                    <div className="buyer-info__avatar">
                      <Avatar src={avatar} size={{ xs: 42 }} />
                    </div>
                    <div className="buyer-info__info">
                      <div className="name">
                        {buyer.address
                          ? `${buyer.name} - ${buyer.address}`
                          : buyer.name}
                      </div>
                      <div className="code">
                        <UserOutlined /> {"KH" + buyer.code}
                      </div>
                      <div className="phone">
                        <PhoneOutlined /> {buyer.phone}
                      </div>
                    </div>
                    <div className="buyer-info__money">{buyer.totalSell}</div>
                  </div>
                </Link>
              ))
            : null}
        </div>
      </div>
    </Dashboard>
  );
};

export default Buyer;
