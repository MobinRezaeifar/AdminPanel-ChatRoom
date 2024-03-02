/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-lone-blocks */
/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { fetchRegisters } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";


const ContactsSide = ({ OnlineUsers, setSelectUser, SelectUser }) => {
  const [collapsed, setCollapsed] = useState(false);

  const index = decodeURIComponent(document.cookie).indexOf(",");
  const mainUser = decodeURIComponent(document.cookie).slice(0, index);
  const navigate = useNavigate();

  function getItem(label, key, icon, children, type, title) {
    return {
      key,
      icon,
      children,
      label,
      type,
      title,
    };
  }


  let [UserNameUserRegisterList, setUsernameUsersRegisterList] = useState([]);
  let [OnlineUserName, setOnlineUserName] = useState([]);

  const dispatch = useDispatch();
  const Registers = useSelector((state) => state.Registers);


  useEffect(() => {
    dispatch(fetchRegisters());
  }, [dispatch]);

  Registers.map((data) => {
    if (!UserNameUserRegisterList.includes(data.username)) {
      UserNameUserRegisterList.push(data.username);
    }
  });

  OnlineUsers.map((data) => {
    if (!OnlineUserName.includes(data.username)) {
      OnlineUserName.push(data.username);
    }
  });

  const items = UserNameUserRegisterList.map((data) => {
    if (data != mainUser) {
      return getItem(
        data,
        data,
        <UserOutlined
          style={{ color: !OnlineUserName.includes(data) ? "red" : "green" }}
        />
      );
    }
  });

  const onClick = (e) => {
    setSelectUser(e.key);
  };

  return (
    <div
      className={`w-full sm:w-1/5 ${
        SelectUser && "hidden"
      } sm:block  bg-[#1c232d] `}
    >
      <div className="">
        <div className="mt-3 ml-3">
          <h1
            className="text-2xl flex gap-2 items-center text-[#ffffffb6] cursor-pointer"
            onClick={() => {
              navigate("/panel");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
              />
            </svg>
            Chat Room
          </h1>
        </div>
        <div className="mt-6">
          <Menu
            onClick={onClick}
            className="h-full text-xl bg-[#1c232d] "
            defaultSelectedKeys={["0"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            theme="dark"
            inlineCollapsed={collapsed}
            items={items}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactsSide;
