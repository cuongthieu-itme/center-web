import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useManagerStore } from "@/stores/useManagerStore";
import { useEffect, useState } from "react";
import useSocket from "../../../hooks/user-socket";
import { useOrderStore } from "../../../stores/useOrderStore";

export default function AssignManager({
  id,
  username,
}: {
  id: number;
  username: string;
  managerId: number | null;
}) {
  const { managers, getAllManagers } = useManagerStore();
  const { socket } = useSocket();
  const [selectedUsername, setSelectedUsername] = useState(username);
  const { updateOrders } = useOrderStore();

  //when bulk route is disabled this effect is needed to disable managers
  useEffect(() => {
    getAllManagers();
  }, [getAllManagers]);

  useEffect(() => {
    socket?.on("assignorderupdated", (uorder) => {
      updateOrders(uorder.id, uorder.managerId, uorder.manager.username);
    });

    return () => {
      socket?.off("assignorderupdated");
    };
  }, [socket, updateOrders]);

  //real time assigning order
  const handleAssignOrder = (newManagerUsername: string) => {
    const selectedManager = managers.find(
      (manager) => manager.username === newManagerUsername
    );

    if (selectedManager && socket) {
      socket.emit("assignorder", {
        orderId: id,
        managerId: selectedManager.id,
      });
      setSelectedUsername(newManagerUsername);
    }
  };

  return (
    <Select value={selectedUsername} onValueChange={handleAssignOrder}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Manager" />
      </SelectTrigger>
      <SelectContent>
        {managers.map((manager) => (
          <SelectItem value={manager.username} key={manager.id}>
            {manager.username}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
