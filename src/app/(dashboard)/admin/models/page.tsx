import { getVehicleModels, getVehicleMakes } from "@/actions/admin";
import { ModelsClient } from "./models-client";

export default async function ModelsPage() {
  const [models, makes] = await Promise.all([
    getVehicleModels(),
    getVehicleMakes(),
  ]);
  return <ModelsClient models={models} makes={makes} />;
}
