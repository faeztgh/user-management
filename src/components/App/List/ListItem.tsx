import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { UserRoundMinus } from "lucide-react";
import { IUser } from "@/types/response-types/users";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { VirtualItem } from "@tanstack/react-virtual";
import useMutation from "@/lib/api/useMutation";
import { toast } from "sonner";
import ApiRoutes from "@/constants/ApiRoutes";
interface IListItemProps {
    user: IUser;
    virtualRow: VirtualItem;
    refetchUsers: () => void;
}

const ListItem = (props: IListItemProps) => {
    const { user, virtualRow, refetchUsers } = props;
    const { role, uid, name, avatar } = user;

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
                    toast("Removed");
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
                    toast("Updated");
                },
            }
        );
    };

    return (
        <div
            key={uid}
            className={cn(
                "flex justify-between py-3 px-5 items-center border-b",
                virtualRow.index === 0 ? "border-t" : "border-t-0"
            )}
        >
            <div className="items-center gap-2 flex ">
                <Avatar className="w-fit">
                    <AvatarImage src={avatar} />
                    <AvatarFallback>{name.substring(0, 1)}</AvatarFallback>
                </Avatar>{" "}
                <span className=" min-w-[200px] w-fit">{name}</span>
                {user?.metadata?.private?.email && (
                    <span className="text-muted-foreground ml-8">
                        {user?.metadata?.private?.email}
                    </span>
                )}
            </div>
            <div className="whitespace-nowrap flex justify-center items-center gap-x-3">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild disabled={isUpdatingRole}>
                        <Button variant="secondary">
                            {role} <CaretDownIcon />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem
                            onClick={() => handleUpdateRole(uid, "admin")}
                        >
                            Admin
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => handleUpdateRole(uid, "member")}
                        >
                            Member
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Button
                    variant="ghost"
                    size="icon"
                    disabled={isDeleting}
                    onClick={() => handleDeleteUser(uid)}
                    title="delete"
                >
                    <UserRoundMinus size={12} className="" />
                </Button>
            </div>
        </div>
    );
};

export default ListItem;
