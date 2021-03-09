import React, { useState,useEffect} from "react";
import {Button, Table,Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Dashboard from "../../../components/DashBoard/Dashboard";
import ModalAddUnit from '../../../components/Modals/ModalAdd/ModalAddUnit';
import ModalUpdateUnit from '../../../components/Modals/ModalUpdate/ModalUpdateUnit';
import {getListUnit} from '../../../api/unit';
import {notifyScreen} from '../../../utils/notify'
import "./styles/Unit.scss"
import ModalDeleteUnit from "../../../components/Modals/ModalConfirmDelete/ModalDeleteUnit";

const Unit = () => {
    const [idUnit, setIdUnit] = useState({});
    const [unit,setUnit]=useState({})
    const [hideModalAdd, setHideModalAdd] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [hideModalUpdate, setHideModalUpdate] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [hideModalDelete, setHideModalDelete] = useState(false);
    const [listUnit,setListUnit]=useState([])
  
    const __getListUnit=async ()=>{
        try {
          let res=await getListUnit();
          if (res.status === 200) {
            return setListUnit(res.data);
          }
        } catch (error) {
           notifyScreen("error","500","Lỗi không xác định")
        }
    }
    
  
    const handlerHideModal = () => {
      return setHideModalAdd(!hideModalAdd);
    };
  
    const handlerShowModalUpdate = (id) => {
      let newListUnit =listUnit.filter((unit)=>unit._id);
      setUnit(newListUnit[0])
      setShowModalUpdate(true)
      return setHideModalUpdate(!hideModalUpdate);
    };
  
    const handlerShowModalDelete = (id) => {
      setIdUnit(id)
      setShowModalDelete(true)
      return setHideModalDelete(!hideModalDelete);
    };
  
    const handlerHideModalUpdate = () => {
       setHideModalUpdate(!hideModalUpdate);
       return setShowModalUpdate(false)
    };
  
    const handlerHideModalDelete = () => {
      setHideModalDelete(!hideModalDelete);
      return setShowModalDelete(false)
   };
   
    const columns = [
      {
        title: 'Tên đơn vị',
        dataIndex: 'name',
        key: 'name',
        width:"80%"
      },
      {
        title:"Cập nhật",
        key: 'id',
        dataIndex: '_id',
        render:(id)=>(<Space>
            <Button type="primary" onClick={()=>handlerShowModalUpdate(id)}>Sửa</Button>
            <Button type="primary" danger onClick={()=>handlerShowModalDelete(id)}>Xóa</Button>
        </Space>)
      },
    ];
  
    useEffect(() => {
      __getListUnit();
    },[idUnit,hideModalAdd,hideModalUpdate,hideModalDelete])
  
    return (
      <Dashboard nameSelect="Đơn vị" defaulCheckKey="2">
        <div className="unit-wrapper">
          <div className="btn">
            <Button
              onClick={() => setHideModalAdd(!hideModalAdd)}
              className="btn-add__unit"
              icon={<PlusOutlined className="icon-plus__edit" />}
            >
              Thêm đơn vị
            </Button>
          </div>
          <ModalAddUnit
            hideModal={hideModalAdd}
            handleHideModal={handlerHideModal}
          />
        </div>
        <div className="unit-table">
            <Table columns={columns} dataSource={listUnit?listUnit:[]} size="small"/>
            {showModalUpdate ? <ModalUpdateUnit unitEdit={unit} hideModal={hideModalUpdate} handleHideModal={handlerHideModalUpdate}/> :null}
            {showModalDelete ? <ModalDeleteUnit idUnit={idUnit ? idUnit : null} hideModal={hideModalDelete} handleHideModal={handlerHideModalDelete}/> : null}
        </div>
      </Dashboard>
    );
};

export default Unit;
