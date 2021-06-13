import { useState } from "react";
import "./styles/SectionTabPartner.scss";
import { Select, Popover, Button, Input, Radio, Row, Col } from "antd";
import CurrencyFormat from "react-currency-format";
import Calendar from "react-calendar";
import {
  InfoCircleOutlined,
  SwapOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

const SectionTabBuyer = ({ buyer, typeSection, partner }) => {
  const [valueTimeGlobal, setValueTimeGlobal] = useState("Tất cả");
  const [valueTimeLocal, setValueTimeLocal] = useState("Chọn ngày");
  const [timeLocal, setTimeLocal] = useState(new Date());
  const [visibleTooltipTimeGlobal, setVisibleTooltipTimeGlobal] =
    useState(false);
  const [visibleTooltipTimeLocal, setVisibleTooltipTimeLocal] = useState(false);
  const [copyListBill, setCopyListBill] = useState([]);

  const handleChangeSelectime = function (e) {
    let text = e.target.getAttribute("text");
    switch (text) {
      case "homqua":
        setValueTimeGlobal("Hôm qua");
        setVisibleTooltipTimeGlobal(!visibleTooltipTimeGlobal);
        setValueTimeLocal("Chọn ngày");
        break;
      case "homnay":
        setValueTimeGlobal("Hôm nay");
        setVisibleTooltipTimeGlobal(!visibleTooltipTimeGlobal);
        setValueTimeLocal("Chọn ngày");
        break;
      case "7ngay":
        setValueTimeGlobal("7 ngày qua");
        setVisibleTooltipTimeGlobal(!visibleTooltipTimeGlobal);
        setValueTimeLocal("Chọn ngày");
        break;
      case "quynay":
        setValueTimeGlobal("Quý này");
        setVisibleTooltipTimeGlobal(!visibleTooltipTimeGlobal);
        setValueTimeLocal("Chọn ngày");
        break;
      case "quytruoc":
        setValueTimeGlobal("Quý trước");
        setVisibleTooltipTimeGlobal(!visibleTooltipTimeGlobal);
        setValueTimeLocal("Chọn ngày");
        break;
      case "namnay":
        setValueTimeGlobal("Năm nay");
        setVisibleTooltipTimeGlobal(!visibleTooltipTimeGlobal);
        setValueTimeLocal("Chọn ngày");
        break;
      case "namtruoc":
        setValueTimeGlobal("Năm trước");
        setVisibleTooltipTimeGlobal(!visibleTooltipTimeGlobal);
        setValueTimeLocal("Chọn ngày");
        break;
      case "tatca":
        setValueTimeGlobal("Tất cả");
        setVisibleTooltipTimeGlobal(!visibleTooltipTimeGlobal);
        setValueTimeLocal("Chọn ngày");
        break;

      default:
        break;
    }
  };

  const handleChangeTimeLocal = (value) => {
    let time = new Date(value);
    let valueTimeLocal = `${time.getDate()}/${
      time.getMonth() + 1
    }/${time.getFullYear()}`;
    setValueTimeLocal(valueTimeLocal);
    setValueTimeGlobal("Tất cả");
    return setVisibleTooltipTimeLocal(!visibleTooltipTimeLocal);
  };

  const contentSectionTimeGlobal = (
    <div className="popover-time-global">
      <div className="sub-popover-time-global">
        <span>Theo ngày</span>
        <span onClick={(e) => handleChangeSelectime(e)} text="homqua">
          Hôm qua
        </span>
        <span onClick={(e) => handleChangeSelectime(e)} text="homnay">
          Hôm nay
        </span>
      </div>
      <div className="sub-popover-time-global">
        <span>Theo tuần</span>
        <span onClick={(e) => handleChangeSelectime(e)} text="7ngay">
          7 ngày qua
        </span>
      </div>
      <div className="sub-popover-time-global">
        <span>Theo quý</span>
        <span onClick={(e) => handleChangeSelectime(e)} text="quynay">
          Quý này
        </span>
        <span onClick={(e) => handleChangeSelectime(e)} text="quytruoc">
          Quý trước
        </span>
      </div>
      <div className="sub-popover-time-global">
        <span>Theo năm</span>
        <span onClick={(e) => handleChangeSelectime(e)} text="namnay">
          Năm nay
        </span>
        <span onClick={(e) => handleChangeSelectime(e)} text="namtruoc">
          Năm trước
        </span>
        <span onClick={(e) => handleChangeSelectime(e)} text="tatca">
          Tất cả
        </span>
      </div>
    </div>
  );

  const contentSectionTimeLocal = (
    <div className="popover-time-local">
      <Calendar value={timeLocal} onChange={handleChangeTimeLocal} />
    </div>
  );

  const handleChangeTypeBill = (value) => {};
  return (
    <div className="sectiontab-list-bill-ofbuyer">
      {typeSection == "buyer" ? (
        <div className="card-info">
          <h4>
            <InfoCircleOutlined /> Thông tin
          </h4>
          <div>
            <span>Mã KH</span>
            <span>KH{buyer.code}</span>
          </div>
          <div>
            <span>Tên</span>
            <span>{buyer.name}</span>
          </div>
          <div>
            <span>SĐT</span>
            <span>{buyer.phone}</span>
          </div>
          <div>
            <span>Tổng nợ</span>
            <CurrencyFormat
              value={buyer.debt}
              displayType={"text"}
              thousandSeparator={true}
              renderText={(value) => <span>{value}</span>}
            />
          </div>
          <div>
            <span>Tổng bán</span>
            <CurrencyFormat
              value={buyer.totalSell}
              displayType={"text"}
              thousandSeparator={true}
              renderText={(value) => <span>{value}</span>}
            />
          </div>
        </div>
      ) : (
        <div className="card-info">
          <h4>
            <InfoCircleOutlined /> Thông tin
          </h4>
          <div>
            <span>Mã NCC</span>
            <span>NCC{partner.code}</span>
          </div>
          <div>
            <span>Công ty</span>
            <span>{partner.name}</span>
          </div>
          <div>
            <span>SĐT</span>
            <span>{partner.phone}</span>
          </div>
          <div>
            <span>Nợ cần trả</span>
            <CurrencyFormat
              value={partner.debt}
              displayType={"text"}
              thousandSeparator={true}
              renderText={(value) => <span>{value}</span>}
            />
          </div>
          <div>
            <span>Tổng mua</span>
            <CurrencyFormat
              value={partner.totalBuy}
              displayType={"text"}
              thousandSeparator={true}
              renderText={(value) => <span>{value}</span>}
            />
          </div>
        </div>
      )}

      <div className="card-action-time-created">
        <h4>Ngày tạo</h4>
        <div>
          <Popover
            content={contentSectionTimeGlobal}
            trigger="click"
            placement="right"
            visible={visibleTooltipTimeGlobal}
          >
            <Input
              type="button"
              value={valueTimeGlobal}
              bordered={false}
              className="input-global-time"
              onClick={() => {
                setVisibleTooltipTimeGlobal(!visibleTooltipTimeGlobal);
                setVisibleTooltipTimeLocal(false);
                return;
              }}
            />
          </Popover>
          <SwapOutlined className="icon-symbol" />
        </div>
        <div>
          <Popover
            content={contentSectionTimeLocal}
            trigger="click"
            placement="right"
            visible={visibleTooltipTimeLocal}
          >
            <Input
              type="button"
              value={valueTimeLocal}
              bordered={false}
              className="input-local-time"
              onClick={() => {
                setVisibleTooltipTimeGlobal(false);
                setVisibleTooltipTimeLocal(!visibleTooltipTimeLocal);
                return;
              }}
            />
          </Popover>
          <CalendarOutlined className="icon-symbol" />
        </div>
      </div>
      <div className="card-action-typebill">
        <h4>Loại phiếu</h4>
        <div>
          <Radio.Group onChange={handleChangeTypeBill}>
            <Radio value="tatca">Tất cả</Radio>
           {typeSection == "buyer" ?  <Radio value="banhang">Bán hàng</Radio> :  <Radio value="nhaphang">Nhập hàng</Radio>}
            <Radio value="thanhtoan">Thanh toán</Radio>
            <Radio value="dieuchinh">Điều chỉnh</Radio>
          </Radio.Group>
        </div>
      </div>
    </div>
  );
};

export default SectionTabBuyer;
