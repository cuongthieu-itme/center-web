import { DataTable } from "@/components/shared/table";
import { columns } from "@/components/site/users/user-column";
import { useAdminStore } from "@/stores/useAdminStore";
import { useEffect, useMemo } from "react";

const filterName = "role";

export default function UserListPage() {
  const { getAllUsers, users } = useAdminStore();

  useEffect(() => {
    if (users.length === 0) {
      getAllUsers();
    }
  }, [getAllUsers, users.length]);

  const userData = useMemo(() => users, [users]);

  return (
    <section>
      <DataTable
        columns={columns}
        data={userData ?? []}
        filterName={filterName}
      />
    </section>
  );
}
