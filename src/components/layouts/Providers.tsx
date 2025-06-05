import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { PropsWithChildren } from "react";
import { ThemeProvider, ThemeProviderProps } from "next-themes";

const queryClient = new QueryClient();
const theme: ThemeProviderProps = {
    attribute: "class",
    defaultTheme: "light",
    enableSystem: false,
    themes: ["light"],
};
const Providers = (props: PropsWithChildren) => {
    const { children } = props;
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider {...theme}>{children}</ThemeProvider>
        </QueryClientProvider>
    );
};

export default Providers;
