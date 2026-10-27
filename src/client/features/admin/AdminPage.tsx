import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/client/components/PageHeader";
import { QueryState } from "@/client/components/QueryState";
import { Input } from "@/client/components/ui/input";
import { Badge } from "@/client/components/ui/badge";
import { Card, CardContent } from "@/client/components/ui/card";
import {
  Table,
  TableBody,
  TableCard,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/client/components/ui/table";
import { adminOverviewQueryOptions } from "@/client/features/admin/adminQueries";
import type { AdminOverview } from "@/server/admin/AdminRepository";

function formatDate(ms: number) {
  return new Date(ms).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <Card size="sm">
      <CardContent>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="mt-1 text-3xl font-semibold tabular-nums">
          {value.toLocaleString()}
        </p>
      </CardContent>
    </Card>
  );
}

function Totals({ totals }: { totals: AdminOverview["totals"] }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
      <Stat label="Users" value={totals.users} />
      <Stat label="Organizations" value={totals.organizations} />
      <Stat label="Paying" value={totals.payingOrganizations} />
      <Stat label="Projects" value={totals.projects} />
      <Stat label="Site audits" value={totals.audits} />
    </div>
  );
}

function OrganizationsTable({
  rows,
}: {
  rows: AdminOverview["organizations"];
}) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold">Organizations</h2>
      <TableCard>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead className="text-right">Members</TableHead>
              <TableHead className="text-right">Projects</TableHead>
              <TableHead className="text-right">Audits</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-muted-foreground">
                  No organizations yet.
                </TableCell>
              </TableRow>
            ) : null}
            {rows.map((org) => (
              <TableRow key={org.id}>
                <TableCell className="font-medium">
                  <Link
                    to="/admin/organizations/$organizationId"
                    params={{ organizationId: org.id }}
                    className="underline-offset-4 hover:underline"
                  >
                    {org.name}
                  </Link>
                </TableCell>
                <TableCell>
                  {org.isPaying ? (
                    <Badge>{org.plan ?? "Paid"}</Badge>
                  ) : (
                    <Badge variant="secondary">Free</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {org.members}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {org.projects}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {org.audits}
                </TableCell>
                <TableCell>{formatDate(org.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableCard>
    </section>
  );
}

function UsersTable({ rows }: { rows: AdminOverview["users"] }) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold">Users</h2>
      <TableCard>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Verified</TableHead>
              <TableHead className="text-right">Organizations</TableHead>
              <TableHead>Joined</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-muted-foreground">
                  No users yet.
                </TableCell>
              </TableRow>
            ) : null}
            {rows.map((u) => (
              <TableRow key={u.id}>
                <TableCell className="font-medium">{u.name}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>
                  {u.emailVerified ? (
                    <Badge variant="secondary">Yes</Badge>
                  ) : (
                    <Badge variant="outline">No</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {u.organizations}
                </TableCell>
                <TableCell>{formatDate(u.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableCard>
    </section>
  );
}

export function AdminPage() {
  const query = useQuery(adminOverviewQueryOptions());
  const [search, setSearch] = useState("");
  const needle = search.trim().toLowerCase();
  return (
    <div className="mx-auto w-full max-w-8xl space-y-6 p-4 md:p-6">
      <PageHeader
        title="Admin"
        description="Everyone on the platform, and how much they use it."
        actions={
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name or email"
            aria-label="Search organizations and users"
            className="w-64"
          />
        }
      />
      <QueryState query={query} errorFallback="Could not load the admin data.">
        {(data) => (
          <>
            <Totals totals={data.totals} />
            <OrganizationsTable
              rows={data.organizations.filter((o) =>
                o.name.toLowerCase().includes(needle),
              )}
            />
            <UsersTable
              rows={data.users.filter(
                (u) =>
                  u.name.toLowerCase().includes(needle) ||
                  u.email.toLowerCase().includes(needle),
              )}
            />
          </>
        )}
      </QueryState>
    </div>
  );
}
