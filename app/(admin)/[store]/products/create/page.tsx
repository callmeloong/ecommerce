'use client'

import { ProductForm } from "@/components/form/product";
import { Product } from "@/hooks/use-product";

export default function CreateProductPage() {
    const product = new Product("", "", "");

    return <ProductForm product={product} />
}