import axios from "axios";

const apiUrl = " https://gcp-mock.apiwiz.io/v1/tasks";
const apiKey = "b4349714-47c7-4605-a81c-df509fc7e653";

export const getTasksService = async () => {
  const config = {
    headers: {
      "x-tenant": apiKey,
    },
  };
  return axios.get(apiUrl, config);
};
