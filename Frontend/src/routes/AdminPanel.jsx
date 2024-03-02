/* eslint-disable eqeqeq */
import React, { useEffect, useRef, useState } from "react";
import { HiUsers } from "react-icons/hi";
import { IoIosNotifications } from "react-icons/io";
import { IoIosChatbubbles } from "react-icons/io";
import { Menu } from "antd";
import PanelNotification from "../components/Panel/PanelNotification";
import PanelUsers from "../components/Panel/PanelUsers";
import { useNavigate } from "react-router-dom";
import { Tabs } from "antd";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchRegisters } from "../Redux/actions";

const AdminPanel = () => {
  const index = decodeURIComponent(document.cookie).indexOf(",");
  const mainUser = decodeURIComponent(document.cookie).slice(0, index);
  const mainUserPass = decodeURIComponent(document.cookie).slice(index + 1);

  const dispatch = useDispatch();
  const Registers = useSelector((state) => state.Registers);


  useEffect(() => {
    dispatch(fetchRegisters());
  }, [dispatch]);

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const items1 = [
    mainUser == "admin" &&
      mainUserPass == 1234 &&
      getItem("Users", "1", <HiUsers size={24} />),
    getItem("notification", "2", <IoIosNotifications size={24} />),
    getItem("Chat Room", "3", <IoIosChatbubbles size={24} />),
  ];
  const items2 = [
    mainUser == "admin" &&
      mainUserPass == 1234 &&
      getItem(<HiUsers size={24} />, "1"),
    getItem(<IoIosNotifications size={24} />, "2"),
    getItem(<IoIosChatbubbles size={24} />, "3"),
  ];

  const navigate = useNavigate();
  let [active, setActive] = useState(
    mainUser == "admin" && mainUserPass == 1234 ? (
      <PanelUsers  />
    ) : (
      <PanelNotification />
    )
  );
  const onClick = (e) => {
    add(e.key);
    if (e.key == 1) {
      setActive(<PanelUsers  />);
    } else if (e.key == 2) {
      setActive(<PanelNotification />);
    } else if (e.key == 3) {
      navigate("/chat");
    }
  };

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

  // Tabs
  const defaultPanes = [];

  const [activeKey, setActiveKey] = useState();
  const [items, setItems] = useState(defaultPanes);
  const newTabIndex = useRef(0);

  const onChange = (key) => {
    setActiveKey(key);
  };

  const add = (e) => {
    const newActiveKey = `newTab${newTabIndex.current++}`;
    setItems([
      ...items,
      {
        label: e == 1 ? "Panel Users" : "Panel Notification",
        children: e == 1 ? <PanelUsers /> : <PanelNotification />,
        key: newActiveKey,
      },
    ]);
    setActiveKey(newActiveKey);
  };

  const remove = (targetKey) => {
    const targetIndex = items.findIndex((pane) => pane.key === targetKey);
    const newPanes = items.filter((pane) => pane.key !== targetKey);
    if (newPanes.length && targetKey === activeKey) {
      const { key } =
        newPanes[
          targetIndex === newPanes.length ? targetIndex - 1 : targetIndex
        ];
      setActiveKey(key);
    }
    setItems(newPanes);
  };

  const onEdit = (targetKey, action) => {
    if (action === "add") {
      add();
    } else {
      remove(targetKey);
    }
  };

  const LogOut = () => {
    Registers.map((res) => {
      if (mainUser == res.username) {
        axios.delete(`https://localhost:7063/api/Registers/${res._id}`);
        document.cookie = `${res.username},${res.password}; expires=Thu, 18 Dec 1040 12:00:00 UTC; path=/`;
        navigate("/");
      }
    });
  };

  return (
    <div className="bg-neutral h-screen flex">
      <div className={`w-1/5 h-full bg-[#1c232d] flex flex-col items-center`}>
        <div
          className={`${
            dimensions.width > 884 && "flex"
          } gap-3 items-center md:justify-start mx-5 mt-4 md:w-[80%]  justify-center`}
        >
          <img
            style={{ height: "60px", width: "60px" }}
            className={` rounded-full ${dimensions.width < 884 && "mb-2"}`}
            src="https://themewagon.github.io/pluto/images/layout_img/user_img.jpg"
            alt=""
          />

          <span className={`text-[#bdbdbd]`}>
            <span className="text-xl">{mainUser}</span>
            <br />
            <span className="text-xs text-green-600">Welcome</span>
          </span>
        </div>
        <Menu
          onClick={onClick}
          className="relative text-left p-4 w-full bg-[#1c232d] text-xl md:block h-[80%]"
          defaultSelectedKeys={"0"}
          defaultOpenKeys={["0"]}
          mode="inline"
          items={dimensions.width > 784 ? items1 : items2}
          theme={"dark"}
        />
        <button class="Btnn fixed bottom-0" onClick={LogOut}>
          <div class="signn">
            <svg viewBox="0 0 512 512">
              <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
            </svg>
          </div>

          <div class="textt">Logout</div>
        </button>
      </div>

      <div className="md:w-4/5 h-screen w-full p-3 ">
        <div
          style={{
            height: "100%",
            borderRadius: "6px",
          }}
        >
          <div>
            <Tabs
              className="text-[#bdbdbd]"
              theme={"dark"}
              hideAdd
              onChange={onChange}
              activeKey={activeKey}
              type="editable-card"
              onEdit={onEdit}
              items={items}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminPanel;
