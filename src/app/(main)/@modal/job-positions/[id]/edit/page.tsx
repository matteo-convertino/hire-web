import EditJobPositionPage from "@/features/job-positions/pages/EditJobPositionPage";
import { fetchJobPositionById } from "@/features/job-positions/api/fetchJobPositionById";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { response, error } = await fetchJobPositionById({
    idString: id,
    onError: () => redirect("/")
  });

  return <EditJobPositionPage initialJobPosition={response} />;
}
