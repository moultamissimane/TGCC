import axios, { AxiosResponse } from "axios";
import { API_URL } from "./api";

const axiosService = axios.create({
  baseURL: API_URL,
});

export function fetcher(url: string, params: string): Promise<AxiosResponse> {
  return axiosService
    .get(
      `${url}${params}&function=TIME_SERIES_DAILY&outputsize=compact&apikey=${process.env.REACT_APP_API_KEY}`
    )
    .then((res) => res.data);
}

export default axiosService;