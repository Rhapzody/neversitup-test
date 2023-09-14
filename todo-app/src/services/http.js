import axios from "axios";
import jsCookie from "js-cookie";
const getDefaultConfig = () => {
  const token = jsCookie.get("token");

  return {
    baseURL: process.env.REACT_APP_API_HOST,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  };
};

export const http = {
  post: ({ path, params, config }) => {
    return axios.post(path, params, { ...getDefaultConfig(), config });
  },
  get: ({ path, config }) => {
    return axios.get(path, { ...getDefaultConfig(), config });
  },
  delete: ({ path, config }) => {
    return axios.delete(path, { ...getDefaultConfig(), config });
  },
  put: ({ path, params, config }) => {
    return axios.put(path, params, { ...getDefaultConfig(), config });
  },
};
