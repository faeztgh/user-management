import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { MoreHorizontal } from 'lucide-react';
import { CellContext } from '@tanstack/react-table';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TableActions = <T extends object = any>({ row }: { row: CellContext<T, unknown> }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='ghost' className='h-8 w-8 p-0'>
                    <span className='sr-only'>Open menu</span>
                    <MoreHorizontal className='h-4 w-4' />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <DropdownMenuLabel className='opacity-60'>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem className='text-red-500'>Delete</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export const tableActions = {
    enableHiding: false,
    enableGlobalFilter: false,
    enableColumnFilter: false,
    header: 'Actions',
    id: 'Actions',
    cell: ({ row }: any) => {
        return <TableActions row={row} />;
    },
};
