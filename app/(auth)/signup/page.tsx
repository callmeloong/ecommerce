import { SignUpForm } from "@/components/form/sign-up";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function SignupPage() {
    return <div className="w-full h-dvh grid grid-cols-7">
        <div className="col-span-3 flex justify-center items-center">
            <div className="flex flex-col gap-8 max-w-[400px] mx-auto">
                <div className="flex flex-col gap-3">
                    <h1 className="text-3xl font-bold">Sign up for a free account</h1>
                    <span className="text-muted-foreground">Managing your store is easier than ever!</span>
                </div>

                <SignUpForm />

                <Separator />
            </div>
        </div>
        <div className="col-span-4 bg-neutral-200/20 border-l border-neutral-400/50 ">

        </div>
    </div>
}