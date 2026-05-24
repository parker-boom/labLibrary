import { redirect } from "next/navigation";

type TrackRedirectPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function TrackRedirectPage({ params }: TrackRedirectPageProps) {
  const { id } = await params;
  redirect(`/missions/${id}`);
}
