import { getAssessment } from "@/actions/assessments";
import { notFound } from "next/navigation";
import { AssessmentDetail } from "@/components/assessment-detail";

export default async function AssessmentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    const assessment = await getAssessment(id);
    return <AssessmentDetail assessment={assessment} />;
  } catch {
    notFound();
  }
}
