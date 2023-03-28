import axios, { AxiosResponse } from "axios";
import { API_URL } from "./config";

const axiosService = axios.create({
    baseURL: API_URL,
});

export async function fetcher(url: string, params: string): Promise<AxiosResponse> {
    const res = await axiosService
        .get(
            `${url}${params}&function=TIME_SERIES_DAILY&outputsize=compact&apikey=${process.env.REACT_APP_API_KEY}`
        );
    return res.data;
}

export default axiosService;