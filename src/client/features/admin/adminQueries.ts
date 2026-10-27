import { queryOptions } from "@tanstack/react-query";
import { getAdminAccess, getAdminOverview } from "@/serverFunctions/admin";

export const adminAccessQueryOptions = () =>
  queryOptions({
    queryKey: ["admin", "access"],
    queryFn: () => getAdminAccess(),
    staleTime: 5 * 60 * 1000,
  });

export const adminOverviewQueryOptions = () =>
  queryOptions({
    queryKey: ["admin", "overview"],
    queryFn: () => getAdminOverview(),
  });
