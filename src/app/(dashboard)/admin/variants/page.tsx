import { getVehicleVariants, getVehicleModels } from "@/actions/admin";
import { VariantsClient } from "./variants-client";

export default async function VariantsPage() {
  const [variants, models] = await Promise.all([
    getVehicleVariants(),
    getVehicleModels(),
  ]);
  return <VariantsClient variants={variants} models={models} />;
}
