import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { AppError } from "@/server/lib/errors";
import {
  isPlatformAdmin,
  requirePlatformAdmin,
} from "@/server/admin/admin-access";
import { AdminRepository } from "@/server/admin/AdminRepository";
import { requireAuthenticatedContext } from "@/serverFunctions/middleware";

/** Whether to show the Admin link. The data functions re-check on every call. */
export const getAdminAccess = createServerFn({ method: "GET" })
  .middleware(requireAuthenticatedContext)
  .handler(({ context }) => ({ isAdmin: isPlatformAdmin(context.userEmail) }));

export const getAdminOverview = createServerFn({ method: "GET" })
  .middleware(requireAuthenticatedContext)
  .handler(async ({ context }) => {
    requirePlatformAdmin(context.userEmail);
    return AdminRepository.getOverview();
  });

export const getAdminOrganization = createServerFn({ method: "GET" })
  .middleware(requireAuthenticatedContext)
  .validator(z.object({ organizationId: z.string().min(1) }))
  .handler(async ({ data, context }) => {
    requirePlatformAdmin(context.userEmail);
    const detail = await AdminRepository.getOrganizationDetail(
      data.organizationId,
    );
    if (!detail) throw new AppError("NOT_FOUND");
    return detail;
  });
