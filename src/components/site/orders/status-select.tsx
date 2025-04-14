import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useOrderStore } from "@/stores/useOrderStore";

type StatusType = "PENDING" | "COMPLETED" | "CANCELLED";

export default function StatusSelect({
  id,
  status,
}: {
  id: number;
  status: StatusType;
}) {
  const { updateOrderStatus } = useOrderStore();

  const handleStatusChange = (newStatus: StatusType) => {
    updateOrderStatus(id, newStatus);
  };

  return (
    <Select value={status} onValueChange={handleStatusChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Order Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="PENDING">PENDING</SelectItem>
        <SelectItem value="COMPLETED">COMPLETED</SelectItem>
        <SelectItem value="CANCELLED">CANCELLED</SelectItem>
      </SelectContent>
    </Select>
  );
}
