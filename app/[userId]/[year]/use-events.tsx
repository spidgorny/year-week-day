import useSWR from "swr";

export function useEvents(userId: string) {
  const { isLoading, isValidating, error, data, mutate } = useSWR(
    `/api/${userId}`,
  );
  return {
    isLoading,
    error,
    user: data?.user,
    events: data?.events ?? [],
    mutate,
    isValidating,
  };
}
