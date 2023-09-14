import Cookies from "js-cookie";
import { api } from "../services/api";

export const login = ({ username, password }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await api.loginTodoApp({ username, password });
      const token = response.data.token;
      Cookies.set("token", token);
      resolve(token);
    } catch (error) {
      reject(error);
    }
  });
};

export const clearToken = () => {
    Cookies.remove("token")
}

export const isAuth = () => {
    return !!Cookies.get("token")
}
