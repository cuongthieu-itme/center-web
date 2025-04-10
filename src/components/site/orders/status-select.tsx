import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useSocket from "@/hooks/user-socket";
import { useOrderStore } from "@/stores/useOrderStore";
import { useEffect } from "react";

type StatusType = "PENDING" | "COMPLETED" | "CANCELLED";

export default function StatusSelect({
  id,
  status,
}: {
  id: number;
  status: StatusType;
}) {
  const { socket } = useSocket();
  const { updateOrderStatus } = useOrderStore();

  //updates status in realtime
  useEffect(() => {
    socket?.on("statusUpdated", (updatedOrder) => {
      updateOrderStatus(updatedOrder.id, updatedOrder.status);
    });

    return () => {
      socket?.off("statusUpdated");
    };
  }, [socket, updateOrderStatus]);

  const handleStatusChange = (newStatus: StatusType) => {
    if (socket) {
      socket.emit("updateStatus", { id: id, status: newStatus });
    }
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
