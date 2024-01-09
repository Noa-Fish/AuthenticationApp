"use client"
import React, { useState } from 'react';
import { cn } from "@/lib/utils"
import * as zod from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormLabel, FormControl, FormMessage, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/input-password";
import { Icons } from "@/components/icons"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

const formSchema = zod.object({
    email: zod.string().email(),
    password: zod
        .string()
        .min(8)
        .max(32)
        .regex(/^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).{8,32}$/),
    passwordConfirmation: zod.string().min(8).max(32),
}).refine(
    (data) => {
        return data.password === data.passwordConfirmation;
    }
);

interface FormValues {
    email: string;
    password: string;
    passwordConfirmation: string;
}

interface UserAuthFormProps {
    onFormSubmit: (formData: FormValues) => void;
    className?: string;
}

export function UserAuthForm({ className, onFormSubmit, ...props }: UserAuthFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            passwordConfirmation: "",
        },
    });

    const [formData, setFormData] = useState<FormValues>({
        email: '',
        password: '',
        passwordConfirmation: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const handleSubmit = async (e: React.FormEvent) => {
        setIsLoading(true);
        try {
            formSchema.parse(formData);
            console.log('Form data submitted:', formData);
        } catch (error) {
            if (error instanceof zod.ZodError) {
                console.error("Le formulaire contient des erreurs de validation :", error.errors);
            } else {
                console.error("Une erreur s'est produite lors de la soumission du formulaire :", error);
            }
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <Form {...form}>
                <form onSubmit={handleSubmit} >
                    <div className="grid gap-2">
                        <div className="grid gap-1">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel className="sr-only">
                                                Email
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Email"
                                                    type="email"
                                                    {...field}
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
                            />
                        </div>
                        <div className="grid gap-1">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel className="sr-only">
                                                Password
                                            </FormLabel>
                                            <FormControl>
                                                <PasswordInput
                                                    placeholder="Password"
                                                    type="password"
                                                    {...field}
                                                    value={formData.password}
                                                    onChange={handleInputChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    );
                                }}
                            />
                        </div>
                        <div className="grid gap-1">
                            <FormField
                                control={form.control}
                                name="passwordConfirmation"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel className="sr-only">
                                                Password Confirmation
                                            </FormLabel>
                                            <FormControl>
                                                <PasswordInput
                                                    placeholder="Password Confirmation"
                                                    type="password"
                                                    {...field}
                                                    value={formData.passwordConfirmation}
                                                    onChange={handleInputChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    );
                                }}
                            />
                        </div>
                        <FormMessage className="text-red-500">
                            {/* {formState.isSubmitted && Object.keys(formState.errors).length > 0 && (
                                <span>
                                    Check email and/or {' '}
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <span className="font-bold">strong password</span>
                                            </TooltipTrigger>
                                            <TooltipContent className="bg-white">
                                                <ul>
                                                    <li>1 number (0-9)</li>
                                                    <li>1 uppercase letter</li>
                                                    <li>1 lowercase letter</li>
                                                    <li>1 non-alphanumeric character</li>
                                                    <li>8-32 characters with no space</li>
                                                </ul>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>{' '}
                                    and try again.
                                </span>
                            )} */}
                        </FormMessage>
                        <Button variant="outline" disabled={isLoading}>
                            {isLoading && (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Sign In with Email
                        </Button>
                    </div>
                </form>
            </Form>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
            </div>
            <div className="grid gap-2">
                <Button variant="outline" type="button" disabled={isLoading}>
                    {isLoading ? (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Icons.google className="mr-2 h-4 w-4" />
                    )}{" "}
                    Google
                </Button>
                <Button variant="outline" type="button" disabled={isLoading}>
                    {isLoading ? (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Icons.gitHub className="mr-2 h-4 w-4" />
                    )}{" "}
                    GitHub
                </Button>
            </div>
        </div >
    )
}