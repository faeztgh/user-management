'use client';
import ApiRoutes from '@/constants/ApiRoutes';
import useApi from '@/lib/api/useApi';
import { IUser, IUserData } from '@/types/response-types/users';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '../../ui/button';
import { Skeleton } from '../../ui/skeleton';
import { Plus } from 'lucide-react';
import { fakeArray } from '@/lib/utils';
import { Input } from '../../ui/input';
import { useHotkeys } from '@mantine/hooks';
import HotKeys from '@/constants/HotKeys';
import ListItem from './ListItem';
import AddEditMemberDrawer from '../AddEditMemberDrawer';

const List = () => {
    const [search, setSearch] = useState('');
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
            event => {
                event.preventDefault();
                searchInputRef.current?.focus();
            },
        ],
    ]);

    const { camelCaseData: fetchedUsers, isLoading: isUsersLoading } = useApi<IUserData>({
        url: `${ApiRoutes.users}?perPage=${currentPage * (users.length === 0 ? 20 : 10)}`,
        queryKey: ['get_users_list', currentPage.toString()],
    });

    const totalCount = fetchedUsers?.meta?.pagination?.total ?? 0;

    useEffect(() => {
        if (fetchedUsers?.data) {
            setUsers(prevUsers => {
                const updatedUsers = [...prevUsers];

                fetchedUsers.data.forEach(newUser => {
                    const index = updatedUsers.findIndex(
                        existingUser => existingUser.uid === newUser.uid
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
        users?.filter(user => {
            const q = debouncedSearch?.toLowerCase();
            return (
                user.name.toLowerCase().includes(q) ||
                user.metadata?.private?.email?.toLowerCase().includes(q)
            );
        }) ?? [];

    useEffect(() => {
        const handleScroll = () => {
            if (parentRef.current) {
                const { scrollTop, scrollHeight, clientHeight } = parentRef.current;
                const threshold = 500;

                if (
                    scrollHeight - scrollTop - clientHeight < threshold &&
                    users.length < totalCount
                ) {
                    setCurrentPage(prevPage => prevPage + 1);
                }
            }
        };

        const refCurrent = parentRef.current;
        if (refCurrent) {
            refCurrent.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (refCurrent) {
                refCurrent.removeEventListener('scroll', handleScroll);
            }
        };
    }, [filteredUsers.length, totalCount, users.length]);

    return (
        <div>
            <div className='mb-8 flex flex-col items-start justify-start space-y-3 md:flex-row md:items-end md:justify-between md:space-y-0'>
                <div>
                    <span className='text-muted-foreground'>Manage members access</span>
                    <h2 className='text-3xl font-semibold'>Members</h2>
                </div>

                <div className='flex flex-col items-start justify-start gap-x-3 gap-y-3 md:flex-row md:items-center md:justify-center md:gap-y-0'>
                    <span className='text-muted-foreground'>{filteredUsers.length} members</span>
                    <div className='relative'>
                        <Input
                            placeholder={`search...`}
                            type='text'
                            className='mr-3'
                            ref={searchInputRef}
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                        <kbd className='pointer-events-none absolute right-3 top-2 inline-flex h-5 select-none items-center gap-1 rounded px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100'>
                            <span className='text-xs'>⌘</span>K
                        </kbd>
                    </div>
                    <AddEditMemberDrawer mode='add'>
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
                <div className='space-y-4'>
                    <div className='flex items-center justify-between'>
                        <div className='flex w-full items-center justify-center gap-2 py-20'>
                            <div className='space-y-1'>
                                <h2 className='text-3xl font-semibold'>No members found</h2>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='relative h-[70vh] overflow-auto rounded-md' ref={parentRef}>
                    <div className='w-full'>
                        {filteredUsers.map((user, index) => (
                            <ListItem user={user} key={user.uid + user.name} index={index} />
                        ))}
                    </div>
                    {isUsersLoading && (
                        <div>
                            {fakeArray(users.length === 0 ? 20 : 5).map((_, index) => (
                                <div
                                    key={index}
                                    className='!m-0 flex items-center justify-between border-b px-5 py-2'>
                                    <div className='flex items-center gap-2'>
                                        <Skeleton className='h-10 w-10 rounded-full' />
                                        <div className='flex items-center justify-center gap-x-5 space-y-1'>
                                            <Skeleton className='h-4 w-32' />
                                            <Skeleton className='h-3 w-48' />
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <Skeleton className='h-8 w-20' />
                                        <Skeleton className='h-8 w-8' />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default List;
