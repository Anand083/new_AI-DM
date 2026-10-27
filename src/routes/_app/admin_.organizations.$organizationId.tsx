import { createFileRoute } from "@tanstack/react-router";
import { AdminOrganizationPage } from "@/client/features/admin/AdminOrganizationPage";

export const Route = createFileRoute("/_app/admin_/organizations/$organizationId")(
  { component: OrganizationRoute },
);

function OrganizationRoute() {
  const { organizationId } = Route.useParams();
  return <AdminOrganizationPage organizationId={organizationId} />;
}
