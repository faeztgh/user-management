'use client';

import React, { useEffect } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IUser } from '@/types/response-types/users';
import useMutation from '@/lib/api/useMutation';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { DrawerClose, DrawerFooter } from '@/components/ui/drawer';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { queryClient } from '@/components/layouts/Providers';
import { AxiosError } from 'axios';

const formSchema = z.object({
    name: z.string({ required_error: 'Name is required' }).min(1, { message: 'Name is required' }),
    role: z.enum(['member', 'admin'], {
        required_error: 'Role is required',
        invalid_type_error: "Role must be either 'member' or 'admin'",
    }),
    email: z
        .string({ required_error: 'Email is required' })
        .email({ message: 'Invalid email format' }),
    avatar: z.string().optional(),
});

interface IAddEditMemberFormProps {
    mode: 'add' | 'edit';
    user?: IUser;
}

const AddEditMemberForm = ({ mode, user }: IAddEditMemberFormProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            role: 'member',
            email: '',
            avatar: '',
        },
    });

    useEffect(() => {
        if (mode === 'edit' && user) {
            form.reset({
                name: user?.name || '',
                role: (user?.role as 'member' | 'admin') || 'member',
                email: user?.metadata?.private?.email || '',
                avatar: user?.avatar || '',
            });
        }
    }, [user, mode, form]);

    const { mutate: editUser, isPending: isEditing } = useMutation({
        method: 'put',
    });
    const { mutate: addUser, isPending: isAdding } = useMutation({
        method: 'post',
    });

    const refetchList = () => {
        queryClient.refetchQueries({
            queryKey: ['get_users_list'],
        });
        queryClient.refetchQueries({
            queryKey: ['get_users_table'],
        });
    };

    function onSubmit(values: z.infer<typeof formSchema>) {
        if (mode === 'edit' && user?.uid) {
            editUser(
                {
                    mutationOptions: { overrideUrl: `/users/${user.uid}` },
                    body: values,
                },
                {
                    onSuccess: () => {
                        refetchList();
                        toast.success('Updated');
                    },
                }
            );
        } else {
            addUser(
                {
                    mutationOptions: { overrideUrl: '/users' },
                    body: values,
                },
                {
                    onSuccess: () => {
                        refetchList();
                        form.reset();
                        toast.success('Added');
                    },
                    onError: (error: AxiosError) => {
                        console.log(error);
                        if (error.response?.status === 402) {
                            toast.error(
                                (
                                    error.response.data as {
                                        error?: { message?: string };
                                    }
                                )?.error?.message || 'Payment required to add more members.'
                            );
                        }
                    },
                }
            );
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='mx-auto w-full max-w-3xl space-y-8 py-5'
            >
                <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel required>Name</FormLabel>
                            <FormControl>
                                <Input placeholder='name' type='text' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='role'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel required>Role</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl className='w-full'>
                                    <SelectTrigger>
                                        <SelectValue placeholder='Select role' />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value='member'>Member</SelectItem>
                                    <SelectItem value='admin'>Admin</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel required>Email</FormLabel>
                            <FormControl>
                                <Input placeholder='email' type='text' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='avatar'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Avatar URL</FormLabel>
                            <FormControl>
                                <Input placeholder='avatar URL' type='text' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <DrawerFooter className='px-0'>
                    <Button className='mt-4' disabled={isEditing || isAdding} type='submit'>
                        Save
                    </Button>
                    <DrawerClose asChild>
                        <Button variant='outline'>Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </form>
        </Form>
    );
};

export default AddEditMemberForm;
