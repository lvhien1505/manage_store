import React, { useState, useEffect } from "react";
import { Button,Avatar } from "antd";
import { CloseOutlined,PlusOutlined,UserOutlined,PhoneOutlined } from "@ant-design/icons";
import DashboardSaleMobile from "../DashBoard/DashboardSaleMobile";
import ModalAddBuyer from "../Modals/ModalAdd/ModalAddBuyer";
import { getListPartner } from "../../api/partner";
import { notifyScreen } from "../../utils/notify";
import "./styles/PartnerMobile.scss";
import logo from '../../logo/logo.png'

const BuyerMobile = ({ hideBuyerMobile,valueSelectBuyer }) => {
  const [listPartner, setListPartner] = useState([]);
  const [hideModalAdd, setHideModalAdd] = useState(false);

  const __getListPartner = async () => {
    try {
      let res = await getListPartner();
      if (res.status === 200) {
        return setListPartner(res.data);
      }
    } catch (error) {
      notifyScreen("error", "500", "Lỗi không xác định");
    }
  };

  const handlerHideModal = () => {
    return setHideModalAdd(!hideModalAdd);
  };

  useEffect(() => {
    __getListPartner();
  }, [hideModalAdd]);
  return (
    <div className="buyer-wrapper">
      <div className="icon-exit">
        <Button
          onClick={() => hideBuyerMobile()}
          icon={<CloseOutlined style={{ color: "white", fontSize: "20px" }} />}
          type="link"
        ></Button>
      </div>
      <DashboardSaleMobile nameSelect="Khách hàng">
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
        <div className="buyer-table__mobile">
          <div className="total-buyer">
            <span>
              Tổng số {listPartner.length > 0 ? listPartner.length : 0} khách hàng
            </span>
          </div>
          <div className="buyer-list">
            {listPartner.length > 0
              ? listPartner.map((buyer) => (
                  <div key={buyer._id} className="buyer-info" onClick={()=>{
                    valueSelectBuyer({_id:buyer._id,name:buyer.name,phone:buyer.phone,address:buyer.address})
                    return hideBuyerMobile();
                  }}>
                    <div className="buyer-info__avatar">
                      <Avatar src={logo} size={{ xs: 48 }} />
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
                ))
              : null}
          </div>
        </div>
      </DashboardSaleMobile>
    </div>
  );
};

export default BuyerMobile;
