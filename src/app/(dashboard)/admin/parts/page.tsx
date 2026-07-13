import { getVehicleParts, getVehicleVariants } from "@/actions/admin";
import { PartsClient } from "./parts-client";

export default async function PartsPage() {
  const [parts, variants] = await Promise.all([
    getVehicleParts(),
    getVehicleVariants(),
  ]);
  return <PartsClient parts={parts} variants={variants} />;
}
