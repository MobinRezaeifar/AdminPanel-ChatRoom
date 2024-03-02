import React, { useState } from "react";
import ContactsSide from "../components/Chat/ContactsSide";
import ChatSide from "../components/Chat/ChatSide";

const ChatRoom = ({ OnlineUsers }) => {
  let [SelectUser, setSelectUser] = useState("");

  return (
    <div className="h-screen flex">
      <ContactsSide
        OnlineUsers={OnlineUsers}
        setSelectUser={setSelectUser}
        SelectUser={SelectUser}
      />
      <ChatSide SelectUser={SelectUser} />
    </div>
  );
};

export default ChatRoom;
