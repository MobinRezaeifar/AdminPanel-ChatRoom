/* eslint-disable no-unused-vars */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminPanel from "./routes/AdminPanel";
import Register from "./routes/Register";
import ChatRoom from "./routes/ChatRoom";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { Provider } from "react-redux";
import store from "./Redux/store";

import { useState } from "react";
import Login from "./routes/Login";
const App = () => {
  const [connection, setConnection] = useState();
  const [OnlineUsers, setOnlineUsers] = useState([]);
  const joinRoom = async (username) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl(`https://localhost:7063/chat`)
        .configureLogging(LogLevel.Information)
        .build();
      await connection.start();

      connection.invoke("Connect", username).catch((err) => console.error(err));

      connection.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      setConnection(connection);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Provider store={store}>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Register joinRoom={joinRoom} />} />
            <Route path="/login" element={<Login joinRoom={joinRoom} />} />
            <Route path="/panel" element={<AdminPanel />} />
            <Route
              path="/chat"
              element={<ChatRoom OnlineUsers={OnlineUsers} />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
};

export default App;
