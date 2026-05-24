import { redirect } from "next/navigation";

type EventRedirectPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EventRedirectPage({ params }: EventRedirectPageProps) {
  const { id } = await params;
  redirect(`/reports/${id}`);
}
