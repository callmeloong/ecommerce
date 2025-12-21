"use client";

import { slugify } from "@/lib/slugify";
import { Product as IProduct, ProductStatus } from "@/types/catalog";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatISO } from "date-fns";
import { useForm } from "react-hook-form";
import z, { object } from "zod";

export class Product implements IProduct {
  id: string;
  storeId: string;
  name: string;
  slug: string = "";
  status = ProductStatus.DRAFT;
  isFeatured = false;
  createdAt: string = formatISO(new Date());
  updatedAt: string = formatISO(new Date());

  constructor(id: string, storeId: string, name: string) {
    this.id = id;
    this.storeId = storeId;
    this.name = name;
    this.slug = slugify(name);
  }
}

const productSchema = object({
  name: z.string().nonempty("Product name is required"),
  slug: z.string().nonempty("Product slug is required"),
  status: z.string().nonempty(),
});

type Props = {
  product: Product;
};
export function useProduct({ product }: Props) {
  const formProduct = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product.name,
      slug: product.slug,
      status: product.status,
    },
  });
  return { formProduct };
}
