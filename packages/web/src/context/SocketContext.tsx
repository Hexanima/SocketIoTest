import { ReactNode, createContext, useState } from "react";
import { Socket, io } from "socket.io-client";

interface SocketActions {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  socket: Socket;
  isConnected: boolean;
}

export const SocketContext = createContext({} as SocketActions);

const socket = io("http://192.168.0.231:3000");

export function SocketProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState<boolean>(socket.connected);

  async function connect() {
    await socket.connect();
    socket.on("connect", () => {
      alert(socket.id);
    });
    setIsConnected(true);
  }

  async function disconnect() {
    await socket.disconnect();
    setIsConnected(false);
  }

  const actions: SocketActions = { connect, disconnect, socket, isConnected };

  return (
    <SocketContext.Provider value={actions}>{children}</SocketContext.Provider>
  );
}
