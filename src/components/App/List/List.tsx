"use client";
import ApiRoutes from "@/constants/ApiRoutes";
import useApi from "@/lib/api/useApi";
import { IUserData } from "@/types/response-types/users";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../../ui/button";
import { Skeleton } from "../../ui/skeleton";
import { Plus } from "lucide-react";
import { cn, fakeArray } from "@/lib/utils";
import { Input } from "../../ui/input";
import { useHotkeys } from "@mantine/hooks";
import HotKeys from "@/constants/HotKeys";
import ListItem from "./ListItem";
import { useVirtualizer } from "@tanstack/react-virtual";

const List = () => {
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState(search);
    const parentRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
        }, 800);
        return () => clearTimeout(handler);
    }, [search]);

    useHotkeys([
        [
            HotKeys.SEARCH,
            (event) => {
                event.preventDefault();
                searchInputRef.current?.focus();
            },
        ],
    ]);

    const {
        camelCaseData: users,
        isLoading: isUsersLoading,
        refetch: refetchUsers,
    } = useApi<IUserData>({
        url: `${ApiRoutes.users}?searchKey=${debouncedSearch}`,
        queryKey: ["get_users_list", debouncedSearch],
    });

    const rowVirtualizer = useVirtualizer({
        count: users?.data?.length || 0,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 100,
        overscan: 5,
    });

    if (isUsersLoading)
        return (
            <div className="space-y-4 mt-10">
                {fakeArray(20).map((_, i) => (
                    <div
                        key={i}
                        className={cn(
                            "flex justify-between py-2 px-5 !m-0 items-center border-b",
                            i === 0 ? "border-t" : "border-t-0"
                        )}
                    >
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <div className="space-y-1 flex justify-center items-center gap-x-5">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-3 w-48" />
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-8 w-20" />
                            <Skeleton className="h-8 w-8" />
                        </div>
                    </div>
                ))}
            </div>
        );
    console.log(users.data);
    return (
        <div>
            <div className="flex justify-between mb-8 items-end">
                <div>
                    <span className="text-muted-foreground">
                        Manage members access
                    </span>
                    <h2 className="font-semibold text-3xl">Members</h2>
                </div>

                <div className="flex justify-center gap-x-3 items-center">
                    <span className="text-muted-foreground">
                        {users.meta.pagination.count} members
                    </span>
                    <div className="relative">
                        <Input
                            placeholder={`search...`}
                            type="text"
                            className="mr-3"
                            ref={searchInputRef}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <kbd className=" absolute top-2 right-3 text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded  px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
                            <span className="text-xs">⌘</span>K
                        </kbd>
                    </div>
                    <Button>
                        <Plus size={15} />
                        Add member
                    </Button>
                </div>
            </div>
            {!users || users?.data?.length === 0 ? (
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center justify-center w-full py-20 gap-2">
                            <div className="space-y-1">
                                <h2 className="font-semibold text-3xl">
                                    No members found
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div
                    className="relative h-[70vh] overflow-auto  rounded-md"
                    ref={parentRef}
                >
                    <div
                        style={{
                            height: `${rowVirtualizer.getTotalSize()}px`,
                            position: "relative",
                        }}
                    >
                        {rowVirtualizer.getVirtualItems()?.map((virtualRow) => {
                            const user = users?.data?.[virtualRow.index];

                            return (
                                <ListItem
                                    user={user}
                                    key={user.uid}
                                    virtualRow={virtualRow}
                                    refetchUsers={refetchUsers}
                                />
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default List;
