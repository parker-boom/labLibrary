import { redirect } from "next/navigation";

type UseCaseRedirectPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function UseCaseRedirectPage({ params }: UseCaseRedirectPageProps) {
  const { id } = await params;
  redirect(`/workflows/${id}`);
}
