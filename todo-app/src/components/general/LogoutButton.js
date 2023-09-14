import { LogoutOutlined } from "@ant-design/icons";
import { FloatButton, Tooltip } from "antd";
import React from "react";
import { clearToken } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

function LogoutButton({ style = {}, ...otherProps }) {
  const navigate = useNavigate();
  return (
    <Tooltip title={"Logout"} className="min-w-0">
      <FloatButton
        onClick={() => {
          clearToken();
          navigate("/login");
        }}
        icon={<LogoutOutlined />}
        style={{ ...style, left: "16px", bottom: "16px" }}
        {...otherProps}
      />
    </Tooltip>
  );
}

export default LogoutButton;
