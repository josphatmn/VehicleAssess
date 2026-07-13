import { getVehicleMakes } from "@/actions/admin";
import { MakesClient } from "./makes-client";

export default async function MakesPage() {
  const makes = await getVehicleMakes();
  return <MakesClient makes={makes} />;
}
