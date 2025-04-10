import { ColumnDef } from "@tanstack/react-table";
import UserActionMenu from "./user-action-menu";

export type UserType = {
  id: number;
  email: string;
  username: string;
  role: "ADMIN" | "MANAGER";
};

export const columns: ColumnDef<UserType>[] = [
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    id: "actions",
    enableHiding: false,
    header: "Actions",
    cell: ({ row }) => {
      return <UserActionMenu id={row.original.id} />;
    },
  },
];
