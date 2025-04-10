import { ColumnDef } from "@tanstack/react-table";
import ProductActionMenu from "./product-action-menu";
import StockUpdate from "./stock-update";

export type ProductType = {
  id: number;
  name: string;
  description: string;
  stock: number;
  price: number;
};

export const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "stock",
    header: "Stock",
    cell: ({ row, getValue }) => {
      const stock = getValue();
      return <StockUpdate id={row?.original.id} stockValue={stock} />;
    },
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    id: "actions",
    enableHiding: false,
    header: "Actions",
    cell: ({ row }) => {
      return <ProductActionMenu id={row.original.id} />;
    },
  },
];
