// export const baseURL = process.env.BACKEND_URL + "/api";

export const baseURL = "/api";

import { Keys } from "@/@types/keys";
import axios, { CreateAxiosDefaults } from "axios";

const client = axios.create({
  baseURL,
});

export default client;

type headers = CreateAxiosDefaults<any>["headers"];

export const getClient = async (headers?: headers) => {
  const token = localStorage.getItem(Keys.AUTH_TOKEN);

  if (!token) return axios.create({ baseURL });

  const defaultHeaders = {
    Authorization: "Bearer " + token,
    ...headers,
  };

  return axios.create({ baseURL, headers: defaultHeaders });
};
