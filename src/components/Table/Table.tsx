'use client';
import { Table as RadixTable, TableBody, TableCell, TableRow } from '@/components/ui/table';
import {
    ColumnDef,
    ColumnFiltersState,
    InitialTableState,
    // SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { ReactNode, useEffect, useState } from 'react';
import { TablePagination } from './TablePagination';
import { TableViewOptions } from './TableViewOptions';
import TableNoData from './TableNoData';
import { TFilters } from './types';
import { TableHeader } from './TableHeader';
import { cn, fakeArray } from '@/lib/utils';
import { Skeleton } from '../ui/skeleton';
import React from 'react';
import Config from '@/constants/Config';

interface ITableProps<T extends object> {
    columns: ColumnDef<T>[];
    data: T[];
    isLoading?: boolean;
    withSearch?: boolean;
    filters?: TFilters;
    withHideColumn?: boolean;
    topActions?: ReactNode;
    defaultPageSize?: 5 | 10 | 20 | 30 | 40 | 50;
    initialState?: InitialTableState;
    withSort?: boolean;
    withPagination?: boolean;
    title?: ReactNode;
    withHeader?: boolean;
}
const Table = <T extends object = any>(props: ITableProps<T>) => {
    const {
        columns,
        data,
        isLoading,
        filters,
        withHideColumn,
        topActions,
        initialState,
        defaultPageSize = Config.DEFAULT_TABLE_PAGE_SIZE,
        withSearch = false,
        withSort = true,
        withPagination = true,
        title,
        withHeader = true,
    } = props;
    // const [sorting, setSorting] = useState<SortingState>(initialState?.sorting ?? []);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});
    const table = useReactTable({
        data,
        columns,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        initialState,
        state: {
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });
    const pageSize = table.getState().pagination.pageSize;

    useEffect(() => {
        table.setPageSize(defaultPageSize);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='w-full'>
            <TableViewOptions
                table={table}
                withSearch={withSearch}
                filters={filters}
                withHideColumn={withHideColumn}
                topActions={topActions}
                title={title}
            />
            <div className='rounded-md border'>
                <RadixTable>
                    {withHeader && <TableHeader table={table} withSort={withSort} />}
                    <TableBody>
                        {isLoading ? (
                            fakeArray(pageSize).map(i => {
                                return (
                                    <TableRow key={i}>
                                        {fakeArray(table.getAllColumns().length).map(i => (
                                            <TableCell key={i} className='bg-white'>
                                                <Skeleton className='my-2 h-5 !w-full' />
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                );
                            })
                        ) : (
                            <>
                                {data && data.length > 0 && table?.getRowModel()?.rows?.length ? (
                                    table.getRowModel().rows.map((row, i) => (
                                        <TableRow
                                            // className={cn(
                                            //     i % 2 === 0 && "bg-muted"
                                            // )}
                                            key={row.id}
                                            data-state={row.getIsSelected() && 'selected'}
                                        >
                                            {row.getVisibleCells().map(cell => (
                                                <TableCell
                                                    key={cell.id}
                                                    style={{
                                                        width: cell.column.getSize(),
                                                    }}
                                                    width={cell.column.getSize()}
                                                >
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableNoData colSpan={columns.length} />
                                )}
                            </>
                        )}
                    </TableBody>
                </RadixTable>
            </div>
            {withPagination && data && data.length > 0 && (
                <div className='ml-auto flex w-full items-center justify-start py-4'>
                    <TablePagination table={table} dataCount={data.length} />
                </div>
            )}
        </div>
    );
};

export default Table;
