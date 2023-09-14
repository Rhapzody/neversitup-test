import  { useContext } from "react";
import { TodoAppContext } from "../context/TodoAppContext";
import { api } from "../../services/api";

function useTodoAction() {
  const {
    setTodoList,
    filterTitle,
    setFilterTitle,
    filterDateRange,
    setFilterDateRange,
  } = useContext(TodoAppContext);

  const fetchTodoList = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await api.getTodoList();
        const list = res.data;
        setTodoList(list);
        resolve(list);
      } catch (error) {
        reject(error);
      }
    });
  };

  const getTodoDetail = ({ id }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await api.getTodoDetail({ id });
        const todo = res.data;
        resolve(todo);
      } catch (error) {
        reject(error);
      }
    });
  };

  const createTodo = ({ title, description }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await api.createTodo({ title, description });
        const createdTodo = res.data;
        fetchTodoList();
        resolve(createdTodo);
      } catch (error) {
        reject(error);
      }
    });
  };

  const updateTodo = ({ id, title, description }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await api.updateTodo({ id, title, description });
        const updatedTodo = res.data;
        fetchTodoList();
        resolve(updatedTodo);
      } catch (error) {
        reject(error);
      }
    });
  };

  const deleteTodo = ({ id }) => {
    return new Promise(async (resolve, reject) => {
      try {
        await api.deleteTodo({ id });
        fetchTodoList();
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };

  return {
    filterTitle,
    setFilterTitle,

    filterDateRange,
    setFilterDateRange,

    fetchTodoList,
    getTodoDetail,
    createTodo,
    updateTodo,
    deleteTodo,
  };
}

export default useTodoAction;
