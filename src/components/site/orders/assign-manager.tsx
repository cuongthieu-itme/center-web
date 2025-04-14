import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useManagerStore } from "@/stores/useManagerStore";
import { useEffect, useState } from "react";
import { useOrderStore } from "../../../stores/useOrderStore";

export default function AssignManager({
  id,
  name,
}: {
  id: number;
  name: string;
  managerId: number | null;
}) {
  const { managers, getAllManagers } = useManagerStore();
  const [selectedName, setSelectedName] = useState(name);
  const { updateOrders } = useOrderStore();

  //when bulk route is disabled this effect is needed to disable managers
  useEffect(() => {
    getAllManagers();
  }, [getAllManagers]);

  //direct assigning order
  const handleAssignOrder = (newManagerName: string) => {
    const selectedManager = managers.find(
      (manager) => manager.name === newManagerName
    );

    if (selectedManager) {
      updateOrders(id, selectedManager.id, newManagerName);
      setSelectedName(newManagerName);
    }
  };

  return (
    <Select value={selectedName} onValueChange={handleAssignOrder}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Manager" />
      </SelectTrigger>
      <SelectContent>
        {managers.map((manager) => (
          <SelectItem value={manager.name} key={manager.id}>
            {manager.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
