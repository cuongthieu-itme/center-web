import { createContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { SOCKET_URL } from "../lib/base-url";
import { useAuthStore } from "../stores/useAuthStore";

interface SocketContexType {
  socket: Socket | null;
}

interface SocketProviderProps {
  children: React.ReactNode;
}

export const SocketContext = createContext<SocketContexType | undefined>(
  undefined
);

export default function SocketProvider({ children }: SocketProviderProps) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { user } = useAuthStore();

  useEffect(() => {
    if (user?.id) {
      const socketConnection = io(SOCKET_URL, {
        query: {
          userId: user?.id,
        },
      });
      setSocket(socketConnection);
      // Cleanup on unmount or when the socket connection is no longer needed
      return () => {
        socketConnection.close();
      };
    }
    // Only re-run this effect when `user?.id` changes
    return () => {};
  }, [user?.id]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}
