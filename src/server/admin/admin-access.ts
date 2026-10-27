import { env } from "cloudflare:workers";
import { AppError } from "@/server/lib/errors";

/** Platform admins: ADMIN_EMAILS, plus the fixed local admin in local_noauth. */
export function isPlatformAdmin(email: string): boolean {
  if (env.AUTH_MODE === "local_noauth") return true;
  const allowed = (env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
  return allowed.includes(email.trim().toLowerCase());
}

export function requirePlatformAdmin(email: string) {
  // NOT_FOUND, so the page's existence is not revealed to other users.
  if (!isPlatformAdmin(email)) throw new AppError("NOT_FOUND");
}
