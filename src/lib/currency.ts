export const CURRENCY = process.env.NEXT_PUBLIC_CURRENCY || "KES";

export function formatCurrency(amount: number): string {
  return `${CURRENCY} ${amount.toLocaleString()}`;
}
