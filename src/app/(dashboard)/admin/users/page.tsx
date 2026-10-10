"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Eye, Search, Users } from "lucide-react";

import type { AdminUser,  } from "@/types/admin-user.types";
import { useAdminUsers } from "@/hooks/user.hooks";
import Image from "next/image";

const roles = ["ALL", "ADMIN", "MERCHANT", "RIDER"] as const;
const statuses = ["ALL", "ACTIVE", "INACTIVE", "SUSPENDED"] as const;

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-BD", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function statusClass(status: string) {
  switch (status) {
    case "ACTIVE":
      return "bg-emerald-50 text-emerald-700";
    case "SUSPENDED":
      return "bg-red-50 text-red-700";
    case "INACTIVE":
      return "bg-amber-50 text-amber-700";
    default:
      return "bg-slate-100 text-slate-600";
  }
}

export default function AdminUsersPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState<(typeof roles)[number]>("ALL");
  const [status, setStatus] = useState<(typeof statuses)[number]>("ALL");

  const { data, isPending, isError, error, refetch, isFetching } =
    useAdminUsers(page, 10);

  // API shape: response.data.data = users; response.data.meta = pagination
  const users: AdminUser[] = data?.data?.data ?? [];
  const meta = data?.data?.meta;

  const filteredUsers = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return users.filter((user) => {
      const matchesSearch =
        !normalizedSearch ||
        user.name.toLowerCase().includes(normalizedSearch) ||
        user.email.toLowerCase().includes(normalizedSearch) ||
        user.id.toLowerCase().includes(normalizedSearch);

      const matchesRole = role === "ALL" || user.role === role;
      const matchesStatus = status === "ALL" || user.status === status;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, search, role, status]);

  if (isPending) {
    return (
      <main className="space-y-6 p-4 md:p-8">
        <div className="h-8 w-52 animate-pulse rounded bg-slate-200" />
        <div className="h-28 animate-pulse rounded-2xl bg-slate-100" />
        <div className="h-80 animate-pulse rounded-2xl bg-slate-100" />
      </main>
    );
  }

  if (isError) {
    return (
      <main className="p-6 md:p-8">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <h2 className="font-semibold text-red-800">Unable to load users</h2>
          <p className="mt-2 text-sm text-red-700">
            {error instanceof Error ? error.message : "Please try again."}
          </p>
          <button
          type="button"
            onClick={() => refetch()}
            className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white"
          >
            Retry
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-w-0 space-y-6 p-4 md:p-8">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-emerald-700">ADMINISTRATION</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
            User Management
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            View user accounts and their merchant or rider profiles.
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
          <div className="rounded-lg bg-emerald-50 p-2 text-emerald-700">
            <Users size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-500">Total users</p>
            <p className="text-xl font-bold text-slate-900">
              {meta?.total ?? users.length}
            </p>
          </div>
        </div>
      </header>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">
        <div className="grid gap-3 md:grid-cols-[minmax(220px,1fr)_180px_180px]">
          <label className="relative block">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search name, email or ID..."
              className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </label>

          <select
            value={role}
            onChange={(event) =>
              setRole(event.target.value as (typeof roles)[number])
            }
            className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-emerald-500"
            aria-label="Filter by role"
          >
            {roles.map((item) => (
              <option key={item} value={item}>
                {item === "ALL" ? "All roles" : item}
              </option>
            ))}
          </select>

          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value as (typeof statuses)[number])
            }
            className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-emerald-500"
            aria-label="Filter by status"
          >
            {statuses.map((item) => (
              <option key={item} value={item}>
                {item === "ALL" ? "All statuses" : item}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-800">
              {filteredUsers.length}
            </span>{" "}
            of {users.length} loaded users
          </p>
          {isFetching && (
            <span className="text-xs text-slate-400">Updating...</span>
          )}
        </div>

        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left">
            <thead>
              <tr className="border-y border-slate-100 text-xs uppercase tracking-wide text-slate-500">
                <th className="px-4 py-3 font-semibold">User</th>
                <th className="px-4 py-3 font-semibold">Role</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Verification</th>
                <th className="px-4 py-3 font-semibold">Joined</th>
                <th className="px-4 py-3 text-right font-semibold">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="transition hover:bg-slate-50/80">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      {user.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <Image
                          src={user.imageUrl}
                          alt=""
                          width={500}
                          height={500}
                          className="h-10 w-10 rounded-full border border-slate-200 object-cover"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 font-semibold text-emerald-700">
                          {user.name.slice(0, 1).toUpperCase()}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="max-w-52 truncate text-sm font-semibold text-slate-900">
                          {user.name}
                        </p>
                        <p className="max-w-56 truncate text-xs text-slate-500">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <span className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-semibold text-slate-700">
                      {user.role}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1.5 text-xs font-semibold ${statusClass(user.status)}`}
                    >
                      {user.isDeleted ? "DELETED" : user.status}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`text-xs font-medium ${user.emailVerified ? "text-emerald-700" : "text-amber-700"}`}
                    >
                      {user.emailVerified ? "Verified" : "Not verified"}
                    </span>
                  </td>

                  <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-500">
                    {formatDate(user.createdAt)}
                  </td>

                  <td className="px-4 py-4 text-right">
                    <Link
                      href={`/admin/users/${user.id}`}
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800"
                    >
                      <Eye size={16} />
                      Details
                    </Link>
                  </td>
                </tr>
              ))}

              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-14 text-center">
                    <p className="font-medium text-slate-700">No users found</p>
                    <p className="mt-1 text-sm text-slate-500">
                      Try changing your search or filters.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            Page {meta?.page ?? page} of {meta?.totalPages ?? 1}
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={page <= 1 || isFetching}
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={16} />
              Previous
            </button>

            <button
              type="button"
              disabled={page >= (meta?.totalPages ?? 1) || isFetching}
              onClick={() => setPage((current) => current + 1)}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
