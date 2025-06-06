import { ComponentType } from 'react';

export type TFilters = {
    id: string;
    title: string;
    options: {
        label: string;
        value: string;
        icon?: ComponentType<{
            className?: string;
        }>;
    }[];
}[];
