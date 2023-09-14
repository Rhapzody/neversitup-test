import { PlusOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import React from "react";

function CreateToDoButton({ style = {}, ...otherProps}) {
  return (
    <FloatButton
      icon={<PlusOutlined />}
      style={{ position: "absolute", right: "16px", bottom: "16px", ...style }}
      {...otherProps}
    />
  );
}

export default CreateToDoButton;
