import React from "react";
import { requireRole } from "@/lib/rbac/requireRole";

export default async function UsersSettingsPage() {
  await requireRole(["Admin"]);

  return (
    <div>
      <h1 className="mb-4 font-display text-3xl text-olive">Users and Team</h1>
      <p className="font-sans text-olive">
        Manage CMS access and team roles. Full role management will be added in
        the access-control step.
      </p>
    </div>
  );
}
