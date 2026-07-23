import React from "react";
import { requireRole } from "@/lib/rbac/requireRole";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { updateUserRole, inviteUser, removeUser } from "./actions";

export const dynamic = "force-dynamic";

export default async function UsersSettingsPage() {
  await requireRole(["Admin"]);

  const supabase = getSupabaseAdmin() as any;
  const { data: users, error } = await supabase
    .from("users")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching users:", error);
  }

  return (
    <div className="space-y-8 font-sans max-w-5xl mx-auto">
      {/* Header */}
      <div className="border-b border-olive/10 pb-4 flex justify-between items-end">
        <div>
          <h1 className="font-display text-3xl font-semibold text-olive">Users & Team</h1>
          <p className="mt-1 text-sm text-olive/70">
            Manage system access, invite new team members and assign roles.
          </p>
        </div>
        <span className="px-3 py-1 bg-olive/5 text-olive text-[10px] font-bold uppercase tracking-wider rounded-sm border border-olive/10">
          Total Users: {users?.length || 0}
        </span>
      </div>

      {/* Invite New User Form */}
      <div className="bg-paper border border-olive/10 rounded-sm shadow-sm p-6">
        <h2 className="font-display text-lg font-semibold text-olive mb-4">Invite a Team Member</h2>
        <form action={inviteUser} className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-olive/50 mb-1.5">Name</label>
            <input
              type="text"
              name="name"
              required
              placeholder="Full name"
              className="w-full bg-cream border border-olive/10 rounded-sm px-3 py-2 text-sm font-sans text-olive focus:outline-none focus:border-gold transition-colors"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-olive/50 mb-1.5">Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="user@example.com"
              className="w-full bg-cream border border-olive/10 rounded-sm px-3 py-2 text-sm font-sans text-olive focus:outline-none focus:border-gold transition-colors"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-olive/50 mb-1.5">Role</label>
            <select
              name="role"
              defaultValue="Content Manager"
              className="w-full bg-cream border border-olive/10 rounded-sm px-3 py-2 text-sm font-sans text-olive focus:outline-none focus:border-gold transition-colors"
            >
              <option value="Admin">Admin</option>
              <option value="Content Manager">Content Manager</option>
              <option value="Marketer">Marketer</option>
            </select>
          </div>
          <button
            type="submit"
            className="font-sans text-[11px] font-bold uppercase tracking-widest text-cream bg-olive hover:bg-gold hover:text-ink px-4 py-2.5 rounded-sm transition-all"
          >
            Invite User
          </button>
        </form>
        <p className="mt-3 text-[11px] text-olive/50">
          A temporary password will be generated. Share login credentials securely with the new team member.
        </p>
      </div>

      {/* Users Table */}
      <div className="bg-paper border border-olive/10 rounded-sm shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-cream/40 border-b border-olive/10">
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-olive/50">User Details</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-olive/50">Current Role</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-olive/50">Change Role</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-olive/50 text-right">Remove</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-olive/5">
              {users?.map((u: any) => (
                <tr key={u.id} className="hover:bg-cream/10 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-display font-medium text-olive text-sm">
                        {u.name || "Unnamed User"}
                      </span>
                      <span className="font-sans text-xs text-olive/60 font-light">
                        {u.email}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-sm border ${
                      u.role === "Admin" ? "bg-olive/10 text-olive border-olive/20" :
                      u.role === "Content Manager" ? "bg-gold/10 text-gold border-gold/20" :
                      u.role === "Marketer" ? "bg-amber-50 text-amber-700 border-amber-200" :
                      "bg-cream text-olive/50 border-olive/10"
                    }`}>
                      {u.role || "Customer"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <form
                      action={async (formData: FormData) => {
                        "use server";
                        const newRole = formData.get("role")?.toString();
                        if (newRole) {
                          await updateUserRole(u.id, newRole);
                        }
                      }}
                      className="flex items-center gap-2"
                    >
                      <select
                        name="role"
                        defaultValue={u.role || "Customer"}
                        className="bg-cream border border-olive/10 rounded-sm px-2 py-1.5 text-xs font-sans text-olive focus:outline-none focus:border-gold transition-colors"
                      >
                        <option value="Customer">Customer</option>
                        <option value="Content Manager">Content Manager</option>
                        <option value="Marketer">Marketer</option>
                        <option value="Admin">Admin</option>
                      </select>
                      <button
                        type="submit"
                        className="font-sans text-[10px] font-bold uppercase tracking-widest text-cream bg-olive hover:bg-olive/90 px-3 py-1.5 rounded-sm transition-all"
                      >
                        Update
                      </button>
                    </form>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <form
                      action={async () => {
                        "use server";
                        await removeUser(u.id);
                      }}
                    >
                      <button
                        type="submit"
                        className="font-sans text-[10px] font-bold uppercase tracking-widest text-red-600 hover:text-red-800 border border-red-200 hover:border-red-400 hover:bg-red-50 px-3 py-1.5 rounded-sm transition-all"
                      >
                        Remove
                      </button>
                    </form>
                  </td>
                </tr>
              ))}

              {(!users || users.length === 0) && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-xs text-olive/50 italic">
                    No users found in the system.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
