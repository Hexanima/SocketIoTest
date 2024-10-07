import { useSocket } from "./hooks/useSocket";
import "./App.css";
import { FormEvent, useEffect, useState } from "react";

function App() {
  const { socket, connect, disconnect, isConnected } = useSocket();
  const [chatList, setChatList] = useState<string[]>([]);

  useEffect(() => {
    socket.on("chatUpdate", (text) => {
      setChatList(text);
    });
  }, []);

  async function handleSend(event: FormEvent) {
    event.preventDefault();

    socket.emit("sendMessage");
  }

  return (
    <main>
      <div className="Connections">
        <p>{isConnected ? `Conectado: ${socket.id}` : "Desconectado"}</p>
        <div className="Buttons">
          <button onClick={disconnect}>Desconectar</button>
          <button onClick={connect}>Conectar</button>
        </div>
      </div>
      <div className="Chat">
        <div className="List">
          {chatList.map((message, i) => (
            <p className="Message" key={i}>
              {message}
            </p>
          ))}
        </div>
        <form onSubmit={handleSend}>
          <input
            type="text"
            onInput={(event) => console.log(event.target.value)}
          />
          <button type="submit">ENVIAR</button>
        </form>
      </div>
    </main>
  );
}

export default App;
