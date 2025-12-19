import StoreDialog from "@/components/admin/store-management/store-dialog";
import StoreItem from "@/components/admin/store-management/store-item";
import StoreForm from "@/components/form/store";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";


export default function StoresPage() {
    return <div className="mx-auto w-full max-w-[800px] px-4 py-10 flex flex-col gap-8">
        <div className="flex justify-between items-center">
            <h1 className="font-bold text-2xl">Stores Management</h1>
            <StoreDialog trigger={
                <Button
                    variant="outline"
                    aria-label="Invite"><Plus /> Add New Store</Button>
            } />
        </div>

        <StoreForm />

        {/* <div className="flex flex-col gap-4">
            <StoreItem />
        </div> */}
    </div >

}