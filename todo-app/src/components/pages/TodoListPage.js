import React, { useEffect, useRef, useState } from "react";
import Layout from "../layout/Layout";
import CreateToDoButton from "../general/CreateToDoButton";
import { Input, Modal, DatePicker, Spin } from "antd";
import EmptyTodoList from "../general/EmptyTodoList";
import TodoItem from "../general/TodoItem";
import AlertMessage from "../general/AlertMessage";
import useTodoList from "../hooks/useTodoList";
import useTodoAction from "../hooks/useTodoAction";
import { getErrorMessage } from "../../utils";
import CreateTodoModal from "../general/CreateTodoModal";
import EditTodoModal from "../general/EditTodoModal";
import ViewTodoModal from "../general/ViewTodoModal";
import LogoutButton from "../general/LogoutButton";

function TodoListPage() {
  const alertRef = useRef();
  const createTodoModalRef = useRef();
  const updateTodoModalRef = useRef();
  const viewTodoModalRef = useRef();
  const { filteredTodoList } = useTodoList();
  const {
    deleteTodo,
    fetchTodoList,
    getTodoDetail,
    filterDateRange,
    filterTitle,
    setFilterDateRange,
    setFilterTitle,
  } = useTodoAction();

  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setIsFetching(true);
        await fetchTodoList();
        setIsFetching(false);
      } catch (error) {
        setIsFetching(false);
        const message = getErrorMessage(error);
        alertRef.current.error(message);
      }
    })();
  }, []);

  const handleClickDeleteTodo = async (id) => {
    try {
      await deleteTodo({ id });
      alertRef.current.success({ message: "Delete Todo Successfully" });
    } catch (error) {
      const message = getErrorMessage(error);
      alertRef.current.error({ message });
    }
  };

  const handleClickEditTodo = async (todo) => {
    updateTodoModalRef.current.setTodo(todo);
    updateTodoModalRef.current.show();
  };

  const handleClickViewTodo = async (todo) => {
    viewTodoModalRef.current.setTodo(todo);
    viewTodoModalRef.current.show();
  };

  return (
    <Layout>
      <Input.Search
        placeholder="Search by title"
        allowClear
        size="middle"
        value={filterTitle}
        onChange={(e) => {
          setFilterTitle(e.target.value);
        }}
        onSearch={(text) => {
          setFilterTitle(text);
        }}
        className="mb-2"
      />

      <DatePicker.RangePicker
        showTime
        value={filterDateRange}
        onChange={(val) => {
          setFilterDateRange(val);
        }}
        className="w-100 mb-2"
      />

      <Spin tip="Loading" size="large" spinning={isFetching}>
        <div className="todo-list-container py-2">
          {filteredTodoList.length === 0 && !isFetching ? (
            <EmptyTodoList />
          ) : null}
          {filteredTodoList.map((todo) => {
            const { _id } = todo;
            return (
              <TodoItem
                key={_id}
                {...todo}
                onDelete={handleClickDeleteTodo}
                onEdit={handleClickEditTodo}
                onView={handleClickViewTodo}
              />
            );
          })}
        </div>
      </Spin>

      <CreateToDoButton
        onClick={() => {
          createTodoModalRef.current.show();
        }}
      />

      <AlertMessage ref={alertRef} />
      <CreateTodoModal ref={createTodoModalRef} alertMessageRef={alertRef} />
      <EditTodoModal ref={updateTodoModalRef} alertMessageRef={alertRef} />
      <ViewTodoModal ref={viewTodoModalRef} />

      <LogoutButton/>

    </Layout>
  );
}

export default TodoListPage;
