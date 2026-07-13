import { getAssessments } from "@/actions/assessments";
import { AssessmentsList } from "@/components/assessments-list";

export default async function AssessmentsPage() {
  const data = await getAssessments({ page: 1, limit: 20 });
  return <AssessmentsList initialData={data} />;
}
