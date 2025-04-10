import { DataTable } from "@/components/shared/table";
import { columns } from "@/components/site/orders/order-column";
import { useOrderStore } from "@/stores/useOrderStore";
import { useEffect } from "react";
import { useAuthStore } from "../../stores/useAuthStore";

const filterName = "status";

export default function OrdersListPage() {
  const { getAllOrders, getAllOrderForManager, orders } = useOrderStore();
  const { user } = useAuthStore();
  const authRole = user?.role;

  //fetches data based on role
  useEffect(() => {
    if (authRole && authRole === "ADMIN") {
      if (orders.length === 0) {
        getAllOrders();
      }
    } else if (authRole && authRole === "MANAGER") {
      if (orders.length === 0) {
        getAllOrderForManager();
      }
    }
  }, [getAllOrders, getAllOrderForManager, authRole, orders.length]);

  return (
    <section>
      <DataTable
        columns={columns}
        data={orders ?? []}
        filterName={filterName}
      />
    </section>
  );
}
