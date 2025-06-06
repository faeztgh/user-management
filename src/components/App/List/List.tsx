"use client";
import ApiRoutes from "@/constants/ApiRoutes";
import useApi from "@/lib/api/useApi";
import { IUser, IUserData } from "@/types/response-types/users";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../../ui/button";
import { Skeleton } from "../../ui/skeleton";
import { Plus } from "lucide-react";
import { fakeArray } from "@/lib/utils";
import { Input } from "../../ui/input";
import { useHotkeys } from "@mantine/hooks";
import HotKeys from "@/constants/HotKeys";
import ListItem from "./ListItem";
import AddEditMemberDrawer from "../AddEditMemberDrawer";

const List = () => {
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState(search);
    const parentRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [users, setUsers] = useState<IUser[]>([]);

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

    const { camelCaseData: fetchedUsers, isLoading: isUsersLoading } =
        useApi<IUserData>({
            url: `${ApiRoutes.users}?perPage=${
                currentPage * (users.length === 0 ? 20 : 10)
            }`,
            queryKey: ["get_users_list", currentPage.toString()],
        });

    const totalCount = fetchedUsers?.meta?.pagination?.total ?? 0;

    useEffect(() => {
        if (fetchedUsers?.data) {
            setUsers((prevUsers) => {
                const updatedUsers = [...prevUsers];

                fetchedUsers.data.forEach((newUser) => {
                    const index = updatedUsers.findIndex(
                        (existingUser) => existingUser.uid === newUser.uid
                    );

                    if (index !== -1) {
                        updatedUsers[index] = newUser;
                    } else {
                        updatedUsers.push(newUser);
                    }
                });

                return updatedUsers;
            });
        }
    }, [fetchedUsers]);

    const filteredUsers =
        users?.filter((user) => {
            const q = debouncedSearch?.toLowerCase();
            return (
                user.name.toLowerCase().includes(q) ||
                user.metadata?.private?.email?.toLowerCase().includes(q)
            );
        }) ?? [];

    useEffect(() => {
        const handleScroll = () => {
            if (parentRef.current) {
                const { scrollTop, scrollHeight, clientHeight } =
                    parentRef.current;
                const threshold = 500;

                if (
                    scrollHeight - scrollTop - clientHeight < threshold &&
                    users.length < totalCount
                ) {
                    setCurrentPage((prevPage) => prevPage + 1);
                }
            }
        };

        const refCurrent = parentRef.current;
        if (refCurrent) {
            refCurrent.addEventListener("scroll", handleScroll);
        }

        return () => {
            if (refCurrent) {
                refCurrent.removeEventListener("scroll", handleScroll);
            }
        };
    }, [filteredUsers.length, totalCount, users.length]);

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
                        {filteredUsers.length} members
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
                        <kbd className="absolute top-2 right-3 text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
                            <span className="text-xs">⌘</span>K
                        </kbd>
                    </div>
                    <AddEditMemberDrawer mode="add">
                        <Button>
                            <Plus size={15} />
                            Add member
                        </Button>
                    </AddEditMemberDrawer>
                </div>
            </div>

            {filteredUsers.length === 0 &&
            users.length === 0 &&
            fetchedUsers?.data?.length === 0 &&
            !isUsersLoading ? (
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
                    className="relative h-[70vh] overflow-auto rounded-md"
                    ref={parentRef}
                >
                    <div className="w-full">
                        {filteredUsers.map((user, index) => (
                            <ListItem
                                user={user}
                                key={user.uid + user.name}
                                index={index}
                            />
                        ))}
                    </div>
                    {isUsersLoading && (
                        <div>
                            {fakeArray(users.length === 0 ? 20 : 5).map(
                                (_, index) => (
                                    <div
                                        key={index}
                                        className="flex justify-between py-2 px-5 !m-0 items-center border-b"
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
                                )
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default List;
