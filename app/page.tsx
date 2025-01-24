"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    let userId = localStorage.getItem("userId");
    if (!userId) {
      userId = uuidv4();
      localStorage.setItem("userId", userId);
    }
    router.push(`/${userId}`);
  }, []);

  return <div>Loading...</div>;
}
