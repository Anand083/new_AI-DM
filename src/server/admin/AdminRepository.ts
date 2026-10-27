import { count, desc, eq, inArray, sql } from "drizzle-orm";
import { db } from "@/db";
import {
  audits,
  billingCustomerStatus,
  member,
  organization,
  projects,
  user,
} from "@/db/schema";

export type AdminOverview = {
  totals: {
    users: number;
    organizations: number;
    projects: number;
    audits: number;
    payingOrganizations: number;
  };
  organizations: Array<{
    id: string;
    name: string;
    createdAt: number;
    members: number;
    projects: number;
    audits: number;
    isPaying: boolean;
    plan: string | null;
  }>;
  users: Array<{
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    createdAt: number;
    organizations: number;
  }>;
};

export type AdminOrganizationDetail = {
  id: string;
  name: string;
  createdAt: number;
  isPaying: boolean;
  plan: string | null;
  members: Array<{
    userId: string;
    name: string;
    email: string;
    role: string;
  }>;
  projects: Array<{
    id: string;
    name: string;
    domain: string | null;
    createdAt: string;
    archived: boolean;
  }>;
  recentAudits: Array<{
    id: string;
    projectName: string;
    startUrl: string;
    status: string;
    pagesCrawled: number;
    startedAt: string;
  }>;
};

const LIST_LIMIT = 100;

async function countRows(
  table: typeof user | typeof organization | typeof projects | typeof audits,
) {
  const [row] = await db.select({ value: count() }).from(table);
  return row?.value ?? 0;
}

export const AdminRepository = {
  async getOverview(): Promise<AdminOverview> {
    const [users, organizations, projectCount, auditCount, paying] =
      await Promise.all([
        countRows(user),
        countRows(organization),
        countRows(projects),
        countRows(audits),
        db
          .select({ value: count() })
          .from(billingCustomerStatus)
          .where(eq(billingCustomerStatus.isPaying, true)),
      ]);

    const memberCounts = db
      .select({
        organizationId: member.organizationId,
        members: count().as("members"),
      })
      .from(member)
      .groupBy(member.organizationId)
      .as("member_counts");
    const projectCounts = db
      .select({
        organizationId: projects.organizationId,
        projects: count().as("projects"),
      })
      .from(projects)
      .groupBy(projects.organizationId)
      .as("project_counts");
    const auditCounts = db
      .select({
        organizationId: projects.organizationId,
        audits: count().as("audits"),
      })
      .from(audits)
      .innerJoin(projects, eq(audits.projectId, projects.id))
      .groupBy(projects.organizationId)
      .as("audit_counts");

    const orgRows = await db
      .select({
        id: organization.id,
        name: organization.name,
        createdAt: organization.createdAt,
        members: sql<number>`coalesce(${memberCounts.members}, 0)`,
        projects: sql<number>`coalesce(${projectCounts.projects}, 0)`,
        audits: sql<number>`coalesce(${auditCounts.audits}, 0)`,
        isPaying: billingCustomerStatus.isPaying,
        plan: billingCustomerStatus.paidPlanId,
      })
      .from(organization)
      .leftJoin(memberCounts, eq(memberCounts.organizationId, organization.id))
      .leftJoin(
        projectCounts,
        eq(projectCounts.organizationId, organization.id),
      )
      .leftJoin(auditCounts, eq(auditCounts.organizationId, organization.id))
      .leftJoin(
        billingCustomerStatus,
        eq(billingCustomerStatus.organizationId, organization.id),
      )
      .orderBy(desc(organization.createdAt))
      .limit(LIST_LIMIT);

    const membershipCounts = db
      .select({ userId: member.userId, organizations: count().as("orgs") })
      .from(member)
      .groupBy(member.userId)
      .as("membership_counts");
    const userRows = await db
      .select({
        id: user.id,
        name: user.name,
        email: user.email,
        emailVerified: user.emailVerified,
        createdAt: user.createdAt,
        organizations: sql<number>`coalesce(${membershipCounts.organizations}, 0)`,
      })
      .from(user)
      .leftJoin(membershipCounts, eq(membershipCounts.userId, user.id))
      .orderBy(desc(user.createdAt))
      .limit(LIST_LIMIT);

    return {
      totals: {
        users,
        organizations,
        projects: projectCount,
        audits: auditCount,
        payingOrganizations: paying[0]?.value ?? 0,
      },
      organizations: orgRows.map((row) => ({
        ...row,
        createdAt: new Date(row.createdAt).getTime(),
        members: Number(row.members),
        projects: Number(row.projects),
        audits: Number(row.audits),
        isPaying: Boolean(row.isPaying),
      })),
      users: userRows.map((row) => ({
        ...row,
        createdAt: new Date(row.createdAt).getTime(),
        organizations: Number(row.organizations),
      })),
    };
  },

  async getOrganizationDetail(
    organizationId: string,
  ): Promise<AdminOrganizationDetail | null> {
    const [org] = await db
      .select({
        id: organization.id,
        name: organization.name,
        createdAt: organization.createdAt,
        isPaying: billingCustomerStatus.isPaying,
        plan: billingCustomerStatus.paidPlanId,
      })
      .from(organization)
      .leftJoin(
        billingCustomerStatus,
        eq(billingCustomerStatus.organizationId, organization.id),
      )
      .where(eq(organization.id, organizationId))
      .limit(1);
    if (!org) return null;

    const memberRows = await db
      .select({
        userId: user.id,
        name: user.name,
        email: user.email,
        role: member.role,
      })
      .from(member)
      .innerJoin(user, eq(user.id, member.userId))
      .where(eq(member.organizationId, organizationId));

    const projectRows = await db
      .select({
        id: projects.id,
        name: projects.name,
        domain: projects.domain,
        createdAt: projects.createdAt,
        archivedAt: projects.archivedAt,
      })
      .from(projects)
      .where(eq(projects.organizationId, organizationId))
      .orderBy(desc(projects.createdAt));

    const projectIds = projectRows.map((row) => row.id);
    const auditRows =
      projectIds.length === 0
        ? []
        : await db
            .select({
              id: audits.id,
              projectId: audits.projectId,
              startUrl: audits.startUrl,
              status: audits.status,
              pagesCrawled: audits.pagesCrawled,
              startedAt: audits.startedAt,
            })
            .from(audits)
            .where(inArray(audits.projectId, projectIds))
            .orderBy(desc(audits.startedAt))
            .limit(10);
    const projectNames = new Map(projectRows.map((row) => [row.id, row.name]));

    return {
      id: org.id,
      name: org.name,
      createdAt: new Date(org.createdAt).getTime(),
      isPaying: Boolean(org.isPaying),
      plan: org.plan,
      members: memberRows,
      projects: projectRows.map((row) => ({
        id: row.id,
        name: row.name,
        domain: row.domain,
        createdAt: row.createdAt,
        archived: row.archivedAt !== null,
      })),
      recentAudits: auditRows.map((row) => ({
        id: row.id,
        projectName: projectNames.get(row.projectId) ?? "",
        startUrl: row.startUrl,
        status: row.status,
        pagesCrawled: row.pagesCrawled,
        startedAt: row.startedAt,
      })),
    };
  },
};
