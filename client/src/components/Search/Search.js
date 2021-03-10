import React, { useState, useEffect } from "react";
import { Select, Button } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import "./Search.scss";

const SearchBuyer = ({
  listBuyer,
  valueSelectBuyer,
  valueSelectPartner,
  typeSearch,
  listPartner,
}) => {
  const handleSearch = (value) => {
    return [];
  };

  const showListSelect = (list, valueSelect, infoCode) => {
    return list.map((person, i) => (
      <Select.Option key={i} value={person._id}>
        <div
          style={{ display: "flex", justifyContent: "space-between" }}
          onClick={() =>
            valueSelect({
              _id: person._id,
              name: person.name,
              phone: person.phone,
              address: person.address,
              code:person.code
            })
          }
        >
          <div style={{ marginLeft: "15px" }}>
            <div className="info-buyer">
              <span style={{ fontSize: "13px", fontWeight: "600" }}>
                {person.name}
                {person.address ? " - " + person.address : ""}
              </span>
            </div>
            <div>
              <span style={{ fontSize: "13px" }}>{infoCode + person.code}</span>
              <span style={{ padding: "5px" }}>-</span>
              <span style={{ fontSize: "13px" }}>
                {person.phone ? person.phone : "Chưa cập nhật SĐT"}
              </span>
            </div>
          </div>
        </div>
      </Select.Option>
    ));
  };

  return (
    <div className="search-buyer">
      <div className="input-select">
        <div className="input-search__icon">
          <SearchOutlined />
        </div>
        <Select
          placeholder={
            typeSearch === "partner"
              ? "Tìm đối tác"
              : "Tìm khách hàng"
          }
          showSearch
          showArrow={false}
          onSearch={handleSearch}
          suffixIcon={<SearchOutlined />}
          bordered={false}
        >
          {typeSearch === "partner"
            ? showListSelect(listPartner, valueSelectPartner, "NCC")
            : showListSelect(listBuyer, valueSelectBuyer, "KH")}
        </Select>
      </div>

      <div className="btn-add__buyer">
        <Button className="btn" icon={<PlusOutlined />} />
      </div>
    </div>
  );
};

export default SearchBuyer;
