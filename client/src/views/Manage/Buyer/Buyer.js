import React, { useState, useEffect } from "react";
import { Button, Table,Avatar } from "antd";
import { Link } from "react-router-dom";
import { PlusOutlined,UserOutlined,PhoneOutlined } from "@ant-design/icons";
import Dashboard from "../../../components/DashBoard/Dashboard";
import ModalAddBuyer from "../../../components/Modals/ModalAdd/ModalAddBuyer";
import { getBuyer } from "../../../api/buyer";
import { notifyScreen } from "../../../utils/notify";
import logo from '../../../logo/logo.png'
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
      render: (text) => "KH" + text,
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
    },
    {
      title: "Tổng bán",
      key: "totalSell",
      dataIndex: "totalSell",
    },
    {
      title: "Cập nhật",
      key: "id",
      dataIndex: "_id",
      render: (id) => (
        <Button
          type="primary"
          onClick={() => history.push(`/dashboard/buyer/${id}`)}
        >
          Thông tin/Trả nợ
        </Button>
      ),
    },
  ];

  useEffect(() => {
    __getListBuyer();
  }, [hideModalAdd]);

  return (
    <Dashboard nameSelect="Khách hàng">
      <div className="buyer-wrapper">
        <div className="btn">
          <Button
            onClick={() => setHideModalAdd(!hideModalAdd)}
            className="btn-add__buyer"
            icon={<PlusOutlined className="icon-plus__edit" />}
          >
            Thêm khách hàng
          </Button>
        </div>
        <ModalAddBuyer
          hideModal={hideModalAdd}
          handleHideModal={handlerHideModal}
        />
      </div>
      <div className="buyer-table__pc">
        <Table columns={columns} dataSource={listBuyer ? listBuyer : []} />
      </div>
      <div className="buyer-table__mobile">
        <div className="total-buyer">
          <span>
            Tổng số {listBuyer.length > 0 ? listBuyer.length : 0} khách hàng
          </span>
        </div>
        <div className="buyer-list">
          {listBuyer.length > 0
            ? listBuyer.map((buyer) => (
                <Link to={`/dashboard/buyer/${buyer._id}`}>
                   <div key={buyer._id} className="buyer-info">
                     <div className="buyer-info__avatar">
                        <Avatar src={logo} size={{xs:48}}/>
                     </div>
                     <div className="buyer-info__info">
                       <div className="name">{buyer.address ? `${buyer.name} - ${buyer.address}` : buyer.name}</div>
                       <div className="code">
                         <UserOutlined/> {"KH" + buyer.code}
                       </div>
                       <div className="phone"><PhoneOutlined/> {buyer.phone}</div>
                     </div >
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
