/* eslint-disable eqeqeq */
import React, { useRef, useState } from "react";
import { MdAttachFile, MdOutlineKeyboardVoice } from "react-icons/md";
import { RiSendPlaneFill } from "react-icons/ri";
import { Input } from "antd";
import axios from "axios";
import { addMessage, fetchMessages } from "../../Redux/actions";
import { useDispatch } from "react-redux";
import { MdOutlineSettingsVoice } from "react-icons/md";
import { FaRegStopCircle } from "react-icons/fa";

const CommunicationTools = ({
  SelectUser,
  SendMessage,
  //  chatContainerRef
}) => {
  let [NewMessage, setNewMessage] = useState("");
  const index = decodeURIComponent(document.cookie).indexOf(",");
  const mainUser = decodeURIComponent(document.cookie).slice(0, index);
  const dispatch = useDispatch();
  let StartBtn = document.getElementById("StartBtn");
  let StopBtn = document.getElementById("StopBtn");

  const sendMessageHandler = async (file, voiceFilename) => {
    if (NewMessage) {
      setNewMessage("");
      await SendMessage(NewMessage);
      await dispatch(
        addMessage({
          id: 0,
          sender: mainUser,
          recipient: SelectUser,
          text: NewMessage,
          sticker: "",
          file: "",
          relationship: mainUser + "," + SelectUser,
        })
      );
    } else if (voiceFilename) {
      await SendMessage(voiceFilename);

      await dispatch(
        addMessage({
          id: 0,
          sender: mainUser,
          recipient: SelectUser,
          text: "",
          sticker: "",
          file: voiceFilename,
          relationship: mainUser + "," + SelectUser,
        })
      );
      await SendMessage(voiceFilename);
    } else if (file) {
      await SendMessage(file.name);
      var form = new FormData();
      form.append("file", file);
      await axios.post(
        "https://localhost:7063/api/FileManager/uploadfile",
        form
      );
      await SendMessage(file.name);
      await dispatch(
        addMessage({
          id: 0,
          sender: mainUser,
          recipient: SelectUser,
          text: "",
          sticker: "",
          file: file.name,
          relationship: mainUser + "," + SelectUser,
        })
      );
      await SendMessage(file.name);
    }

    // if (chatContainerRef.current) {
    //   chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    // }
    await SendMessage("ewewew");
  };

  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const recordedChunks = useRef([]);

  const handleStartRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);

        recorder.ondataavailable = (e) => {
          recordedChunks.current.push(e.data);
        };

        recorder.onstop = () => {
          const blob = new Blob(recordedChunks.current, { type: "audio/wav" });
          const url = URL.createObjectURL(blob);
          const formData = new FormData();
          let filename = Date.now() + ".wav";
          formData.append("file", blob, filename);
          UploadVoice(formData);
          sendMessageHandler("", filename);
          const a = document.createElement("a");
          a.href = url;
          a.download = "recorded_audio.wav";
          // document.body.appendChild(a);
          // a.click();
          window.URL.revokeObjectURL(url);
          recordedChunks.current = [];
        };

        recorder.start();
        StartBtn.classList.add("hidden");
        StopBtn.classList.remove("hidden");
        setIsRecording(true);
      })
      .catch((error) => console.error("Error accessing microphone:", error));
  };

  const handleStopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      StartBtn.classList.remove("hidden");
      StopBtn.classList.add("hidden");
      setIsRecording(false);
    }
  };

  const UploadVoice = (formData) => {
    let url = `https://localhost:7063/api/FileManager/uploadfile`;
    axios
      .request({
        method: "POST",
        data: formData,
        url,
        onUploadProgress: (e) => {
          var percentComplete = Math.ceil((e.loaded / e.total) * 100);
        },
      })
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <>
      {SelectUser && (
        <form className="flex gap-2 p-2 justify-end">
          <Input
            value={NewMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            style={{
              boxShadow: "0px 2px 10px -8px rgba(0, 0, 0, 9.25)",
              paddingRight: "6rem",
            }}
            placeholder="Type Message here"
            className="text-white input flex-grow rounded-md h-11 text-lg bg-slate-500"
            type="text"
          />
          <div className="absolute ml-10 ">
            {!NewMessage && (
              <div className="flex gap-1 items-center mt-2">
                <label
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    outline: "none",
                  }}
                  className="   rounded-md cursor-pointer text-white"
                >
                  <MdAttachFile
                    style={{ transform: "rotate(35deg)" }}
                    className="rounded-md"
                    size={25}
                    color="white"
                  />
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      sendMessageHandler(e.target.files[0], "");
                    }}
                  />
                </label>

                <div className="text-white mr-2 mt-1">
                  <button
                    type="button"
                    className=""
                    onClick={handleStartRecording}
                    disabled={isRecording}
                    id="StartBtn"
                  >
                    <MdOutlineSettingsVoice size={23} />
                  </button>
                  <button
                    type="button"
                    className=" hidden"
                    onClick={handleStopRecording}
                    disabled={!isRecording}
                    id="StopBtn"
                  >
                    <FaRegStopCircle size={25} />
                  </button>
                </div>
              </div>
            )}

            {NewMessage && (
              <button
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  outline: "none",
                }}
                type="button"
                className="rounded-md btn mr-3 mt-[0.50rem] text-white"
                onClick={sendMessageHandler}
              >
                <RiSendPlaneFill
                  color="white"
                  style={{ transform: "rotate(45deg)" }}
                  className="rounded-md"
                  size={25}
                />
              </button>
            )}
          </div>
        </form>
      )}
    </>
  );
};

export default CommunicationTools;
