import { useProduct } from "@/hooks/use-product"
import { Product } from "@/types/catalog"
import { Field, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import { Card } from "../ui/card"
import { Button } from "../ui/button"

type Props = {
    product: Product
}

export function ProductForm({ product }: Props) {
    const { formProduct } = useProduct({ product })
    const { register } = formProduct
    return <div className="flex gap-6 items-start">
        <div className="w-sm flex flex-col gap-6">
            <Card className="w-full p-4">
                <div className="w-full aspect-square bg-amber-200 rounded-lg overflow-hidden"></div>
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
                        <form className="flex flex-col gap-6"> {/*  onSubmit={(e) => { e.preventDefault(); onSubmit() }} */}
                            <Field>
                                <FieldLabel>
                                    Product name
                                </FieldLabel>
                                <Input {...register('name')} />
                            </Field>

                            <Field>
                                <FieldLabel>
                                    Product slug
                                </FieldLabel>
                                <Input {...register('slug')} />
                            </Field>

                            <Field>
                                <FieldLabel>
                                    Status
                                </FieldLabel>
                                <Input {...register('status')} />
                            </Field>
                        </form>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Shipping Details</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance">
                        <p>
                            We offer worldwide shipping through trusted courier partners.
                            Standard delivery takes 3-5 business days, while express shipping
                            ensures delivery within 1-2 business days.
                        </p>
                        <p>
                            All orders are carefully packaged and fully insured. Track your
                            shipment in real-time through our dedicated tracking portal.
                        </p>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>Return Policy</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance">
                        <p>
                            We stand behind our products with a comprehensive 30-day return
                            policy. If you&apos;re not completely satisfied, simply return the
                            item in its original condition.
                        </p>
                        <p>
                            Our hassle-free return process includes free return shipping and
                            full refunds processed within 48 hours of receiving the returned
                            item.
                        </p>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </Card>

    </div>
}