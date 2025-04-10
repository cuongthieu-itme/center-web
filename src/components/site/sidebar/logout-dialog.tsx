import { Loader } from "lucide-react";
import { useAuthStore } from "../../../stores/useAuthStore";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";

interface LogoutDialogProps {
  open: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LogoutDialog({ open, setIsOpen }: LogoutDialogProps) {
  const { loading, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to log out?</DialogTitle>
          <DialogDescription>
            This will end your current session and you will need to log in again
            to access your account.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button disabled={loading} type="button" onClick={handleLogout}>
            {loading && <Loader className="animate-spin" />}
            Log Out
          </Button>
          <Button type="button" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
