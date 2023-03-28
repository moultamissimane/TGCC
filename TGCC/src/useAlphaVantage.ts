// @ts-ignore
import useSWR, { responseInterface } from "swr";
import { fetcher } from "./Axios";

interface SeriesData {
    [key: string]: {
        [key: string]: string;
    };
}

const useAlphaVantage = (params: string): Array<{ x: string; y: string[] }> | null => {
    const { data: seriesData, error: seriesError } = useSWR(
        ["/query", params],
        fetcher,
        {
            refreshInterval: 20000,
        }
    ) as responseInterface<SeriesData, Error>;

    if (seriesError) return null;

    if (seriesData) {
        const data = seriesData["Time Series (Daily)"];

        if (!data) return null;

        const series = Object.keys(data).map((key) => {
            const values = Object.values(data[key]);
            values.pop();
            return {
                x: key,
                y: values,
            };
        });
        // @ts-ignore
        return series;
    }

    return null;
};

export default useAlphaVantage;