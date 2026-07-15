export interface SupplierQuote {
  supplier: string;
  website: string;
  part: string;
  partNumber?: string;
  price: number;
  currency: string;
  availability: string;
  url?: string;
  brand?: string;
  condition: "OEM" | "Aftermarket" | "Used";
  source: string;
}

export interface SupplierSearchParams {
  make: string;
  model: string;
  year?: number;
  partName: string;
}

export type SupplierAdapter = (
  params: SupplierSearchParams
) => Promise<SupplierQuote | null>;
