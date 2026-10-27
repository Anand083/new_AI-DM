import { createServerFn } from "@tanstack/react-start";
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
