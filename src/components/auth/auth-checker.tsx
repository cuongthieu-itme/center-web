import { useEffect } from "react";
import { useAuthStore } from "../../stores/useAuthStore";

export default function AuthChecker() {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    // Verify authentication status when component mounts
    checkAuth();
  }, [checkAuth]);

  return null; // This component doesn't render anything
}
