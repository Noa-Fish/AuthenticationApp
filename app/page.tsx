import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { UserAuthForm } from "@/components/user-auth-form"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
}

export default function AuthenticationPage() {
  return (
    <>
      <div className="grid md:grid-cols-2 h-screen">
        <div className="hidden md:flex flex-col bg-zinc-900 p-10 text-white">
          <Link
            href="/examples/authentication"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "absolute right-4 top-4 md:right-8 md:top-8 text-black"
            )}
          >
            Login
          </Link>
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
                Sign up with your email and a&nbsp;
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger><span className="font-bold">strong password</span></TooltipTrigger>
                    <TooltipContent className="bg-white">
                      <ul>
                        <li>1 number (0-9)</li>
                        <li>1 uppercase letters</li>
                        <li>1 lowercase letters</li>
                        <li>1 non-alpha numeric number</li>
                        <li>8-32 characters with no space</li>
                      </ul>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                .
              </p>
            </div>
            <UserAuthForm />
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