"use client";

import ApiRoutes from "@/constants/ApiRoutes";
import useApi from "@/lib/api/useApi";
import { IUser, IUserData } from "@/types/response-types/users";
import Table from "../Table/Table";
import { Button } from "../ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Plus, UserRoundMinus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CaretDownIcon } from "@radix-ui/react-icons";
import useMutation from "@/lib/api/useMutation";
import { toast } from "sonner";
import AddEditMemberDrawer from "./AddEditMemberDrawer";

const Home = () => {
    const {
        camelCaseData: users,
        isLoading: isUsersLoading,
        refetch: refetchUsers,
    } = useApi<IUserData>({
        url: ApiRoutes.users,
        queryKey: ["get_users_table"],
    });

    const { mutate: deleteUser, isPending: isDeleting } = useMutation({
        method: "delete",
    });

    const { mutate: updateUserRole, isPending: isUpdatingRole } = useMutation({
        method: "put",
    });

    const handleDeleteUser = (uid: string) => {
        deleteUser(
            {
                mutationOptions: {
                    overrideUrl: `${ApiRoutes.users}/${uid}`,
                },
            },
            {
                onSuccess: () => {
                    refetchUsers();
                    toast.success("Removed");
                },
            }
        );
    };

    const handleUpdateRole = (id: string, newRole: IUser["role"]) => {
        updateUserRole(
            {
                mutationOptions: {
                    overrideUrl: `${ApiRoutes.users}/${id}`,
                },
                body: JSON.stringify({ role: newRole }),
            },
            {
                onSuccess: () => {
                    refetchUsers();
                    toast.success("Updated");
                },
            }
        );
    };
    const columns: ColumnDef<IUser, any>[] = [
        {
            accessorKey: "name",
            id: "name",
            header: "",
            enableSorting: false,
            maxSize: 10,
            size: 10,
            cell: ({ row }) => {
                const avatarUrl = row.original.avatar;
                const name = row.original.name;
                return (
                    <div className="flex items-center gap-2">
                        <Avatar>
                            <AvatarImage src={avatarUrl} />
                            <AvatarFallback>
                                {name.substring(0, 1)}
                            </AvatarFallback>
                        </Avatar>{" "}
                        <span>{name}</span>
                    </div>
                );
            },
        },
        {
            accessorKey: "metadata.private.email",
            id: "metadata.private.email",
            header: "",
            enableSorting: false,
            filterFn: "includesString",
        },

        {
            accessorKey: "action",
            id: "action",
            header: "",
            maxSize: 10,
            enableSorting: false,
            cell: ({ row }) => {
                return (
                    <div className="whitespace-nowrap flex justify-center items-center gap-x-3">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="secondary"
                                    disabled={isUpdatingRole}
                                    className="min-w-[110px] capitalize"
                                >
                                    {row.original.role} <CaretDownIcon />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                    onClick={() =>
                                        handleUpdateRole(
                                            row.original.uid,
                                            "admin"
                                        )
                                    }
                                >
                                    Admin
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() =>
                                        handleUpdateRole(
                                            row.original.uid,
                                            "member"
                                        )
                                    }
                                >
                                    Member
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <AddEditMemberDrawer mode="edit" user={row.original}>
                            <Button variant="ghost" size="icon" title="edit">
                                <Edit size={12} className="text-primary" />
                            </Button>
                        </AddEditMemberDrawer>
                        <Button
                            variant="ghost"
                            size="icon"
                            disabled={isDeleting}
                            title="delete"
                            onClick={() => handleDeleteUser(row.original.uid)}
                        >
                            <UserRoundMinus
                                size={12}
                                className="text-destructive"
                            />
                        </Button>
                    </div>
                );
            },
        },
    ];
    return (
        <Table
            columns={columns}
            data={users?.data ?? []}
            isLoading={isUsersLoading}
            withSearch
            withHeader={false}
            title={
                <div>
                    <span className="text-muted-foreground">
                        Manage members access
                    </span>
                    <h2 className="font-semibold text-3xl">Members</h2>
                </div>
            }
            topActions={
                <div>
                    <AddEditMemberDrawer mode="add">
                        <Button>
                            <Plus size={15} />
                            Add member
                        </Button>
                    </AddEditMemberDrawer>
                </div>
            }
        />
    );
};

export default Home;
