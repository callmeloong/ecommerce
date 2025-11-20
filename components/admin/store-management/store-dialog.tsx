'use client'
import StoreForm from "@/components/form/store";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Save } from "lucide-react";
import { Button } from "../../ui/button";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
    trigger: React.ReactNode,
    data?: any,
}

type TStoreForm = {
    name: string,
    slug: string
}

const storeSchema = z.object({
    name: z.string().min(6).max(30),
    slug: z.string().min(6).max(30)
})

export default function StoreDialog({ trigger, data }: Props) {
    const { register } = useForm<TStoreForm>({ resolver: zodResolver(storeSchema) })

    return <Dialog >
        <DialogTrigger asChild>
            {trigger}
        </DialogTrigger>
        <DialogContent className="max-w-lg">
            <DialogHeader>
                <DialogTitle>{data ? `Update Store ${data.name}` : 'Create New Store'}</DialogTitle>
            </DialogHeader>

            <StoreForm />

            <div className="flex justify-end gap-2">
                <DialogClose asChild>
                    <Button variant="ghost">Close</Button>
                </DialogClose>
                <Button>
                    <Save /> Save
                </Button>
            </div>
        </DialogContent>
    </Dialog>
}