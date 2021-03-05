import React, { useState,useEffect } from "react";
import { Button,Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Dashboard from "../../../components/DashBoard/Dashboard";
import ModalAddPartner from "../../../components/Modals/ModalAdd/ModalAddPartner";
import {getListPartner} from '../../../api/partner';
import {notifyScreen} from '../../../utils/notify'
import "./Partner.scss";

const Partner = () => {
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
      key: 'id',
      dataIndex: '_id',
      render:(id)=>id
    },
  ];

  useEffect(() => {
    __getListPartner();
  }, [])

  return (
    <Dashboard nameSelect="Nhà cung cấp">
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
    </Dashboard>
  );
};

export default Partner;
