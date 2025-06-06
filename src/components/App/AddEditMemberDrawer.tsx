"use client";
import React, { ReactNode } from "react";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import AddEditMemberForm from "./List/AddEditMember.form";
import { IUser } from "@/types/response-types/users";

interface IAddEditMemberDrawerProps {
    children: ReactNode;
    mode: "add" | "edit";
    user?: IUser;
}
const AddEditMemberDrawer = (props: IAddEditMemberDrawerProps) => {
    const { children, mode, user } = props;
    return (
        <Drawer>
            <DrawerTrigger className="cursor-pointer" asChild>
                {children}
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle className="capitalize">
                        {mode} member
                    </DrawerTitle>
                    <DrawerDescription className="hidden">
                        {mode} member
                    </DrawerDescription>
                </DrawerHeader>
                <AddEditMemberForm mode={mode} user={user} />
            </DrawerContent>
        </Drawer>
    );
};

export default AddEditMemberDrawer;
