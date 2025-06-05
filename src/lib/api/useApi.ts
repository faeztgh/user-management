import { useQuery } from "@tanstack/react-query";
import apiClient from "./http-common";
import { AxiosError, AxiosResponse } from "axios";
import { useMemo } from "react";
import { makeArrayCamelCase, makeObjectCamelCase } from "../utils";

type Props = {
    url: string;
    baseUrl?: string;
    queryKey: string[];
    params?: any;
    retry?: boolean | number;
    method?: "get";
    load?: boolean;
    refetchInterval?: number;
    onError?: (err: any) => void;
};

const useApi = <T>(props: Props) => {
    const {
        url,
        queryKey,
        params,
        refetchInterval,
        method = "get",
        retry = false,
        load = true,
        baseUrl,
    } = props;

    const apiResult = useQuery<AxiosResponse<T>, AxiosError>({
        queryKey: queryKey,
        queryFn: async ({ signal }) => {
            return await apiClient(url, {
                baseURL: baseUrl ?? process.env.NEXT_PUBLIC_APP_API_URL,
                method: method,
                params: params,
                headers: {
                    "Content-Type": "application/json",
                    apiKey: process.env.NEXT_PUBLIC_APP_REST_API_KEY,
                },
                signal,
            });
        },
        retry,
        refetchInterval,
        enabled: load,
        refetchOnWindowFocus: false,
    });

    const camelCaseData: T = useMemo(() => {
        let tempData;
        if (apiResult?.data?.data) {
            if (Array.isArray(apiResult.data.data)) {
                tempData = makeArrayCamelCase(apiResult.data.data);
            } else if (typeof apiResult.data.data === "object") {
                tempData = makeObjectCamelCase(apiResult.data.data);
            }
        }
        return tempData;
    }, [apiResult.data]);

    return {
        ...apiResult,
        camelCaseData: camelCaseData as typeof camelCaseData,
    };
};

export default useApi;
