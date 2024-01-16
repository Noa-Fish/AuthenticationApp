"use client"
import { Metadata } from "next"
import Link from "next/link"
import axios from "axios"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { set, z, ZodType } from "zod"
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
import { useCallback, useState } from "react"

type FormData = {
  email: string;
  password: string;
  passwordConfirmation: string;
}
const passwordRegex = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).{8,32}$/;
const schema: ZodType<FormData> = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .max(32)
    .regex(passwordRegex),


  passwordConfirmation: z
    .string()
    .min(8)
    .max(32)
    .regex(passwordRegex),

})


export default function AuthenticationPage() {
  const [isLoading, setIsLoading] = useState(false)

  const [variant, setVariant] = useState('login');

  if (variant === 'register') {
    schema.refine((data) =>
      data.password === data.passwordConfirmation, {
      message: "Passwords don't match",
      path: ["passwordConfirmation"],
    });
  }
  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login');
  }, []);


  // const register = useCallback(async () => {
  //   try {
  //     await axios.post('/api/register', {
  //       email,
  //       password
  //     })
  //   } catch (e) {

  //   }
  // }, [])



  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  })

  const onSubmit = (data: FormData) => {
    setIsLoading(true)
    console.log(data)
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  };

  return (
    <>
      <div className="grid md:grid-cols-2 h-screen">
        <div className="hidden md:flex flex-col bg-zinc-900 p-10 text-white">
          {/* <Button
            onClick={toggleVariant}
            variant="outline"
            className="absolute right-4 top-4 md:right-8 md:top-8 text-black"
          >
            {variant === 'login' ? 'Sign in' : 'Register'}
          </Button> */}
          <Button variant="outline" disabled={isLoading} className="absolute right-4 top-4 md:right-8 md:top-8 text-black" onClick={toggleVariant}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {variant === 'login' ? 'Sign In' : 'Sign Up'}
          </Button>
          <div className="text-lg font-medium flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Authentication App
          </div>
          <div className="mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This library has saved me countless hours of work and
                helped me deliver stunning designs to my clients faster than
                ever before.&rdquo;
              </p>
              <footer className="text-sm font-bold">Watel Noa</footer>
            </blockquote>
          </div>
        </div>
        <div className="flex items-center justify-center md:p-8 ">
          <div className="flex flex-col sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Sign up with your email and a {' '}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger><span className="font-bold">strong password</span></TooltipTrigger>
                    <TooltipContent className="bg-white">
                      <ul>
                        <li>1 number (0-9)</li>
                        <li>1 uppercase letters</li>
                        <li>1 lowercase letters</li>
                        <li>1 special character</li>
                        <li>8-32 characters with no space</li>
                      </ul>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                .
              </p>
            </div>
            <div className="grid gap-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
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
                                  id="email"
                                  {...field}
                                  placeholder="Email"
                                  type="email"
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
                        name="password"
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel className="sr-only">
                                Password
                              </FormLabel>
                              <FormControl>
                                <PasswordInput
                                  id="password"
                                  placeholder="Password"
                                  type="password"
                                  {...field}
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
                                  id="passwordConfirmation"
                                  placeholder="Password Confirmation"
                                  type="password"
                                  {...field}
                                  disabled={isLoading}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                    </div>
                    <Button type="submit" variant="outline" disabled={isLoading}>
                      {isLoading && (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      {variant === 'login' ? 'Login' : 'Register'}
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
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
