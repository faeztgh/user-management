export interface IUserData {
    data: IUser[];
    meta: Meta;
}

export interface IUser {
    uid: string;
    name: string;
    avatar: string;
    status: string;
    role: string;
    lastActiveAt: number;
    createdAt: number;
    metadata?: {
        private?: {
            email?: string;
        };
    };
}

export interface Meta {
    pagination: Pagination;
    cursor: Cursor;
}

export interface Pagination {
    total: number;
    count: number;
    per_page: number;
    current_page: number;
    total_pages: number;
}

export interface Cursor {
    updatedAt: number;
    affix: string;
}
