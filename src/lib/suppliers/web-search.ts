import * as cheerio from "cheerio";
import type { SupplierQuote, SupplierSearchParams } from "./types";
import { CURRENCY } from "@/lib/currency";

const TIMEOUT = 12000;

async function safeFetch(
  url: string,
  headers?: Record<string, string>
): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TIMEOUT);
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "application/json, text/html, */*",
        ...headers,
      },
    });
    clearTimeout(timeout);
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

async function safeFetchJson<T = unknown>(
  url: string,
  headers?: Record<string, string>
): Promise<T | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TIMEOUT);
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "application/json",
        ...headers,
      },
    });
    clearTimeout(timeout);
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

interface WcProduct {
  name: string;
  permalink: string;
  prices: { price: string; currency_code: string; currency_minor_unit: number };
  is_in_stock: boolean;
  categories?: { name: string; slug: string }[];
  description?: string;
}

function buildSearchQueries(params: SupplierSearchParams): string[] {
  const { partName, make, model } = params;
  const queries: string[] = [];
  if (make && model) queries.push(`${partName} ${make} ${model}`);
  if (make) queries.push(`${partName} ${make}`);
  queries.push(partName);
  const words = partName.split(/\s+/).filter((w) => w.length > 2);
  if (words.length > 1) queries.push(words.join(" "));
  return [...new Set(queries)];
}

export async function searchGreenChey(
  params: SupplierSearchParams
): Promise<SupplierQuote[]> {
  const queries = buildSearchQueries(params);
  const allResults: SupplierQuote[] = [];

  for (const query of queries) {
    if (allResults.length >= 3) break;

    const encoded = encodeURIComponent(query);
    const url = `https://greenchey.co.ke/wp-json/wc/store/v1/products?search=${encoded}&per_page=5`;
    const data = await safeFetchJson<WcProduct[]>(url);

    if (!data || data.length === 0) continue;

    for (const p of data) {
      const minorUnit = p.prices?.currency_minor_unit ?? 2;
      const rawPrice = parseInt(p.prices?.price ?? "0", 10);
      const price = rawPrice / Math.pow(10, minorUnit);

      if (price > 0 && p.name) {
        allResults.push({
          supplier: "GreenChey Kenya",
          website: "https://greenchey.co.ke",
          part: p.name,
          price,
          currency: CURRENCY,
          availability: p.is_in_stock ? "In Stock" : "Out of Stock",
          url: p.permalink || undefined,
          brand: p.categories?.[0]?.name || undefined,
          condition: "Aftermarket",
          source: "web",
        });
      }
    }
  }

  const seen = new Set<string>();
  return allResults
    .filter((q) => {
      const key = q.part.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a, b) => a.price - b.price)
    .slice(0, 5);
}

export async function searchPartsZoneKenya(
  params: SupplierSearchParams
): Promise<SupplierQuote[]> {
  const queries = buildSearchQueries(params);
  const allResults: SupplierQuote[] = [];

  for (const query of queries) {
    if (allResults.length >= 3) break;

    const encoded = encodeURIComponent(query);
    const url = `https://partszonekenya.com/wp-json/wc/store/v1/products?search=${encoded}&per_page=5`;
    const data = await safeFetchJson<WcProduct[]>(url);

    if (!data || data.length === 0) continue;

    for (const p of data) {
      const minorUnit = p.prices?.currency_minor_unit ?? 2;
      const rawPrice = parseInt(p.prices?.price ?? "0", 10);
      const price = rawPrice / Math.pow(10, minorUnit);

      if (price > 0 && p.name) {
        allResults.push({
          supplier: "Parts Zone Kenya",
          website: "https://partszonekenya.com",
          part: p.name,
          price,
          currency: CURRENCY,
          availability: p.is_in_stock ? "In Stock" : "Out of Stock",
          url: p.permalink || undefined,
          condition: "Aftermarket",
          source: "web",
        });
      }
    }
  }

  const seen = new Set<string>();
  return allResults
    .filter((q) => {
      const key = q.part.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a, b) => a.price - b.price)
    .slice(0, 5);
}

export async function searchCMSCatalog(
  params: SupplierSearchParams
): Promise<SupplierQuote[]> {
  const queries = buildSearchQueries(params);
  const allResults: SupplierQuote[] = [];

  for (const query of queries) {
    if (allResults.length >= 3) break;

    const encoded = encodeURIComponent(query);
    const url = `https://cms.co.ke/products.php?search=${encoded}`;
    const html = await safeFetch(url);
    if (!html) continue;

    const $ = cheerio.load(html);

    $(".product-card").each((_, el) => {
      const $card = $(el);
      const cardText = $card.text().replace(/\s+/g, " ").trim();

      const partNum =
        $card.find(".card-part-number, .part-number").text().trim() ||
        $card.find("a").attr("href")?.match(/part=([^&"]+)/)?.[1] ||
        "";
      const brand =
        $card.find(".card-badge, .brand-badge, .badge").first().text().trim() ||
        "";
      const nameEl = $card.find(".card-title, h3, h2").first();
      const name = nameEl.text().trim();
      const stockAvailable = /available/i.test(cardText);
      const link = $card.find("a").first().attr("href") || "";
      const fullUrl = link.startsWith("http")
        ? link
        : `https://cms.co.ke/${link}`;

      if (name && name !== "NA" && partNum) {
        allResults.push({
          supplier: "Commercial Motor Spares (CMS)",
          website: "https://cms.co.ke",
          part: name,
          partNumber: partNum !== "NA" ? partNum : undefined,
          price: 0,
          currency: CURRENCY,
          availability: stockAvailable ? "In Stock" : "Check Availability",
          url: fullUrl,
          brand: brand !== "NA" ? brand : undefined,
          condition: "Aftermarket",
          source: "web",
        });
      }
    });
  }

  const seen = new Set<string>();
  return allResults
    .filter((q) => {
      const key = `${q.partNumber}-${q.part}`.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 5);
}

export async function searchInternet(
  params: SupplierSearchParams
): Promise<SupplierQuote[]> {
  const [greenCheyResults, partsZoneResults, cmsResults] =
    await Promise.allSettled([
      searchGreenChey(params),
      searchPartsZoneKenya(params),
      searchCMSCatalog(params),
    ]);

  const allResults: SupplierQuote[] = [];

  if (greenCheyResults.status === "fulfilled")
    allResults.push(...greenCheyResults.value);
  if (partsZoneResults.status === "fulfilled")
    allResults.push(...partsZoneResults.value);
  if (cmsResults.status === "fulfilled")
    allResults.push(...cmsResults.value);

  const priced = allResults.filter((q) => q.price > 0);
  const unpriced = allResults.filter((q) => q.price === 0);

  return [...priced.sort((a, b) => a.price - b.price), ...unpriced].slice(
    0,
    10
  );
}
