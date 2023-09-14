import { Modal, Typography } from "antd";
import moment from "moment";
import React, { forwardRef, useImperativeHandle, useMemo, useState } from "react";

const ViewTodoModal = forwardRef(({}, ref) => {
  const [show, setShow] = useState(false);
  const [todo, setTodo] = useState({
    _id: "",
    title: "",
    description: "",
    createdAt: "",
    updatedAt: "",
  });

  useImperativeHandle(
    ref,
    () => {
      return {
        show() {
          setShow(true);
        },
        close() {
          setShow(false);
        },
        setTodo(todo) {
          setTodo(todo);
        },
      };
    },
    []
  );

  const formattedCreateDate = useMemo(() => {
    return moment(new Date(todo.createdAt)).format("DD MMM YYYY, HH:mm");
  }, [todo]);

  const formattedUpdateDate = useMemo(() => {
    return moment(new Date(todo.updatedAt)).format("DD MMM YYYY, HH:mm");
  }, [todo]);


  return (
    <Modal
      title={todo.title}
      open={show}
      onCancel={() => {
        setShow(false);
      }}
      onOk={() => {
        setShow(false);
      }}
    >
      <div>
        <div>
          <div className="mb-3">{todo.description}</div>
          <div>Created At: {formattedCreateDate}</div>
          <div>Update At: {formattedUpdateDate}</div>
        </div>
      </div>
    </Modal>
  );
});

export default ViewTodoModal;
