import { createFileRoute } from "@tanstack/react-router";
import { AdminPage } from "@/client/features/admin/AdminPage";

export const Route = createFileRoute("/_app/admin")({
  component: AdminPage,
});
