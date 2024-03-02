import React, { useEffect, useState } from "react";
import { Avatar } from "antd";
import { FaPhoneFlip } from "react-icons/fa6";
import { CiMenuKebab } from "react-icons/ci";
import { IoIosArrowBack } from "react-icons/io";

const ChatSideHeader = ({ SelectUser }) => {

  
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const updateSize = () => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);
  return (
    <>
      {SelectUser && (
        <header
          style={{
            padding: "10px",
            borderRadius: "0 0 8px 8px",
            display: "flex",
            justifyContent: "space-between",
          }}
          className="w-full bg-gray-600 "
        >
          <div className="flex items-center" style={{ gap: "0.4rem" }}>
            {dimensions.width < 664 && (
              <IoIosArrowBack size={25} color="white" onClick={()=>{window.location.reload()}} />
            )}
            <Avatar
              size={43}
              className="bg-slate-400"
              style={{
                fontSize: "23px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
             <h1 style={{position:"relative"}}> {SelectUser[0]}</h1>
            </Avatar>
            <h1 style={{ fontSize: "23px", color: "white" }}>{SelectUser}</h1>
          </div>
          <div
            className="flex items-center"
            style={{ gap: "0.6rem", padding: "0 10px" }}
          >
            <FaPhoneFlip size={24} color="white" />{" "}  
            <CiMenuKebab size={26} color="white" />
          </div>
        </header>
      )}
    </>
  );
};

export default ChatSideHeader;
