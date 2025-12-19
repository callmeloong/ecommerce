import { slugify } from "@/lib/slugify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

export type TStoreForm = {
  storeName: string;
  storeDomain: string;
};

const storeSchema = z.object({
  storeName: z
    .string()
    .min(6, "Store name must be at least 6 characters")
    .max(30, "Store name must be at most 30 characters"),
  storeDomain: z
    .string()
    .min(2, "Store domain must be at least 2 characters")
    .max(63, "Store domain must be at most 63 characters")
    .regex(
      /^((?!-)[A-Za-z0-9-]{1,63}(?<!-)){2,63}$/,
      "Invalid domain format"
    ),
});

export function useStoreManager() {
  const formStore = useForm<TStoreForm>({
    resolver: zodResolver(storeSchema),
  });

  const { watch, setValue, handleSubmit } = formStore;

  const storeName = watch("storeName");

  useEffect(() => {
    setValue("storeDomain", slugify(storeName ?? ""));
  }, [storeName]);

  const onSubmit = (data: TStoreForm) => {
    console.log(data);
  };

  return { formStore, submit: handleSubmit(onSubmit) };
}
