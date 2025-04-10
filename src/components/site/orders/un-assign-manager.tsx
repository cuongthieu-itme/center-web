import { toast } from "sonner";
import { useAuthStore } from "../../../stores/useAuthStore";
import { useManagerStore } from "../../../stores/useManagerStore";
import { Button } from "../../ui/button";

export default function UnAssignManager({
  id,
  managerId,
}: {
  id: number;
  managerId: number | null;
}) {
  const { unassignManager } = useManagerStore();
  const { user } = useAuthStore();
  const authRole = user?.role;

  const handleUnassignManager = () => {
    if (!managerId) return;

    if (authRole === "ADMIN") {
      unassignManager(managerId, id);
    }
    toast.error("You need to be admin to unassign manager");
  };

  return (
    <Button onClick={handleUnassignManager} disabled={authRole === "MANAGER"}>
      unassign Manager
    </Button>
  );
}
