'use client'

import StoreDialog from "@/components/admin/store-management/store-dialog";
import StoreItem from "@/components/admin/store-management/store-item";
import StoreForm from "@/components/form/store";
import { Button } from "@/components/ui/button";
import { useStoreManager } from "@/hooks/use-store-manager";
import { Plus } from "lucide-react";


export default function StoresPage() {
    const { data, isLoading } = useStoreManager();

    if (!data) return <></>

    const { stores } = data;

    return <div className="mx-auto w-full max-w-[800px] px-4 py-10 flex flex-col gap-8">
        <div className="flex justify-between items-center">
            <h1 className="font-bold text-2xl">Stores Management</h1>

            {stores.length && <StoreDialog trigger={
                <Button
                    variant="outline"
                    aria-label="Invite"><Plus /> Add New Store</Button>
            } />}

        </div>

        {!stores.length && !isLoading && <StoreForm />}

        {isLoading && <>Loading...</>}

        {stores.map(store => <StoreItem key={store.id} store={store} />)}

        {/* <div className="flex flex-col gap-4">
            <StoreItem />
        </div> */}
    </div >

}