import React, { useRef, useState } from "react";
import "./style.css"
import { FaCirclePause, FaCirclePlay } from "react-icons/fa6";

const VoiceMessage = ({ data }) => {
  const [selectVoice, setselectVoice] = useState("");
  const timeline = useRef();
  const audio = useRef();
  const [PlayIcon, setPlayIcon] = useState(
    <FaCirclePlay style={{ cursor: "pointer", color: "#69b1ff" }} />
  );

  const PlayVoice = (path) => {
    if (path == selectVoice) {
      if (audio.current.paused) {
        audio.current.play();
        setPlayIcon(
          <FaCirclePause style={{ cursor: "pointer", color: "red" }} />
        );
      } else {
        audio.current.pause();
        setPlayIcon(
          <FaCirclePlay style={{ cursor: "pointer", color: "#69b1ff" }} />
        );
      }
    }

    function changeTimelinePosition() {
      const percentagePosition =
        (100 * audio.current.currentTime) / audio.current.duration;
      timeline.current.style.backgroundSize = `${percentagePosition}% 100%`;
      timeline.current.value = percentagePosition;
    }

    audio.current.ontimeupdate = changeTimelinePosition;

    function audioEnded() {
      setPlayIcon(
        <FaCirclePlay style={{ cursor: "pointer", color: "#69b1ff" }} />
      );
    }

    audio.current.onended = audioEnded;
  };
  function changeSeek() {
    const time = (timeline.current.value * audio.current.duration) / 100;
    audio.current.currentTime = time;
  }

  return (
    <div class="audio-player">
      <audio
        id={data.file}
        ref={audio}
        style={{ backgroundColor: "black", color: "red" }}
        src={`https://localhost:7063/api/FileManager/downloadfile?FileName=${data.file}`}
      ></audio>
      <div className="controls">
      <button
          style={{
            fontSize: "27px",
            backgroundColor: "transparent",
            border: "none",
            outline: "none",
          }}
          onClick={() => {
            setselectVoice(data.file);
            PlayVoice(data.file);
          }}
        >
          {PlayIcon}
        </button>
        <input
          onChange={changeSeek}
          ref={timeline}
          type="range"
          class="timeline"
          max="100"
          value="0"
          style={{ direction: "ltr", marginTop: "6px" }}
        />
       
      </div>
    </div>
  );
};

export default VoiceMessage;
