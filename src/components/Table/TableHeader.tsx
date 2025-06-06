import { Button } from '../ui/button';
import { Table, flexRender } from '@tanstack/react-table';
import { TableHeader as RadixTableHeader, TableHead, TableRow } from '../ui/table';
import { PiCaretDownFill, PiCaretUpFill } from 'react-icons/pi';
import React from 'react';

interface TableHeaderProps<T> {
    table: Table<T>;
    withSort?: boolean;
}

export function TableHeader<T>(props: TableHeaderProps<T>) {
    const { table, withSort } = props;
    return (
        <RadixTableHeader>
            {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map(header => {
                        const isSorted = header.column.getIsSorted();
                        const canSort = header.column.getCanSort() ?? false;

                        return (
                            <TableHead
                                key={header.id}
                                colSpan={header.colSpan}
                                className='font-semibold'
                                style={{ width: header.column.getSize() }}
                            >
                                {withSort && canSort ? (
                                    <div className='flex items-center justify-start whitespace-nowrap hover:text-foreground'>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef.header,
                                                  header.getContext()
                                              )}

                                        {isSorted === 'asc' ? (
                                            <Button
                                                className='flex-center ml-1 h-8 w-8 flex-col p-1'
                                                size='icon'
                                                variant='ghost'
                                                onClick={() => header.column.toggleSorting(true)}
                                            >
                                                <PiCaretUpFill className='-mb-1' />
                                                <PiCaretDownFill className='-mt-1 opacity-40' />
                                            </Button>
                                        ) : isSorted === 'desc' ? (
                                            <Button
                                                className='flex-center ml-1 h-8 w-8 flex-col p-1'
                                                size='icon'
                                                variant='ghost'
                                                onClick={() => header.column.clearSorting()}
                                            >
                                                <PiCaretUpFill className='-mb-1 opacity-40' />
                                                <PiCaretDownFill className='-mt-1' />
                                            </Button>
                                        ) : (
                                            !isSorted && (
                                                <Button
                                                    className='flex-center ml-1 h-8 w-8 flex-col p-1 opacity-40'
                                                    size='icon'
                                                    variant='ghost'
                                                    onClick={() =>
                                                        header.column.toggleSorting(false)
                                                    }
                                                >
                                                    <PiCaretUpFill className='-mb-1' />
                                                    <PiCaretDownFill className='-mt-1' />
                                                </Button>
                                            )
                                        )}
                                    </div>
                                ) : (
                                    <div className='flex items-center justify-start whitespace-nowrap hover:text-foreground'>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef.header,
                                                  header.getContext()
                                              )}
                                    </div>
                                )}
                            </TableHead>
                        );
                    })}
                </TableRow>
            ))}
        </RadixTableHeader>
    );
}
