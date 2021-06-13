import { useState } from "react";
import "./styles/SectionBill.scss";
import { Select, Popover, Button, Input, Radio } from "antd";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  SwapOutlined,
  CalendarOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

const SectionBill = ({ listBill, status }) => {
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

  const handleChangeTypeBillWithPaid = (e) => {
    console.log(e.target.value);
  };

  const handleChangeTypeBillWithBuyer = (e) => {
    console.log(e.target.value);
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
    <div className="sectiontab-list-bill">
      <div className="card-info">
        <h4>
          <InfoCircleOutlined /> Thông tin
        </h4>
        <div>
          <span>Tổng số hóa đơn</span>
          <span>{listBill.length}</span>
        </div>
        <div>
          <span>Thanh toán xong</span>
          <span>
            {listBill.filter((bill) => bill.totalExcessPaid >= 0).length}
          </span>
        </div>
        <div>
          <span>Còn nợ</span>
          <span>
            {listBill.filter((bill) => bill.totalExcessPaid < 0).length}
          </span>
        </div>
        <div>
          <span>Trạng thái hóa đơn</span>
          <span>{status ? "Hoàn thành" : "Lưu tạm"}</span>
        </div>
      </div>
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
      <div className="card-action-bill">
        <h4>Thanh toán</h4>
        <div>
          <Radio.Group onChange={handleChangeTypeBillWithPaid}>
            <Radio value="tatca">Tất cả</Radio>
            <Radio value="thanhtoanxong">Thanh toán xong</Radio>
            <Radio value="conno">Còn nợ</Radio>
          </Radio.Group>
        </div>
      </div>
      <div className="card-action-buyer">
        <h4>Khách hàng</h4>
        <div>
          <Radio.Group onChange={handleChangeTypeBillWithBuyer}>
            <Radio value="tatca">Tất cả</Radio>
            <Radio value="khongkhach">Không</Radio>
            <Radio value="cokhach">Có khách hàng</Radio>
          </Radio.Group>
        </div>
      </div>
      <div className="card-action-total-money">
        <h4>Giá trị hóa đơn</h4>
        <div>
          <Radio.Group onChange={handleChangeTypeBillWithToTalMoney}>
            <Radio value="tangdan">Tăng dần</Radio>
            <Radio value="giamdan">Giảm dần</Radio>
          </Radio.Group>
        </div>
      </div>
    </div>
  );
};

export default SectionBill;
