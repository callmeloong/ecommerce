import { StoreRole } from "@/generated/prisma/enums";

export type TStoreItem = {
  id: string;
  name: string;
  slug: string;
  domain: string | null;
  logo: React.ElementType | string;
  role: StoreRole;
  createdAt: Date;
};
