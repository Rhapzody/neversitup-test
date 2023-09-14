import { http } from "./http";

export const api = {
  getTodoList: () => {
    return http.get({
      path: "/todos",
    });
  },
  getTodoDetail: ({ id }) => {
    return http.get({
      path: `/todos/${id}`,
    });
  },
  createTodo: ({ title, description }) => {
    return http.post({
      path: "/todos",
      params: { title, description },
    });
  },
  updateTodo: ({ title, description, id }) => {
    return http.put({
      path: `/todos/${id}`,
      params: { title, description },
    });
  },
  deleteTodo: ({ id }) => {
    return http.delete({
      path: `/todos/${id}`,
    });
  },
  loginTodoApp: ({ username, password }) => {
    return http.post({
      path: `/users/auth`,
      params: { username, password },
    });
  },
};
