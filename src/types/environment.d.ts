declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_PUBLIC_APP_API_URL: string;
            NEXT_PUBLIC_APP_REST_API_KEY: string;
        }
    }
}

export {};
