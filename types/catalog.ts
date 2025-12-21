// types/catalog.ts

export type ID = string;

export enum ProductStatus {
  DRAFT = "DRAFT",
  ACTIVE = "ACTIVE",
  ARCHIVED = "ARCHIVED",
}

export enum AttributeDataType {
  STRING = "STRING",
  NUMBER = "NUMBER",
  BOOLEAN = "BOOLEAN",
  DATE = "DATE",
}

export enum MediaType {
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
}

export interface Category {
  id: ID;
  storeId: ID;
  name: string;
  slug: string;

  parentId?: ID | null;

  createdAt: string;
  updatedAt: string;
}

export interface ProductMedia {
  id: ID;
  storeId: ID;
  productId: ID;

  type: MediaType;
  url: string;

  alt?: string | null;
  width?: number | null;
  height?: number | null;

  sortOrder: number;
  isPrimary: boolean;

  createdAt: string;
}

export interface Product {
  id: ID;
  storeId: ID;

  name: string;
  slug: string;
  description?: string | null;
  brand?: string | null;

  status: ProductStatus;
  isFeatured: boolean;

  categoryId?: ID | null;

  createdAt: string;
  updatedAt: string;

  // Include relations when needed (API can omit to keep lightweight)
  category?: Category | null;
  media?: ProductMedia[];
  variants?: ProductVariant[];
}

export interface ProductVariant {
  id: ID;
  storeId: ID;
  productId: ID;

  sku: string;

  /** cents */
  price: number;
  /** cents */
  salePrice?: number | null;

  stock: number;
  isDefault: boolean;

  createdAt: string;
  updatedAt: string;

  attributes?: VariantAttribute[];
}

export interface Attribute {
  id: ID;
  storeId: ID;

  code: string;
  name: string;
  dataType: AttributeDataType;

  isFilter: boolean;
  isVariant: boolean;

  createdAt: string;
  updatedAt: string;

  options?: AttributeOption[];
}

export interface AttributeOption {
  id: ID;
  storeId: ID;
  attributeId: ID;

  value: string;
  label?: string | null;
  sortOrder: number;

  createdAt: string;
}

/**
 * VariantAttribute supports both:
 * - optionId (choice attributes)
 * - value* (free input attributes)
 */
export interface VariantAttribute {
  id: ID;
  storeId: ID;

  variantId: ID;
  attributeId: ID;

  optionId?: ID | null;

  valueString?: string | null;
  valueNumber?: number | null;
  valueBoolean?: boolean | null;
  valueDate?: string | null;

  createdAt: string;

  // optional expanded
  attribute?: Attribute;
  option?: AttributeOption | null;
}

/**
 * Helper type for rendering variant attributes in FE:
 * resolved display value (string) regardless of input kind.
 */
export type VariantAttributeResolved = {
  attributeCode: string;
  attributeName: string;
  dataType: AttributeDataType;
  value: string; // already formatted for UI
  optionValue?: string;
  optionLabel?: string;
};
