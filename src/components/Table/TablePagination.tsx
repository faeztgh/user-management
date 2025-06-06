import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
} from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';

interface DataTablePaginationProps<TData> {
    table: Table<TData>;
    dataCount: number;
}

export function TablePagination<TData>({ table, dataCount }: DataTablePaginationProps<TData>) {
    const isAnyRowSelected = table.getFilteredSelectedRowModel().rows.length > 0;
    const withPagination = dataCount > 1;

    if (!withPagination) return <></>;
    return (
        <div className='flex w-fit items-center justify-between px-2'>
            <div className='flex-1 text-sm text-muted-foreground'>
                {isAnyRowSelected && (
                    <span>
                        {table.getFilteredSelectedRowModel().rows.length} of{' '}
                        {table.getFilteredRowModel().rows.length} row(s) selected.
                    </span>
                )}
            </div>

            <div className='flex items-center space-x-6 lg:space-x-8'>
                <div className='flex items-center gap-x-2'>
                    <p className='text-sm font-medium'>Rows per page</p>
                    <Select
                        value={`${table.getState().pagination.pageSize}`}
                        onValueChange={value => {
                            table.setPageSize(Number(value));
                        }}
                    >
                        <SelectTrigger className='h-8 w-[70px]'>
                            <SelectValue placeholder={table.getState().pagination.pageSize} />
                        </SelectTrigger>
                        <SelectContent side='top'>
                            {[5, 10, 20, 30, 40, 50].map(pageSize => (
                                <SelectItem key={pageSize} value={`${pageSize}`}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className='flex-center w-[100px] text-sm font-medium'>
                    page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                </div>
                <div className='flex items-center space-x-2'>
                    <Button
                        variant='outline'
                        className='hidden h-8 w-8 p-0 lg:flex'
                        title='go to last page'
                        aria-label='go to last page'
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <span className='sr-only'>go to last page</span>
                        <DoubleArrowLeftIcon className='h-4 w-4' />
                    </Button>

                    <Button
                        variant='outline'
                        className='h-8 w-8 p-0'
                        title='go to previous page'
                        araia-label='go to previous page'
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <span className='sr-only'>go to previous page</span>
                        <ChevronLeftIcon className='h-4 w-4' />
                    </Button>

                    <Button
                        variant='outline'
                        className='h-8 w-8 p-0'
                        title='go to next page'
                        aria-label='go to next page'
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <span className='sr-only'>go to next page'</span>
                        <ChevronRightIcon className='h-4 w-4' />
                    </Button>
                    <Button
                        variant='outline'
                        className='hidden h-8 w-8 p-0 lg:flex'
                        title='go to first page'
                        aria-label='go to first page'
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                    >
                        <span className='sr-only'>go to first page</span>
                        <DoubleArrowRightIcon className='h-4 w-4' />
                    </Button>
                </div>
            </div>
        </div>
    );
}
