import { useProduct } from "@/hooks/use-product"
import { Product } from "@/types/catalog"
import { Field, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import { Card } from "../ui/card"
import { Button } from "../ui/button"
import { TiptapEditor } from "../shared/tiptap-editor"
import FileUpload from "../shared/file-upload"

type Props = {
    product: Product
}

export function ProductForm({ product }: Props) {
    const { formProduct } = useProduct({ product })
    const { register } = formProduct
    return <div className="flex gap-6 items-start">
        <div className="w-sm flex flex-col gap-6">
            <Card className="w-full p-4 flex flex-col gap-4">
                <div className="w-full aspect-square bg-amber-200 rounded-lg overflow-hidden"></div>
                <div className="flex flex-col">
                    <h3 className="text-lg font-medium">Product Name</h3>
                    <span className="text-2xl font-bold">Product Price</span>
                </div>
            </Card>

            <div className="flex gap-4">
                <Button variant="outline" className="flex-1">Cancel</Button>
                <Button className="flex-1">Save</Button>
            </div>
        </div>

        <Card className="w-full p-6">
            <Accordion
                type="single"
                collapsible
                className="w-full"
                defaultValue="item-1"
            >
                <AccordionItem value="item-1">
                    <AccordionTrigger>Product Information</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance">
                        <div className="flex flex-col gap-6"> {/*  onSubmit={(e) => { e.preventDefault(); onSubmit() }} */}
                            <Field>
                                <FieldLabel>
                                    Product name
                                </FieldLabel>
                                <Input {...register('name')} />
                            </Field>

                            <div className="grid grid-cols-3 gap-6">
                                <Field className="col-span-2">
                                    <FieldLabel>
                                        Product slug
                                    </FieldLabel>
                                    <Input {...register('slug')} />
                                </Field>

                                <Field className="col-span-1">
                                    <FieldLabel>
                                        Status
                                    </FieldLabel>
                                    <Input {...register('status')} />
                                </Field>
                            </div>

                            <TiptapEditor />
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Product Media</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance">
                        <FileUpload />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>Product Variants</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance">
                        <div className="flex gap-4">
                            <div className="border border-dashed border-neutral-400 max-w-[100px] w-full aspect-square"></div>
                            <Field className="col-span-1">
                                <FieldLabel>
                                    Status
                                </FieldLabel>
                                <Input {...register('status')} />
                            </Field>

                            <Field className="col-span-1">
                                <FieldLabel>
                                    Status
                                </FieldLabel>
                                <Input {...register('status')} />
                            </Field>

                            <Field className="col-span-1">
                                <FieldLabel>
                                    Status
                                </FieldLabel>
                                <Input {...register('status')} />
                            </Field>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </Card>

    </div>
}