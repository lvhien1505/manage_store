import { useState } from "react";
import "./styles/SectionPartner.scss";
import { Select, Popover, Button, Input, Radio, Row, Col } from "antd";
import Calendar from "react-calendar";
import CurrencyFormat from "react-currency-format";
import {
  InfoCircleOutlined,
  SwapOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

const SectionBuyer = ({ listBuyer, listPartner, typeSection }) => {
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

  const handleChangeTypeBillWithToTalMoney = (e) => {
    console.log(e.target.value);
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

  return (
    <div className="sectiontab-list-buyer">
      {typeSection == "buyer" ? (
        <div className="card-info">
          <h4>
            <InfoCircleOutlined /> Thông tin
          </h4>
          <div>
            <span>Tổng số khách hàng</span>
            <span>{listBuyer.length}</span>
          </div>
          <div>
            <span>Tổng nợ</span>
            <CurrencyFormat
              value={listBuyer.reduce(
                (accumulator, currentValue) => accumulator + currentValue.debt,
                0
              )}
              displayType={"text"}
              thousandSeparator={true}
              renderText={(value) => <span>{value}</span>}
            />
          </div>
          <div>
            <span>Tổng bán</span>
            <CurrencyFormat
              value={listBuyer.reduce(
                (accumulator, currentValue) =>
                  accumulator + currentValue.totalSell,
                0
              )}
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
            <span>Tổng số NCC</span>
            <span>{listPartner.length}</span>
          </div>
          <div>
            <span>Tổng nợ</span>
            <CurrencyFormat
              value={listPartner.reduce(
                (accumulator, currentValue) => accumulator + currentValue.debt,
                0
              )}
              displayType={"text"}
              thousandSeparator={true}
              renderText={(value) => <span>{value}</span>}
            />
          </div>
          <div>
            <span>Tổng mua</span>
            <CurrencyFormat
              value={listPartner.reduce(
                (accumulator, currentValue) =>
                  accumulator + currentValue.totalBuy,
                0
              )}
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
      <div className="card-action-total-sell">
        {typeSection == "buyer" ? <h4>Tổng bán</h4> : <h4>Tổng mua</h4>}
        <div>
          <span>Từ</span>
          <span>
            <CurrencyFormat thousandSeparator={true} placeholder={"Giá trị"} />
          </span>
        </div>
        <div>
          <span>Tới</span>
          <span>
            <CurrencyFormat thousandSeparator={true} placeholder={"Giá trị"} />
          </span>
        </div>
      </div>
      <div className="card-action-total-debt">
         {typeSection == "buyer" ? <h4>Tổng nợ</h4> : <h4>Nợ hiện tại</h4>}
        <div>
          <span>Từ</span>
          <span>
            {" "}
            <span>
              <CurrencyFormat
                thousandSeparator={true}
                placeholder={"Giá trị"}
              />
            </span>
          </span>
        </div>
        <div>
          <span>Tới</span>
          <span>
            <span>
              <CurrencyFormat
                thousandSeparator={true}
                placeholder={"Giá trị"}
              />
            </span>
          </span>
        </div>
      </div>
      {
        typeSection == "buyer" ? (<div className="card-action-sex">
        <h4>Giới tính</h4>
        <div>
          <Radio.Group onChange={handleChangeTypeBillWithToTalMoney}>
            <Radio value="tatca">Tất cả</Radio>
            <Radio value="nam">Nam</Radio>
            <Radio value="nu">Nữ</Radio>
          </Radio.Group>
        </div>
      </div>):null
      }
      <div className="card-action-status">
        <h4>Trạng thái</h4>
        <div>
          <Radio.Group onChange={handleChangeTypeBillWithToTalMoney}>
            <Radio value="tatca">Tất cả</Radio>
            <Radio value="danghoatdong">Đang hoạt động</Radio>
            <Radio value="ngunghoatdong">Ngừng hoạt động</Radio>
          </Radio.Group>
        </div>
      </div>
    </div>
  );
};

export default SectionBuyer;
