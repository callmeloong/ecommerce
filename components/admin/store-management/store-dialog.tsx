'use client'
import StoreForm from "@/components/form/store";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

type Props = {
    trigger: React.ReactNode,
    data?: any,
}

export default function StoreDialog({ trigger, data }: Props) {

    return <Dialog >
        <DialogTrigger asChild>
            {trigger}
        </DialogTrigger>
        <DialogContent className="max-w-lg">
            <DialogHeader>
                <DialogTitle>{data ? `Update Store ${data.name}` : 'Create New Store'}</DialogTitle>
            </DialogHeader>

            <StoreForm />
        </DialogContent>
    </Dialog>
}