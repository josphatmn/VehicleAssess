import { getPayments } from "@/actions/assessments";
import { PaymentsList } from "@/components/payments-list";

export default async function PaymentsPage() {
  const data = await getPayments({ page: 1, limit: 20 });
  return <PaymentsList initialData={data} />;
}
