export type CamelCasedObjectHelper<T> = {
    [K in keyof T as K extends string ? CamelCased<K> : never]: T[K];
};

export type CamelCasedArrayHelper<T> = Array<CamelCasedObjectHelper<T>>;

type CamelCased<S extends string> = S extends `${infer P}_${infer Q}${infer R}`
    ? `${Lowercase<P>}${Uppercase<Q>}${CamelCased<`${R}`>}`
    : S;
