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
          <DialogTitle>Bạn có chắc muốn đăng xuất không?</DialogTitle>
          <DialogDescription>
            Đăng xuất sẽ kết thúc phiên làm việc của bạn và bạn sẽ cần đăng nhập lại để truy cập tài khoản.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button disabled={loading} type="button" onClick={handleLogout}>
            {loading && <Loader className="animate-spin" />}
            Đăng xuất
          </Button>
          <Button type="button" onClick={() => setIsOpen(false)}>
            Hủy
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
