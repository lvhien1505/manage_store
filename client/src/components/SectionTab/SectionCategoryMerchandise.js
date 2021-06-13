import { useState } from "react";
import "./styles/SectionCategoryMerchandise.scss";
import { Select, Popover, Button, Input, Radio, Row, Col } from "antd";
import { InfoCircleOutlined, SwapOutlined } from "@ant-design/icons";

const SectionCategoryMerchandise = ({
  listMerchandise,
  listCategory,
  handleFilter,
}) => {
  const [copyListBill, setCopyListBill] = useState([]);
  const [visibleTooltipCategory, setVisibleTooltipCategory] = useState(false);
  const [valueCategory, setValueCategory] = useState("Chọn nhóm hàng");

  const handleChangeTypeBillWithPaid = (e) => {
    console.log(e.target.value);
  };

  const handleChangeTypeBillWithBuyer = (e) => {
    console.log(e.target.value);
  };

  const handleChangeTypeBillWithToTalMoney = (e) => {
    console.log(e.target.value);
  };

  const handleSelectValueTootltipCategory = (e) => {
    let cloneListBill = []
    let key_id = e.target.getAttribute("key_id");
    if (key_id == "tatca") {
      setValueCategory("Tất cả");
      setVisibleTooltipCategory(false);
      cloneListBill =[...listMerchandise]
      handleFilter(cloneListBill);
      return;
    } else {
      let valueCategory = listCategory.filter(
        (category) => category._id == key_id
      )[0].name;
      setValueCategory(valueCategory);
      setVisibleTooltipCategory(false);
      cloneListBill =[...listMerchandise.filter((merchandise)=>{
        if (merchandise.category) {
          return  merchandise.category._id ==  key_id 
        }
      })]
      handleFilter(cloneListBill);

      return;
    }
  };

  const contentTooltipCategory = (
    <div className="popover-category">
      {listCategory.map((category) => (
        <span
          onClick={handleSelectValueTootltipCategory}
          key_id={category._id ? category._id : "tatca"}
        >
          {category.name}
        </span>
      ))}
    </div>
  );

  return (
    <div className="sectiontab-list-merchandise">
      <div className="card-info">
        <h4>
          <InfoCircleOutlined /> Thông tin
        </h4>
        <div>
          <span>Hàng hóa</span>
          <span>{listMerchandise.length}</span>
        </div>
        <div>
          <span>Tồn kho</span>
          <span>
            {
              listMerchandise.filter((merchandise) => merchandise.inventory > 0)
                .length
            }
          </span>
        </div>
        <div>
          <span>Hết hàng</span>
          <span>
            {
              listMerchandise.filter(
                (merchandise) => merchandise.inventory <= 0
              ).length
            }
          </span>
        </div>
      </div>
      <div className="card-action-category">
        <h4>Nhóm hàng</h4>
        <div>
          <Popover
            content={contentTooltipCategory}
            trigger="click"
            placement="right"
            visible={visibleTooltipCategory}
          >
            <Input
              type="button"
              value={valueCategory}
              bordered={false}
              className="input-category"
              onClick={() => setVisibleTooltipCategory(!visibleTooltipCategory)}
            />
          </Popover>
          <SwapOutlined className="icon-symbol" />
        </div>
      </div>
      <div className="card-action-inventory">
        <h4>Tồn kho</h4>
        <div>
          <Radio.Group onChange={handleChangeTypeBillWithPaid}>
            <Radio value="tatca" key="r_tatca">
              Tất cả
            </Radio>
            <Radio value="conhang" key="r_conhang">
              Còn hàng
            </Radio>
            <Radio value="hethang" key="r_hethang">
              Hết hàng
            </Radio>
          </Radio.Group>
        </div>
      </div>
      <div className="card-action-sort-inventory">
        <h4>Số lượng hàng tồn</h4>
        <div>
          <Radio.Group onChange={handleChangeTypeBillWithBuyer}>
            <Radio value="tangdan" key="r_tangdan-inventory">
              Tăng dần
            </Radio>
            <Radio value="giamdan" key="r_giamdan-inventory">
              Giảm dần
            </Radio>
          </Radio.Group>
        </div>
      </div>
      <div className="card-action-total-money-buy">
        <h4>Giá nhập</h4>
        <div>
          <Radio.Group onChange={handleChangeTypeBillWithToTalMoney}>
            <Radio value="tangdan" key="r_tangdan-input">
              Tăng dần
            </Radio>
            <Radio value="giamdan" key="r_giamdan-input">
              Giảm dần
            </Radio>
          </Radio.Group>
        </div>
      </div>
      <div className="card-action-total-money-sell">
        <h4>Giá bán</h4>
        <div>
          <Radio.Group onChange={handleChangeTypeBillWithToTalMoney}>
            <Radio value="tangdan" key="r_tangdan-output">
              Tăng dần
            </Radio>
            <Radio value="giamdan" key="r_giamdan-output">
              Giảm dần
            </Radio>
          </Radio.Group>
        </div>
      </div>
    </div>
  );
};

export default SectionCategoryMerchandise;
