import React, { useState, useEffect } from "react";
import { Select, Button } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import "./SearchBuyer.scss";

const SearchBuyer = ({ listBuyer,valueSelectBuyer }) => {
  const handleSearch = (value) => {
    return [];
  };

  return (
    <div className="search-buyer">
      <div className="input-select">
        <div className="input-search__icon">
          <SearchOutlined />
        </div>
        <Select
          placeholder="Tìm khách hàng (F4)"
          showSearch
          showArrow={false}
          onSearch={handleSearch}
          suffixIcon={<SearchOutlined />}
          bordered={false}
        >
          {listBuyer.length > 0
            ? listBuyer.map((buyer) => (
                <Select.Option key={buyer._id} value={buyer._id}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                    onClick={()=>valueSelectBuyer({_id:buyer._id,name:buyer.name,phone:buyer.phone,address:buyer.address})}
                  >
                    <div style={{ marginLeft: "15px" }}>
                      <div className="info-buyer">
                        <span style={{ fontSize: "13px", fontWeight: "600" }}>
                          {buyer.name}{buyer.address ? " - " + buyer.address : ""}
                        </span>
                      </div>
                      <div>
                        <span style={{ fontSize: "13px" }}>
                          {"KH" + buyer.code}
                        </span>
                        <span style={{ padding:"5px" }}>-</span>
                        <span style={{ fontSize: "13px" }}>
                          {buyer.phone ? buyer.phone : "Chưa cập nhật SĐT"}
                        </span>
                      </div>
    
                    </div>
                  </div>
                </Select.Option>
              ))
            : []}
        </Select>
      </div>

      <div className="btn-add__buyer">
        <Button className="btn" icon={<PlusOutlined />} />
      </div>
    </div>
  );
};

export default SearchBuyer;
