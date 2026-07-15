import type { SupplierQuote, SupplierSearchParams, SupplierAdapter } from "./types";
import { searchCMS } from "./cms";
import { searchCarPartsKE } from "./carpartske";
import { searchKMAuto } from "./kmautospares";
import { searchAutoXpress } from "./autoxpress";
import { searchDoukan } from "./doukan";
import { searchRevAuto } from "./revauto";

const ADAPTERS: SupplierAdapter[] = [
  searchCMS,
  searchCarPartsKE,
  searchKMAuto,
  searchAutoXpress,
  searchDoukan,
  searchRevAuto,
];

export type { SupplierQuote, SupplierSearchParams, SupplierAdapter };

export async function getSupplierPrices(
  params: SupplierSearchParams
): Promise<SupplierQuote[]> {
  const results = await Promise.allSettled(
    ADAPTERS.map((adapter) => adapter(params))
  );

  return results
    .filter(
      (r): r is PromiseFulfilledResult<SupplierQuote> =>
        r.status === "fulfilled" && r.value !== null
    )
    .map((r) => r.value)
    .sort((a, b) => a.price - b.price);
}

export async function findBestPrice(
  params: SupplierSearchParams
): Promise<SupplierQuote | null> {
  const prices = await getSupplierPrices(params);
  return prices[0] ?? null;
}
