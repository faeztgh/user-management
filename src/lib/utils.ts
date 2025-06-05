import { CamelCasedObjectHelper } from "@/types/helpers";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function camelCase(str: string): string {
    return str
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase()) // Capitalize after non-alphanumeric
        .replace(/^[A-Z]/, (char) => char.toLowerCase()); // Ensure first letter is lowercase
}

export const makeArrayCamelCase = <T = Record<string, any>>(
    inputs: Array<Record<string, any>>
): Array<CamelCasedObjectHelper<T>> =>
    inputs.map((inp) => {
        if (Array.isArray(inp)) return makeArrayCamelCase(inp);
        if (typeof inp === "object") return makeObjectCamelCase(inp);
        return inp;
    }) as unknown as Array<CamelCasedObjectHelper<T>>;

export const makeObjectCamelCase = <T extends object = object>(
    inp: Record<string, any>
): T & Record<string, any> => {
    const result = {} as any;
    for (const item in inp)
        result[camelCase(item)] = getCCValueHelper(inp[item]);
    return result;
};
export const getCCValueHelper = (val: any): any => {
    if (val === null) return null;
    if (Array.isArray(val)) return makeArrayCamelCase(val);
    if (typeof val === "object") return makeObjectCamelCase(val);
    return val;
};

export const fakeArray = (length: number): Array<number> =>
    Array.from({ length }, (_, index) => index + 1);

