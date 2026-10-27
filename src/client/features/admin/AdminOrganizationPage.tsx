import { useQuery } from "@tanstack/react-query";
import { BackLink, PageHeader } from "@/client/components/PageHeader";
import { QueryState } from "@/client/components/QueryState";
import { Badge } from "@/client/components/ui/badge";
import {
  Table,
  TableBody,
  TableCard,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/client/components/ui/table";
import { adminOrganizationQueryOptions } from "@/client/features/admin/adminQueries";

function formatDate(value: string | number) {
  return new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function AdminOrganizationPage({
  organizationId,
}: {
  organizationId: string;
}) {
  const query = useQuery(adminOrganizationQueryOptions(organizationId));
  return (
    <div className="mx-auto w-full max-w-8xl space-y-6 p-4 md:p-6">
      <QueryState
        query={query}
        errorFallback="Could not load this organization."
      >
        {(org) => (
          <>
            <PageHeader
              backLink={
                <BackLink to="/admin">Admin</BackLink>
              }
              title={org.name}
              description={`Created ${formatDate(org.createdAt)}`}
              actions={
                org.isPaying ? (
                  <Badge>{org.plan ?? "Paid"}</Badge>
                ) : (
                  <Badge variant="secondary">Free</Badge>
                )
              }
            />

            <section className="space-y-3">
              <h2 className="text-lg font-semibold">Members</h2>
              <TableCard>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {org.members.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={3} className="text-muted-foreground">
                          No members.
                        </TableCell>
                      </TableRow>
                    ) : null}
                    {org.members.map((m) => (
                      <TableRow key={m.userId}>
                        <TableCell className="font-medium">{m.name}</TableCell>
                        <TableCell>{m.email}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{m.role}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableCard>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold">Projects</h2>
              <TableCard>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Domain</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {org.projects.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-muted-foreground">
                          No projects.
                        </TableCell>
                      </TableRow>
                    ) : null}
                    {org.projects.map((p) => (
                      <TableRow key={p.id}>
                        <TableCell className="font-medium">{p.name}</TableCell>
                        <TableCell>{p.domain ?? "None"}</TableCell>
                        <TableCell>
                          {p.archived ? (
                            <Badge variant="outline">Archived</Badge>
                          ) : (
                            <Badge variant="secondary">Active</Badge>
                          )}
                        </TableCell>
                        <TableCell>{formatDate(p.createdAt)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableCard>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold">Recent site audits</h2>
              <TableCard>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Site</TableHead>
                      <TableHead>Project</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Pages</TableHead>
                      <TableHead>Started</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {org.recentAudits.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-muted-foreground">
                          No audits yet.
                        </TableCell>
                      </TableRow>
                    ) : null}
                    {org.recentAudits.map((a) => (
                      <TableRow key={a.id}>
                        <TableCell className="font-medium">
                          {a.startUrl}
                        </TableCell>
                        <TableCell>{a.projectName}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              a.status === "failed" ? "destructive" : "secondary"
                            }
                          >
                            {a.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                          {a.pagesCrawled}
                        </TableCell>
                        <TableCell>{formatDate(a.startedAt)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableCard>
            </section>
          </>
        )}
      </QueryState>
    </div>
  );
}
