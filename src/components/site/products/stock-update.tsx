import { Input } from "@/components/ui/input";
import { useAdminStore } from "@/stores/useAdminStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { useState } from "react";

interface StockUpdateProps {
  id: number;
  stockValue: any;
}

export default function StockUpdate({ id, stockValue }: StockUpdateProps) {
  const [localValue, setLocalValue] = useState(stockValue);
  const { updateStock } = useAdminStore();
  const { user } = useAuthStore();
  const role = user?.role;

  // Check if user is manager or teacher (restricted role)
  const isRestricted = role === "MANAGER" || role === "teacher";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setLocalValue(newValue);
    updateStock(id, newValue);
  };

  return (
    <div>
      <Input
        readOnly={isRestricted}
        disabled={isRestricted}
        type="number"
        value={localValue}
        onChange={handleChange}
        className="w-24"
      />
    </div>
  );
}
