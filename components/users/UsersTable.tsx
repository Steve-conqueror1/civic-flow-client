"use client";

import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import {
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Eye,
  UserCheck,
  UserMinus,
  ShieldBan,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { cn, formatDate, getErrorMessage } from "@/lib/utils";
import type { UserProfile } from "@/app/types/user";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import {
  useAdminActivateUserMutation,
  useAdminDeactivateUserMutation,
  useAdminUpdateUserMutation,
  useAdminDeleteUserMutation,
} from "@/app/state/api";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "vitest";
type RTKError = FetchBaseQueryError | SerializedError;

const columnHelper = createColumnHelper<UserProfile>();

const ROLE_BADGE: Record<string, string> = {
  admin: "bg-primary/10 text-primary",
  staff: "bg-slate-100 text-slate-600",
  citizen: "bg-slate-100 text-slate-600",
};

const STATUS_DOT: Record<string, string> = {
  active: "bg-emerald-500",
  inactive: "bg-slate-300",
  suspended: "bg-red-500",
};

function UserRowActions({ user }: { user: UserProfile }) {
  const router = useRouter();
  const [activateUser] = useAdminActivateUserMutation();
  const [deactivateUser] = useAdminDeactivateUserMutation();
  const [updateUser] = useAdminUpdateUserMutation();
  const [deleteUser] = useAdminDeleteUserMutation();

  const handleActivate = async () => {
    try {
      await activateUser(user.id).unwrap();
      toast.success("User set to active");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleDeactivate = async () => {
    try {
      await deactivateUser(user.id).unwrap();
      toast.success("User set to inactive");
    } catch (err) {
      toast.error(getErrorMessage(err as RTKError));
    }
  };

  const handleSuspend = async () => {
    try {
      await updateUser({ id: user.id, body: { status: "suspended" } }).unwrap();
      toast.success("User suspended");
    } catch (err) {
      toast.error(getErrorMessage(err as RTKError));
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUser(user.id).unwrap();

      toast.success("User deleted");
    } catch (err) {
      toast.error(getErrorMessage(err as RTKError));
    }
  };

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="p-2 text-slate-400 hover:text-primary transition-colors hover:cursor-pointer"
            aria-label="User actions"
            type="button"
          >
            <MoreVertical className="size-4" aria-hidden="true" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-32" align="end">
          <DropdownMenuItem
            className="hover:cursor-pointer"
            onClick={() => router.push(`/dashboard/users/${user.id}`)}
          >
            <Eye className="size-4 " aria-hidden="true" />
            View Profile
          </DropdownMenuItem>

          {user.status !== "active" && (
            <DropdownMenuItem
              className="hover:cursor-pointer"
              onClick={handleActivate}
            >
              <UserCheck className="size-4" aria-hidden="true" />
              Activate
            </DropdownMenuItem>
          )}

          {user.status !== "inactive" && (
            <DropdownMenuItem
              className="hover:cursor-pointer"
              onClick={handleDeactivate}
            >
              <UserMinus className="size-4" aria-hidden="true" />
              Deativate
            </DropdownMenuItem>
          )}

          {user.status !== "suspended" && (
            <DropdownMenuItem
              className="hover:cursor-pointer"
              onClick={handleSuspend}
            >
              <ShieldBan className="size-4 mr-2" aria-hidden="true" />
              Suspend
            </DropdownMenuItem>
          )}

          <DropdownMenuSeparator />

          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              className="hover:cursor-pointer"
              variant="destructive"
            >
              <Trash2 className="size-4" aria-hidden="true" />
              Delete
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete User</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete {user.firstName} {user.lastName}?
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="hover:cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white hover:cursor-pointer"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

const columns = [
  columnHelper.accessor((row) => `${row.firstName} ${row.lastName}`, {
    id: "name",
    header: "User Profile",
    cell: ({ row }) => (
      <div className="flex items-center gap-4">
        <span className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold text-xs shrink-0">
          {row.original.firstName.charAt(0).toUpperCase()}
          {row.original.lastName.charAt(0).toUpperCase()}
        </span>
        <div>
          <p className="text-sm font-bold text-slate-900 dark:text-white">
            {row.original.firstName} {row.original.lastName}
          </p>
          <p className="text-xs text-slate-500">{row.original.email}</p>
        </div>
      </div>
    ),
  }),
  columnHelper.accessor("role", {
    header: "Role",
    filterFn: "equals",
    cell: ({ getValue }) => {
      const role = getValue() ?? "";
      return (
        <span
          className={cn(
            "text-xs font-bold px-2 py-1 rounded capitalize",
            ROLE_BADGE[role] ?? "bg-slate-100 text-slate-600",
          )}
        >
          {role}
        </span>
      );
    },
  }),
  columnHelper.accessor("status", {
    header: "Status",
    filterFn: "equals",
    cell: ({ getValue }) => {
      const status = getValue() ?? "";
      return (
        <div className="flex items-center gap-1.5">
          <span
            className={cn(
              "w-2 h-2 rounded-full",
              STATUS_DOT[status] ?? "bg-slate-300",
            )}
            aria-hidden="true"
          />
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 capitalize">
            {status}
          </span>
        </div>
      );
    },
  }),
  columnHelper.accessor("updatedAt", {
    header: "Last Activity",
    cell: ({ getValue }) => (
      <p className="text-xs text-slate-900 dark:text-slate-100 font-medium">
        {formatDate(getValue())}
      </p>
    ),
  }),
  columnHelper.display({
    id: "actions",
    header: "Action",
    cell: ({ row }) => <UserRowActions user={row.original} />,
  }),
];

interface UsersTableProps {
  users: UserProfile[];
  total: number;
  page: number;
  limit: number;
  onPageChange: (page: number) => void;
}

export function UsersTable({
  users,
  total,
  page,
  limit,
  onPageChange,
}: UsersTableProps) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: users,
    columns,
    state: { columnFilters },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const roleValue = (table.getColumn("role")?.getFilterValue() as string) ?? "";
  const statusValue =
    (table.getColumn("status")?.getFilterValue() as string) ?? "";

  const pageStart = (page - 1) * limit + 1;
  const pageEnd = Math.min(page * limit, total);
  const canPreviousPage = page > 1;
  const canNextPage = page * limit < total;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      {/* Filter toolbar */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50 dark:bg-slate-800/50">
        <div className="flex flex-wrap items-center gap-2">
          <label htmlFor="role-filter" className="sr-only">
            Filter by role
          </label>
          <select
            id="role-filter"
            aria-label="Filter by role"
            value={roleValue}
            onChange={(e) =>
              table
                .getColumn("role")
                ?.setFilterValue(e.target.value || undefined)
            }
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-3 pr-8 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 focus:ring-primary focus:border-primary"
          >
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
            <option value="citizen">Citizen</option>
          </select>

          <label htmlFor="status-filter" className="sr-only">
            Filter by status
          </label>
          <select
            id="status-filter"
            aria-label="Filter by status"
            value={statusValue}
            onChange={(e) =>
              table
                .getColumn("status")
                ?.setFilterValue(e.target.value || undefined)
            }
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-3 pr-8 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 focus:ring-primary focus:border-primary"
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>

          {(roleValue || statusValue) && (
            <button
              onClick={() => setColumnFilters([])}
              className="text-xs font-bold text-primary px-3 py-2 hover:bg-blue-50 dark:hover:bg-blue-950 rounded transition-colors"
              type="button"
            >
              Clear All
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          {total > 0 && (
            <span className="text-xs font-bold text-slate-500">
              Showing {pageStart}–{pageEnd} of {total}
            </span>
          )}
          <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
            <button
              onClick={() => onPageChange(page - 1)}
              disabled={!canPreviousPage}
              className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 border-r border-slate-200 dark:border-slate-700 text-slate-400 disabled:opacity-40 hover:cursor-pointer"
              aria-label="Previous page"
              type="button"
            >
              <ChevronLeft className="size-4" aria-hidden="true" />
            </button>
            <button
              onClick={() => onPageChange(page + 1)}
              disabled={!canNextPage}
              className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 disabled:opacity-40 hover:cursor-pointer"
              aria-label="Next page"
              type="button"
            >
              <ChevronRight className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="bg-slate-50 dark:bg-slate-800"
              >
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-200 dark:border-slate-700"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-12 text-center text-sm text-slate-400"
                >
                  No users found
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
