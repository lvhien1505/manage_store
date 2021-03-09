import React, { useState,useEffect } from "react";
import { Button,Table,Avatar } from "antd";
import {Link} from 'react-router-dom'
import { PlusOutlined,UserOutlined,PhoneOutlined } from "@ant-design/icons";
import Dashboard from "../../../components/DashBoard/Dashboard";
import ModalAddPartner from "../../../components/Modals/ModalAdd/ModalAddPartner";
import {getListPartner} from '../../../api/partner';
import avatar from "../../../logo/avatar/default.jpg";
import {notifyScreen} from '../../../utils/notify';
import "./Partner.scss";

const Partner = ({history}) => {
  const [hideModalAdd, setHideModalAdd] = useState(false);
  const [listPartner,setListPartner]=useState([])

  const __getListPartner=async ()=>{
      try {
        let res=await getListPartner();
        if (res.status === 200) {
          return setListPartner(res.data);
        }
      } catch (error) {
         notifyScreen("error","500","Lỗi không xác định")
      }
  }

  const handlerHideModal = () => {
    return setHideModalAdd(!hideModalAdd);
  };

  const columns = [
    {
      title: 'Mã NCC',
      dataIndex: 'code',
      key: 'code',
      render:(text)=>("NCC" + text)
    },
    {
      title: 'Tên NCC',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Điện thoại',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      key: 'email',
      dataIndex: 'email',
    },
    {
      title: 'Nợ cần trả NCC',
      key: 'debt',
      dataIndex: 'debt',
    },
    {
      title: 'Tổng mua',
      key: 'totalBuy',
      dataIndex: 'totalBuy',
    },
    {
      title: "Cập nhật",
      key: "id",
      dataIndex: "_id",
      render: (id) => (
        <Button
          type="primary"
          onClick={() => history.push(`/dashboard/partner/${id}`)}
        >
          Thông tin/Trả nợ
        </Button>
      ),
    },
  ];

  useEffect(() => {
    __getListPartner();
  }, [])

  return (
    <Dashboard nameSelect="Nhà cung cấp" defaulCheckKey="6">
      <div className="partner-wrapper">
        <div className="btn">
          <Button
            onClick={() => setHideModalAdd(!hideModalAdd)}
            className="btn-add__partner"
            icon={<PlusOutlined className="icon-plus__edit" />}
          >
            Thêm nhà cung cấp
          </Button>
        </div>
        <ModalAddPartner
          hideModal={hideModalAdd}
          handleHideModal={handlerHideModal}
        />
      </div>
      <div className="partner-table__pc">
         <Table columns={columns} dataSource={listPartner?listPartner:[]} />
      </div>
      <div className="partner-table__mobile">
      <div className="total-partner">
          <span>
            Tổng số {listPartner.length > 0 ? listPartner.length : 0} nhà cung cấp
          </span>
        </div>
        <div className="partner-list">
          {listPartner.length > 0
            ? listPartner.map((partner, i) => (
                <Link to={`/dashboard/partner/${partner._id}`} key={i + "-link"}>
                  <div key={partner._id} className="partner-info" key={i}>
                    <div className="partner-info__avatar">
                      <Avatar src={avatar} size={{ xs: 42 }} />
                    </div>
                    <div className="partner-info__info">
                      <div className="name">
                        {partner.name}
                      </div>
                      <div className="code">
                        <UserOutlined /> {"NCC" + partner.code}
                      </div>
                      <div className="phone">
                        <PhoneOutlined /> {partner.phone}
                      </div>
                    </div>
                    <div className="partner-info__money">{partner.totalBuy}</div>
                  </div>
                </Link>
              ))
            : null}
        </div>
      </div>
    </Dashboard>
  );
};

export default Partner;
