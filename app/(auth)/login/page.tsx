import LoginForm from "@/components/form/login";
import { LanguageSwitcher } from "@/components/shared/language-switcher";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
// import { Link } from "@/i18n/navigation";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function LoginPage() {
    const session = await getServerSession(authOptions);
    const t = await getTranslations('login-page');
    if (session?.user?.id) {
        redirect("/dashboard");
    }
    return <div className="w-full h-dvh grid grid-cols-7 relative">
        <div className="absolute top-0 right-0 -translate-x-1/2 translate-y-1/2">
            <LanguageSwitcher />
        </div>

        <div className="col-span-3 flex justify-center items-center">
            <div className="flex flex-col gap-8 max-w-[400px] mx-auto">
                <div className="flex flex-col gap-3">
                    <h1 className="text-3xl font-bold">{t('title')}</h1>
                    <span className="text-muted-foreground">{t('sub-title')}</span>
                </div>

                <LoginForm />

                <div className="flex w-full gap-2 items-center text-muted-foreground">
                    <Separator className="flex-1" />Or<Separator className="flex-1" />
                </div>

                <Button variant="outline">Sign in with Google</Button>

                <span>Don't have an account? <Link href="/signup">Sign up</Link></span>
            </div>
        </div>
        <div className="col-span-4 bg-neutral-200/20 border-l border-neutral-400/50 ">

        </div>
    </div>
}