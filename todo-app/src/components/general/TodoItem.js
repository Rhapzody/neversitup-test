import {
  DeleteOutlined,
  EditOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Button, Popconfirm, Tooltip } from "antd";
import moment from "moment";
import React, { useMemo } from "react";

function TodoItem({
  onView = () => {},
  onEdit = () => {},
  onDelete = () => {},
  _id,
  title,
  description,
  createdAt,
  updatedAt,
  user_id,
}) {
  const formattedCreateDate = useMemo(() => {
    return moment(new Date(createdAt)).format("DD MMM YYYY, HH:mm");
  }, [createdAt]);

  return (
    <div
      className="to-do-item rounded shadow-sm p-2 mb-2 border"
      onClick={() => {
        onView({ _id, title, description, createdAt, updatedAt, user_id });
      }}
    >
      <Tooltip title={title} className="min-w-0">
        <div className="todo-title">{title}</div>
        <div className="todo-create-date">{formattedCreateDate}</div>
      </Tooltip>

      <div className="todo-actions">
        <Tooltip title="Edit">
          <Button
            className="me-2"
            type="default"
            shape="circle"
            icon={<EditOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              onEdit({ _id, title, description });
            }}
          ></Button>
        </Tooltip>

        <Tooltip title="Delete">
          <Popconfirm
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            title="Delete the todo"
            description="Are you sure to delete this todo?"
            okText="Yes"
            cancelText="No"
            onCancel={(e) => {
                e.stopPropagation();
              }}
            onConfirm={(e) => {
              e.stopPropagation();
              onDelete(_id);
            }}
          >
            <Button
              onClick={(e) => {
                e.stopPropagation();
              }}
              danger
              shape="circle"
              icon={<DeleteOutlined />}
            ></Button>
          </Popconfirm>
        </Tooltip>
      </div>
    </div>
  );
}

export default TodoItem;
