import React from "react";
import { getBillWithId } from "../../api/billSell";
import { notifyScreen } from "../../utils/notify";

const UpdateBillSell = ({ match }) => {
  const __getBillWithId = () => {
    try {
        let res =await getBillWithId(match.params.id);
        if (res.status === 200) {
            
        }
    } catch (error) {
      notifyScreen("error", "200", "Lỗi không xác định");
    }
  };
  return <div></div>;
};

export default UpdateBillSell;
