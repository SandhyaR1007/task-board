import axios from "axios";

export const getTasksService = async () => {
  console.log(import.meta.env.VITE_BASE_URL);
  return axios.get(`${import.meta.env.VITE_BASE_URL}/task`, {});
};
