import LoginForm from "@/components/form/login";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
    const session = await getServerSession(authOptions);

    if (session?.user?.id) {
        redirect("/dashboard");
    }
    return <div className="w-full h-dvh grid grid-cols-7">
        <div className="col-span-3 flex justify-center items-center">
            <div className="flex flex-col gap-8 max-w-[400px] mx-auto">
                <div className="flex flex-col gap-3">
                    <h1 className="text-3xl font-bold">Login</h1>
                    <span>Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
                </div>

                <LoginForm />

                {/* <Separator /> */}
            </div>
        </div>
        <div className="col-span-4 bg-neutral-200/20 border-l border-neutral-400/50 ">

        </div>
    </div>
}