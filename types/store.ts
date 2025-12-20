import { StoreRole } from "@/generated/prisma/enums";

export type TStoreItem = {
  id: string;
  name: string;
  slug: string;
  domain: string | null;
  role: StoreRole;
  createdAt: Date;
};
