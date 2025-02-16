import useSWR from "swr";
import { IEvent } from "@components/TBodySelection.tsx";

export function useEvents(userId: string) {
  const { isLoading, isValidating, error, data, mutate } = useSWR(
    `/api/${userId}`,
  );
  return {
    isLoading,
    error,
    user: data?.user,
    events: (data?.events ?? []) as IEvent[],
    mutate,
    isValidating,
  };
}
