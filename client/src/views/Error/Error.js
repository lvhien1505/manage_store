import React from "react";
import { SettingFilled } from "@ant-design/icons";

const Error = () => {
  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          width: "30%",
          position: "absolute",
          top: "35%",
          left: "35%",
          textAlign: "center",
        }}
      >
        <SettingFilled style={{ fontSize: "30px" }} />
        <div style={{ fontSize: "30px" }}> Page 404 not found !</div>
      </div>
    </div>
  );
};

export default Error;
