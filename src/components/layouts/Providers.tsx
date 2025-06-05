"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { PropsWithChildren, Suspense } from "react";
import { ThemeProvider, ThemeProviderProps } from "next-themes";
import { Toaster as Sooner } from "@/components/ui/sonner";

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
        <Suspense>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider {...theme}>
                    {children}
                    <Sooner />
                </ThemeProvider>
            </QueryClientProvider>
        </Suspense>
    );
};

export default Providers;
