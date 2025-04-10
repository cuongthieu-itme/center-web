import { ColumnDef } from "@tanstack/react-table";
import AssignManager from "./assign-manager";
import StatusSelect from "./status-select";
import UnAssignManager from "./un-assign-manager";

export type OrderType = {
  id: number;
  status: "PENDING" | "COMPLETED" | "CANCELLED";
  totalAmount?: number;
  managerId: number | null;
  manager: {
    username: string | null;
  } | null;
};

export const columns: ColumnDef<OrderType>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
  },
  {
    accessorKey: "status",
    header: "Order Status",
    cell: ({ row, getValue }) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const status = getValue() as any;
      return <StatusSelect id={row.original.id} status={status} />;
    },
  },
  {
    accessorKey: "managerId",
    header: "Manager ID",
  },
  {
    accessorKey: "manager.username",
    header: "Manager",
  },
  {
    accessorKey: "remove",
    header: "Remove",
    cell: ({ row }) => {
      return (
        <UnAssignManager
          id={row.original.id}
          managerId={row.original.managerId ?? 1}
        />
      );
    },
  },
  {
    accessorKey: "assign",
    header: "Assign Manager",
    cell: ({ row }) => {
      const manager = row?.original?.manager;
      return (
        <AssignManager
          id={row.original.id}
          username={manager?.username || "Unassigned"}
          managerId={row.original.managerId ?? null}
        />
      );
    },
  },
];
