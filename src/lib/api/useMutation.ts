import { useMutation as reactQueryUseMutation } from "@tanstack/react-query";
import apiClient from "./http-common";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { redirect } from "next/navigation";

export interface UseMutationProps extends AxiosRequestConfig {
    url?: string;
    retry?: true | number;
    method: "post" | "put" | "delete" | "get" | "patch";
    params?: any;
    headers?: any;
    onError?: (err: any) => void;
}

export interface MutationFunctionParams extends Object {
    mutationOptions?: {
        overrideUrl?: string;
    };
    body?: any;
}
const apikey = process.env.NEXT_PUBLIC_APP_REST_API_KEY;
const useMutation = <T = any>(props: UseMutationProps) => {
    const {
        url,
        method,
        retry,
        params,
        headers = {},
        baseURL = process.env.NEXT_PUBLIC_APP_API_URL,
    } = props;
    const mutationResult = reactQueryUseMutation<
        T,
        AxiosError,
        MutationFunctionParams
    >({
        mutationFn: async (variables: MutationFunctionParams): Promise<T> => {
            const { mutationOptions, body } = variables;
            const response: AxiosResponse<T> = await apiClient.request<T>({
                ...props,
                url: mutationOptions?.overrideUrl ?? url,
                params,
                method,
                data: body,
                headers: {
                    ...headers,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    apikey,
                },
                baseURL: baseURL ?? process.env.NEXT_PUBLIC_APP_API_URL,
            });
            return response.data; // Return only the data
        },

        retry,
    });

    return { ...mutationResult };
};

export default useMutation;
