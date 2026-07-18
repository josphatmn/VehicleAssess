declare module "vanta" {
  export function NET(options: Record<string, unknown>): { destroy: () => void };
  export function WAVES(options: Record<string, unknown>): { destroy: () => void };
  export function CELLS(options: Record<string, unknown>): { destroy: () => void };
  export function GLOBE(options: Record<string, unknown>): { destroy: () => void };
}

declare module "vanta/dist/vanta.net.min" {
  const NET: (options: Record<string, unknown>) => { destroy: () => void };
  export default NET;
}

declare module "vanta/dist/vanta.waves.min" {
  const WAVES: (options: Record<string, unknown>) => { destroy: () => void };
  export default WAVES;
}

declare module "vanta/dist/vanta.cells.min" {
  const CELLS: (options: Record<string, unknown>) => { destroy: () => void };
  export default CELLS;
}

declare module "vanta/dist/vanta.globe.min" {
  const GLOBE: (options: Record<string, unknown>) => { destroy: () => void };
  export default GLOBE;
}
