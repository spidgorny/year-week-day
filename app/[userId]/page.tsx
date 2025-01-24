"use server";
import { redirect } from "next/navigation";

export default async function Home({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const year = new Date().getFullYear();
  redirect(`/${userId}/${year}`);

  // return <div>Loading...</div>;
}
