"use client"

import * as zod from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormItem, FormMessage } from "@/components/ui/form"
import { Form, FormField, FormLabel, FormControl, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const formSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(8).max(32),
  passwordConfirmation: zod.string().min(8).max(32),
}).refine((data) => {
  return data.password === data.passwordConfirmation
}, {
  message: "Passwords do not match",
  path: ["passwordConfirmation"],
})


export default function LoginPage() {
  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const handleSubmit = () => {
    console.log(form.getValues())
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Form {...form}>
        <form className="max-w-md w-full flex flex-col gap-4" onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField control={form.control} name="email" render={({ field }) => {
            return <FormItem>
              <FormLabel>
                Email
              </FormLabel>

              <FormControl>
                <Input placeholder="Email" type="email" {...field} />
              </FormControl>
              <FormMessage>
              </FormMessage>
            </FormItem>
          }} />
          <FormField control={form.control} name="password" render={({ field }) => {
            return <FormItem>
              <FormLabel>
                Password
              </FormLabel>
              <FormControl>
                <Input placeholder="Password" type="password" {...field} />
              </FormControl>
              <FormMessage>
              </FormMessage>
            </FormItem>
          }} />
          <FormField control={form.control} name="passwordConfirmation" render={({ field }) => {
            return <FormItem>
              <FormLabel>
                Password Confirmation
              </FormLabel>
              <FormControl>
                <Input placeholder="Password Confirmation" type="password" {...field} />
              </FormControl>
              <FormMessage>
              </FormMessage>
            </FormItem>
          }} />
          <Button type="submit" className="w-full"> Login </Button>
        </form>
      </Form>
    </main>
  )
}