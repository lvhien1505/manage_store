import React, { useState,useEffect } from "react";
import { Button,Table,Avatar,Row,Col } from "antd";
import {Link} from 'react-router-dom'
import { PlusOutlined,UserOutlined,PhoneOutlined,DeliveredProcedureOutlined } from "@ant-design/icons";
import Dashboard from "../../../components/DashBoard/Dashboard";
import ModalAddPartner from "../../../components/Modals/ModalAdd/ModalAddPartner";
import SectionPartner from '../../../components/SectionTab/SectionPartner'
import CurrencyFormat from "react-currency-format";
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
      render: (text, obj) => (
        <Link to={`/dashboard/partner/${obj._id}`}>{"NCC" + text}</Link>
      ),
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
      title: 'Tổng mua',
      key: 'totalBuy',
      dataIndex: 'totalBuy',
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
    __getListPartner();
  }, [hideModalAdd])

  return (
    <Dashboard nameSelect="Nhà cung cấp" defaulCheckKey="6">
      <div className="modal-partner">
        <ModalAddPartner
          hideModal={hideModalAdd}
          handleHideModal={handlerHideModal}
        />
      </div>
      <div className="partner-table__pc">
      <h2>Nhà cung cấp</h2>
        <Row>
          <Col span={5}>
            <SectionPartner
            listPartner={listPartner.length >0 ? listPartner :[]}
            typeSection="partner"
            />
          </Col>
          <Col span={19}>
            <div className="top-table-list-partner">
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
            <div className="table-list-partner">
              {" "}
              <Table columns={columns} dataSource={listPartner?listPartner:[]} />
            </div>
          </Col>
        </Row>
         
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
