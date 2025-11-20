'use client'

import { useForm } from "react-hook-form";
import { Button } from "../ui/button"
import { Field, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation";

type FormSignUp = {
    fullName: string;
    username: string;
    password: string;
}

const signUpSchema = z.object({
    fullName: z.string()
        .min(6, "Full name must be at least 6 characters")
        .max(100, "Full name must be at most 100 characters"),
    username: z.string()
        .min(6, "Username must be at least 6 characters")
        .max(20, "User name must be at most 20 characters")
        .regex(/^[a-zA-Z0-9_]+$/, "Invalid username format"),
    password: z.string()
        .min(6, "Password must be at least 8 characters")
        .max(100, "Full name must be at most 100 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character"),
})

export function SignUpForm() {
    const { register, handleSubmit } = useForm<FormSignUp>({ resolver: zodResolver(signUpSchema) })
    const router = useRouter();

    const onSubmit = handleSubmit(async ({ fullName, username, password }) => {
        const res = await fetch("/api/auth/signup", {
            method: "POST",
            body: JSON.stringify({ email: username, password, name: fullName }),
        });

        console.log(res);
        

        if (!res.ok) {
            alert("Đăng ký thất bại");
            return;
        }

        router.push("/login");

    })

    return <form onSubmit={(e) => { e.preventDefault(); onSubmit() }} className="flex flex-col gap-6">
        <Field>
            <FieldLabel>
                Full Name
            </FieldLabel>
            <Input {...register('fullName')} />
        </Field>

        <Field>
            <FieldLabel>
                Username
            </FieldLabel>
            <Input {...register('username')} />
        </Field>

        <Field>
            <FieldLabel>
                Password
            </FieldLabel>
            <Input type="password" {...register('password')} />
        </Field>

        <Button type="submit">Sign Up</Button>
    </form >
}