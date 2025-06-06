import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Cross2Icon, MixerHorizontalIcon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { TableFacetedFilter } from './TableFacetedFilter';
import { TFilters } from './types';
import { ReactNode } from 'react';

interface DataTableViewOptionsProps<TData> {
    table: Table<TData>;
    withSearch?: boolean;
    filters?: TFilters;
    withHideColumn?: boolean;
    topActions?: ReactNode;
    title?: ReactNode;
}

export function TableViewOptions<TData>(props: DataTableViewOptionsProps<TData>) {
    const { table, withSearch, filters, withHideColumn = false, topActions, title } = props;
    const isFiltered = table.getState().columnFilters.length > 0;
    const membersCount = table.getFilteredRowModel().rows.length;
    const isTopEmpty = !withHideColumn && !withSearch && !topActions && !filters;
    return (
        <div
            className={`flex flex-col items-start space-y-3 md:flex-row md:items-center md:space-y-0 ${isTopEmpty ? '' : 'py-4'}`}>
            {/* Filter start */}
            {title && title}
            <div className='flex flex-col items-start justify-between gap-x-5 md:ml-auto md:flex-row md:items-center'>
                <span className='text-muted-foreground'>{membersCount} members</span>
                <div className='flex w-fit flex-wrap items-center gap-x-3'>
                    {withSearch && (
                        <Input
                            placeholder={`search...`}
                            type='search'
                            className='mr-3'
                            onChange={event => table.setGlobalFilter(event.target.value)}
                        />
                    )}

                    {filters && filters.length > 0 && (
                        <>
                            {filters.map(({ id, title, options }) => {
                                return (
                                    <>
                                        {table.getColumn(id) && (
                                            <TableFacetedFilter
                                                column={table.getColumn(id)}
                                                title={title}
                                                options={options}
                                            />
                                        )}
                                    </>
                                );
                            })}

                            {isFiltered && (
                                <Button
                                    variant='ghost'
                                    onClick={() => table.resetColumnFilters()}
                                    className='h-8 px-2 lg:px-3'>
                                    {'reset'}
                                    <Cross2Icon className='ml-2 h-4 w-4' />
                                </Button>
                            )}
                        </>
                    )}
                </div>
            </div>
            {/* Filter End */}
            {topActions && topActions}
            {/* Column toggle */}
            {withHideColumn && (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant='outline' size='sm' className='ml-auto h-8 lg:flex'>
                            <MixerHorizontalIcon className='mr-2 h-4 w-4' />
                            {'columns'}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end' className='w-[150px]'>
                        <DropdownMenuLabel>{'phrase.toggleColumns'}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {table
                            .getAllColumns()
                            .filter(
                                column =>
                                    typeof column.accessorFn !== 'undefined' && column.getCanHide()
                            )
                            .map(column => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className='capitalize'
                                        checked={column.getIsVisible()}
                                        onCheckedChange={value => column.toggleVisibility(!!value)}>
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                );
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
            {/* Column toggle */}
        </div>
    );
}
