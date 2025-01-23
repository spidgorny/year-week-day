"use server";
import React from "react";
import "@/css/App.scss";
import { redirect } from "next/navigation";

export default async function Home({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const year = new Date().getFullYear();
  redirect(`/${userId}/${year}`);

  return <div>Loading...</div>;
}
