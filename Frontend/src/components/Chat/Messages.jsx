/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable eqeqeq */
import { useEffect, useRef, useState } from "react";
import { Avatar } from "antd";
import { CiMenuKebab } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Dropdown } from "antd";
import { Stickers } from "../../utils/Stickers";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages } from "../../Redux/actions";
import { FaCirclePause, FaCirclePlay } from "react-icons/fa6";
import VoiceMessage from "./VoiceMessage";

const Messages = ({ SelectUser, SendMessagee }) => {
  const index = decodeURIComponent(document.cookie).indexOf(",");
  const mainUser = decodeURIComponent(document.cookie).slice(0, index);
  let [SelectMessageId, setSelectMessageId] = useState("");

  let PhotoFormat = ["jpg", "png"];
  let VideoFormat = ["mp4", "webm"];

  // let clickHoldTimer = null;
  // const handleMouseDown = (id) => {
  //   clickHoldTimer = setTimeout(() => {}, 500);
  // };
  // const handleMouseUp = () => {
  //   clearTimeout(clickHoldTimer);
  // };

  const replayHandler = (id) => {};

  const dispatch = useDispatch();
  const Messages = useSelector((state) => state.Messages);

  let Messagess = [];

  useEffect(() => {
    dispatch(fetchMessages());
  }, []);
  useEffect(() => {
    dispatch(fetchMessages());
  }, [SendMessagee]);

  console.log(SendMessagee)

  Messages.map((message) => {
    if (
      message.relationship == `${SelectUser},${mainUser}` ||
      message.relationship == `${mainUser},${SelectUser}`
    ) {
      Messagess.push(message);
    }
  });

  const DeleteMessageHandler = () => {
    // axios.delete(
    //   `https://localhost:7063/api/Messages/${SelectMessageId}`
    // )
    console.log(SelectMessageId);
  };

  const items = [
    {
      key: "1",
      label: (
        <button
          className="text-xl text-red-600"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
          onClick={DeleteMessageHandler}
        >
          Delete
        </button>
      ),
      icon: <MdOutlineDeleteOutline className="text-red-600" size={24} />,
    },
    {
      key: "2",
      label: (
        <button
          className="text-xl text-blue-500"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          Edit
        </button>
      ),
      icon: <FaEdit size={22} className="text-blue-500" />,
    },
    {
      key: "3",
      label: (
        <ul className="rounded-box mt-2 text-center">
          <div className={`container flex`}>
            {Stickers.map((data) => (
              <div
                onClick={(id) => {
                  replayHandler(data.id);
                }}
                className="item cursor-pointer "
              >
                {data.text}
              </div>
            ))}
          </div>
        </ul>
      ),
    },
  ];

  const handleDownload = (URL, filename) => {
    fetch(URL).then((response) => {
      response.blob().then((blob) => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
        a.remove();
      });
    });
    const link = document.createElement("a");
    link.href = URL;
    link.download = URL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const test = (id) => {
    setSelectMessageId(id);
  };

  return (
    <div className="pt-2 px-3">
      {Messagess.map((data) =>
        mainUser != data.sender ? (
          <div className="flex justify-start m-3">
            <div class="chat-message">
              <div class="flex items-end">
                <div class="flex  space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                  <div>
                    {data.text && (
                      <span class="text-base px-4 py-2 rounded-lg inline-block rounded-tl-none bg-slate-500 text-white ">
                        {data.text}
                      </span>
                    )}
                    {data.file != "" &&
                      PhotoFormat.includes(data.file.split(".")[1]) && (
                        <div class="flex items-start gap-2.5">
                          <div class="flex flex-col gap-1">
                            <div class="flex flex-col w-full max-w-[326px] leading-1.5 p-4 border-gray-200  rounded-e-xl rounded-es-xl bg-slate-500">
                              <div class="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                                <span class="text-sm font-semibold text-gray-900 dark:text-white">
                                  {data.sender}
                                </span>
                                {/* <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                                  11:46
                                </span> */}
                              </div>
                              <p class="text-sm font-normal text-gray-900 dark:text-white">
                                {data.file}
                              </p>
                              <div class="group relative my-2.5">
                                <div class="absolute w-full h-full bg-gray-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                                  <button
                                    onClick={(URL, filename) =>
                                      handleDownload(
                                        `https://localhost:7063/api/FileManager/downloadfile?FileName=${data.file}`,
                                        data.file
                                      )
                                    }
                                    data-tooltip-target="download-image"
                                    class="inline-flex items-center justify-center rounded-full h-10 w-10 bg-white/30 hover:bg-white/50 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50"
                                  >
                                    <svg
                                      class="w-5 h-5 text-white"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 16 18"
                                    >
                                      <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"
                                      />
                                    </svg>
                                  </button>
                                  <div
                                    id="download-image"
                                    role="tooltip"
                                    class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
                                  >
                                    Download image
                                    <div
                                      class="tooltip-arrow"
                                      data-popper-arrow
                                    ></div>
                                  </div>
                                </div>
                                <img
                                  src={`https://localhost:7063/api/FileManager/downloadfile?FileName=${data.file}`}
                                  class="rounded-lg"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    {data.file.split(".")[1] == "wav" && (
                      <div class="flex items-start gap-2.5">
                        <div class="flex flex-col gap-1">
                          <div class="flex flex-col w-full max-w-[326px] leading-1.5 p-4 border-gray-200  rounded-e-xl rounded-es-xl bg-slate-500">
                            <div class="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                              <span class="text-sm font-semibold text-gray-900 dark:text-white">
                                {data.sender}
                              </span>
                              {/* <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                                11:46
                              </span> */}
                            </div>
                            <p class="text-sm font-normal text-gray-900 dark:text-white">
                            <VoiceMessage data={data}/>
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    {data.file != "" &&
                      VideoFormat.includes(data.file.split(".")[1]) && (
                        <div class="flex items-start gap-2.5">
                          <div class="flex flex-col gap-1">
                            <div class="flex flex-col w-full max-w-[326px] leading-1.5 p-4 border-gray-200  rounded-e-xl rounded-es-xl bg-slate-500">
                              <div class="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                                <span class="text-sm font-semibold text-gray-900 dark:text-white">
                                  {data.sender}
                                </span>
                                {/* <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                                  11:46
                                </span> */}
                              </div>
                              <p class="text-sm font-normal text-gray-900 dark:text-white">
                                {data.file}
                              </p>
                              <div class="group relative my-2.5">
                                <div class="absolute w-full h-full bg-gray-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                                  <button
                                    onClick={(URL, filename) =>
                                      handleDownload(
                                        `https://localhost:7063/api/FileManager/downloadfile?FileName=${data.file}`,
                                        data.file
                                      )
                                    }
                                    data-tooltip-target="download-image"
                                    class="inline-flex items-center justify-center rounded-full h-10 w-10 bg-white/30 hover:bg-white/50 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50"
                                  >
                                    <svg
                                      class="w-5 h-5 text-white"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 16 18"
                                    >
                                      <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"
                                      />
                                    </svg>
                                  </button>
                                  <div
                                    id="download-image"
                                    role="tooltip"
                                    class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
                                  >
                                    Download image
                                    <div
                                      class="tooltip-arrow"
                                      data-popper-arrow
                                    ></div>
                                  </div>
                                </div>
                                <video
                                  src={`https://localhost:7063/api/FileManager/downloadfile?FileName=${data.file}`}
                                  class="rounded-lg"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                  </div>
                  <Dropdown
                    menu={{
                      items,
                    }}
                  >
                    <a onClick={() => test(data.id)}>
                      <CiMenuKebab color="white" size={24} />
                    </a>
                  </Dropdown>
                </div>
                <Avatar className="text-xl bg-slate-500 text-white ">
                  {data.sender[0]}
                </Avatar>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-end m-3">
            <div class="chat-message" style={{ direction: "rtl" }}>
              <div class="flex items-end">
                <div class="flex  space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                  <div>
                    {data.text != "" && (
                      <span class="text-base px-4 py-2 rounded-lg inline-block rounded-tr-none bg-slate-400 text-white ">
                        {data.text}
                      </span>
                    )}

                    {data.file.split(".")[1] == "wav" && (
                      <div class="flex items-start gap-2.5">
                        <div class="flex flex-col gap-1">
                          <div class="flex flex-col w-full max-w-[326px] leading-1.5 p-4 border-gray-200  rounded-e-xl rounded-es-xl bg-slate-400">
                            <div class="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                              <span class="text-sm font-semibold text-gray-900 dark:text-white">
                                {data.sender}
                              </span>
                              {/* <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                                11:46
                              </span> */}
                            </div>
                            <p class="text-sm font-normal text-gray-900 dark:text-white">
                              <VoiceMessage data={data} />
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {data.file != "" &&
                      PhotoFormat.includes(data.file.split(".")[1]) && (
                        <div class="flex items-start gap-2.5">
                          <div class="flex flex-col gap-1">
                            <div class="flex flex-col w-full max-w-[326px] leading-1.5 p-4 border-gray-200 0 rounded-e-xl rounded-es-xl bg-slate-400">
                              <div class="flex items-center space-x-2 rtl:space-x-reverse mb-2 ">
                                <span class="text-sm font-semibold text-white mx-2">
                                  {data.sender}
                                </span>
                                {/* <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                                  11:46
                                </span> */}
                              </div>
                              <p class="text-sm font-normal text-white">
                                {data.file}
                              </p>
                              <div class="group relative my-2.5">
                                <div class="absolute w-full h-full bg-gray-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                                  <button
                                    onClick={(URL, filename) =>
                                      handleDownload(
                                        `https://localhost:7063/api/FileManager/downloadfile?FileName=${data.file}`,
                                        data.file
                                      )
                                    }
                                    data-tooltip-target="download-image"
                                    class="inline-flex items-center justify-center rounded-full h-10 w-10 bg-white/30 hover:bg-white/50 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50"
                                  >
                                    <svg
                                      class="w-5 h-5 text-white"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 16 18"
                                    >
                                      <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"
                                      />
                                    </svg>
                                  </button>
                                  <div
                                    id="download-image"
                                    role="tooltip"
                                    class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
                                  >
                                    Download image
                                    <div
                                      class="tooltip-arrow"
                                      data-popper-arrow
                                    ></div>
                                  </div>
                                </div>
                                <img
                                  src={`https://localhost:7063/api/FileManager/downloadfile?FileName=${data.file}`}
                                  class="rounded-lg"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    {data.file != "" &&
                      VideoFormat.includes(data.file.split(".")[1]) && (
                        <div class="flex items-start gap-2.5">
                          <div class="flex flex-col gap-1">
                            <div class="flex flex-col w-full max-w-[326px] leading-1.5 p-4 border-gray-200  rounded-e-xl rounded-es-xl bg-slate-400">
                              <div class="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                                <span class="text-sm font-semibold text-gray-900 dark:text-white">
                                  {data.sender}
                                </span>
                                {/* <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                                  11:46
                                </span> */}
                              </div>
                              <p class="text-sm font-normal  text-white">
                                {data.file}
                              </p>
                              <div class="group relative my-2.5">
                                <div class="absolute w-full h-full bg-gray-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                                  <button
                                    onClick={(URL, filename) =>
                                      handleDownload(
                                        `https://localhost:7063/api/FileManager/downloadfile?FileName=${data.file}`,
                                        data.file
                                      )
                                    }
                                    data-tooltip-target="download-image"
                                    class="inline-flex items-center justify-center rounded-full h-10 w-10 bg-white/30 hover:bg-white/50 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50"
                                  >
                                    <svg
                                      class="w-5 h-5 text-white"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 16 18"
                                    >
                                      <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"
                                      />
                                    </svg>
                                  </button>
                                  <div
                                    id="download-image"
                                    role="tooltip"
                                    class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
                                  >
                                    Download image
                                    <div
                                      class="tooltip-arrow"
                                      data-popper-arrow
                                    ></div>
                                  </div>
                                </div>
                                <video
                                  src={`https://localhost:7063/api/FileManager/downloadfile?FileName=${data.file}`}
                                  class="rounded-lg"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                  </div>
                  <Dropdown
                    // onClick={() => setSelectMessageId(data.id)}
                    menu={{
                      items,
                    }}
                  >
                    <a onClick={() => test(data.id)}>
                      <CiMenuKebab color="white" size={24} />
                    </a>
                  </Dropdown>
                </div>
                <Avatar className="text-xl bg-slate-400 text-white ">
                  {data.sender[0]}
                </Avatar>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Messages;
