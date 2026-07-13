import { getUsers } from "@/actions/admin";
import { UsersClient } from "./users-client";

export default async function UsersPage() {
  const users = await getUsers();
  return <UsersClient users={users} />;
}
