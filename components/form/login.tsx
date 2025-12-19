'use client'

import { useForm } from "react-hook-form";
import { Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

type FormLogin = {
    username: string;
    password: string;
}

const loginSchema = z.object({
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

export default function LoginForm() {
    const { register, handleSubmit } = useForm<FormLogin>({ resolver: zodResolver(loginSchema) })
    const router = useRouter();
    const q = useSearchParams()
    const t = useTranslations('login-page')

    const onSubmit = handleSubmit(async ({ username, password }) => {
        const callbackUrl = q.get('callbackUrl') || "/dashboard"
        const res = await signIn("credentials", {
            email: username,
            password,
            callbackUrl,
            redirect: false
        });

        console.log(res);



        if (!res?.ok) {
            toast(t('incorrect-credential'));
        } else {
            router.push('/dashboard')
        }


    })

    return <form onSubmit={(e) => { e.preventDefault(); onSubmit() }} className="flex flex-col gap-6">
        <Field>
            <FieldLabel>
                {t('username')}
            </FieldLabel>
            <Input {...register('username')} />
        </Field>

        <Field>
            <FieldLabel>
                {t('password')}
            </FieldLabel>
            <Input type="password" {...register('password')} />
        </Field>

        <Button type="submit">{t('login')}</Button>
    </form >
}