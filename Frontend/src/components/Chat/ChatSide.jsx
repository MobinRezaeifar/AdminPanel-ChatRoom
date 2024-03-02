import { IoMdArrowBack } from "react-icons/io";
import ChatSideHeader from "./ChatSideHeader";
import CommunicationTools from "./CommunicationTools";
import Messages from "./Messages";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useEffect, useRef, useState } from "react";
import { animateScroll as scroll } from "react-scroll";

const ChatSide = ({ SelectUser }) => {
  const [SendMessagee, setSendMessagee] = useState([]);

  const SendMessage = async (message) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl(`https://localhost:7063/message`)
        .configureLogging(LogLevel.Information)
        .build();
      await connection.start();

      connection.invoke("Connect", message).catch((err) => console.error(err));

      connection.on("getSendmessage", (msg) => {
        setSendMessagee(msg);
      });

      // setConnection(connection);
    } catch (e) {
      console.log(e);
    }
  };


  return (
    <div
      className={`${
        !SelectUser && "hidden"
      } sm:w-4/5 w-full sm:block h-screen flex flex-col bg-[#c7c3ff25]`}
    >
      <div className="h-full flex flex-col bg-neutral">
        <ChatSideHeader SelectUser={SelectUser} />
        <div  className="flex-grow h-full overflow-y-auto">
          {!SelectUser && (
            <div className="h-full flex-grow flex justify-center">
              <h1 className=" flex items-center justify-center text-white gap-2 text-center">
                <IoMdArrowBack className="relative" size={23} />{" "}
                <span className="text-2xl ">Select A Person</span>
              </h1>
            </div>
          )}
          {SelectUser && (
            <Messages SelectUser={SelectUser} SendMessagee={SendMessagee} />
          )}
        </div>
        <CommunicationTools
          SendMessage={SendMessage}
          //chatContainerRef={chatContainerRef}
          SelectUser={SelectUser}
        />
      </div>
    </div>
  );
};

export default ChatSide;
