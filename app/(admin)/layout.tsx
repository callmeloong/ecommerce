import React from "react"
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { SWRProvider } from "@/providers/swr-provider";

type Props = {
    children: React.ReactNode
}

export default async function AdminLayout({ children }: Props) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        redirect("/login");
    }

    return <SWRProvider>{children}</SWRProvider>
}