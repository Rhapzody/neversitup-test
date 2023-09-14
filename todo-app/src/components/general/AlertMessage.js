import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Alert } from "antd";

const AlertMessage = forwardRef((props, ref) => {
  const [alertProps, setAlertProps] = useState({
    message: "",
    description: "",
    type: "",
  });
  const [show, setShow] = useState(false);
  useImperativeHandle(
    ref,
    () => {
      return {
        success({ message, description }) {
          setAlertProps({ message, description, type: "success" });
          setShow(true);
        },
        info({ message, description }) {
          setAlertProps({ message, description, type: "info" });
          setShow(true);
        },
        warning({ message, description }) {
          setAlertProps({ message, description, type: "warning" });
          setShow(true);
        },
        error({ message, description }) {
          setAlertProps({ message, description, type: "error" });
          setShow(true);
        },
      };
    },
    []
  );

  if (show) {
    return (
      <div className="position-fixed" style={{ top: "16px", right: "16px" }}>
        <Alert
          closable
          onClose={() => {
            setShow(false);
          }}
          showIcon
          {...alertProps}
        />
      </div>
    );
  } else {
    return null;
  }
});

export default AlertMessage;
