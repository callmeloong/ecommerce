'use client'

import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";
import { useStoreManager } from "@/hooks/use-store-manager";
import { Button } from "../ui/button";
import { Save } from "lucide-react";

export default function StoreForm() {
    const { formStore, submit } = useStoreManager()
    const { register, formState: { errors } } = formStore

    return <div className="flex flex-col gap-5">
        <form className="flex flex-col gap-5" onSubmit={submit}>
            <Field>
                <FieldLabel htmlFor="store-name">
                    Store name
                </FieldLabel>
                <Input
                    id="store-name"
                    placeholder="Store name"
                    {...register('storeName')}
                />
                <FieldError errors={[errors.storeName]} />
            </Field>

            <Field>
                <FieldLabel htmlFor="store-domain">
                    Store domain
                </FieldLabel>
                <InputGroup>
                    <InputGroupInput id="store-domain"
                        placeholder="store-domain"
                        {...register('storeDomain')} />
                    <InputGroupAddon align="inline-end">.byshopflow.vn</InputGroupAddon>
                </InputGroup>
                <FieldError errors={[errors.storeDomain]} />
            </Field>

            <Button><Save />Create Store</Button>
        </form >
    </div>
}