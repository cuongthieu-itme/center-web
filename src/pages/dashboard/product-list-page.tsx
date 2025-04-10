import { DataTable } from "@/components/shared/table";
import { useEffect, useMemo } from "react";
import { columns } from "../../components/site/products/product-column";
import { useAdminStore } from "../../stores/useAdminStore";

const filterName = "name";

export default function ProductListPage() {
  const { getallProducts, products } = useAdminStore();

  useEffect(() => {
    if (products.length === 0) {
      getallProducts();
    }
  }, [getallProducts, products.length]);

  const productsData = useMemo(() => products, [products]);

  return (
    <section>
      <DataTable
        columns={columns}
        data={productsData ?? []}
        filterName={filterName}
      />
    </section>
  );
}
