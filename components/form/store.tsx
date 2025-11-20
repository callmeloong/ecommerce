
import { Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";

export default function StoreForm() {
    return <div className="flex flex-col gap-5">
        <form className="flex flex-col gap-5">
            <Field>
                <FieldLabel htmlFor="store-name">
                    Store name
                </FieldLabel>
                <Input
                    id="store-name"
                    placeholder="Store name"
                    required
                />
            </Field>

            <Field>
                <FieldLabel htmlFor="store-domain">
                    Store domain
                </FieldLabel>
                <InputGroup>
                    <InputGroupInput id="store-domain"
                        placeholder="store-domain"
                        required />
                    <InputGroupAddon align="inline-end">.byshopflow.vn</InputGroupAddon>
                </InputGroup>
            </Field>

        </form >
    </div>
}