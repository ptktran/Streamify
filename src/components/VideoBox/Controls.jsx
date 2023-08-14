import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import play from "../../assets/play.svg";
import pause from "../../assets/pause.svg";
import audio from "../../assets/audio.svg";
import muted from "../../assets/muted.svg";
import fullscreen from "../../assets/fullscreen.svg";
import { Tooltip } from "react-tooltip";
import Time from "./Time";
import socket from "../../utils/socket";
import { useParams } from "react-router-dom";

const Controls = React.forwardRef(
  (
    {
      playing,
      setPlay,
      onPause,
      onPlay,
      volume,
      setVolume,
      handleReset,
      handleFullscreen,
      time,
      setTime,
      duration,
      setDuration,
    },
    ref
  ) => {
    const [volumeHover, setVolumeHover] = useState(false);
    const [seekBarHover, setSeekBarHover] = useState(false);
    const { roomID } = useParams();
    const handleVolumeChange = (e) => {
      setVolume(parseFloat(e.target.value));
    };

    const getProgressWidth = () => {
      if (ref.current) {
        const progress = (time / duration) * 100;
        return `${progress}%`;
      }
    };

    useEffect(() => {
      ref.current.seekTo(time);
    }, []);

    const handleTimelineClick = (event) => {
      const timeline = event.currentTarget;
      const rect = timeline.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const timelineWidth = rect.width;
      const progress = offsetX / timelineWidth;
      const newTime = progress * duration;

      const user = "string";

      if (ref.current) {
        ref.current.seekTo(newTime);
        socket.emit("change_video_time", roomID, { newTime, user });
        setTime(newTime);
      }
    };

    return (
      <div className="w-full flex-col flex gap-y-2">
        <div className="h-2.5 flex items-center" id="timeline-container">
          <div
            onMouseEnter={() => setSeekBarHover(true)}
            onMouseLeave={() => setSeekBarHover(false)}
            onClick={handleTimelineClick}
            className="h-1 w-full bg-gray-text/50 hover:bg-gray-text/80 hover:h-full hover:cursor-pointer ease duration-150 relative flex items-center"
            id="timeline"
          >
            <div
              className="bg-red-main h-full ease duration-100 relative"
              style={{ width: getProgressWidth() }}
            ></div>
            <div
              className={`absolute ${
                seekBarHover &&
                "h-4 w-4 transform translate-x-[-0.4rem] opacity-100"
              } opacity-0 bg-red-main border border-red-main rounded-full`}
              style={{
                left: getProgressWidth(),
                transition: "left 0.1s ease, opacity 0.1s ease",
              }}
            ></div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2.5">
            {playing ? (
              <button onClick={onPause} className="playbackButton">
                <img
                  src={pause}
                  className="w-7 h-6 opacity-80 hover:opacity-100 ease duration-150"
                  alt="Pause"
                />
              </button>
            ) : (
              <button onClick={onPlay} className="playbackButton">
                <img
                  src={play}
                  className="w-7 opacity-80 hover:opacity-100 ease duration-150"
                  alt="Play"
                />
              </button>
            )}
            <Tooltip
              anchorSelect=".playbackButton"
              place="top"
              style={{
                backgroundColor: "#181818",
                color: "#A6A6A6",
                padding: "5px",
                fontSize: "0.8rem",
              }}
            >
              {playing ? <>Pause (f)</> : <>Play (f)</>}
            </Tooltip>
            <div className="flex items-center gap-x-4">
              <div
                onMouseEnter={() => setVolumeHover(true)}
                onMouseLeave={() => setVolumeHover(false)}
                className="flex items-center gap-x-3"
              >
                {volume === 0 ? (
                  <button
                    onClick={() => setVolume(0.5)}
                    className="volumeButton"
                  >
                    <img
                      src={muted}
                      className="w-5 opacity-80 hover:opacity-100 ease duration-150"
                      alt="Muted"
                    />
                  </button>
                ) : (
                  <button onClick={() => setVolume(0)} className="volumeButton">
                    <img
                      src={audio}
                      className="w-5 opacity-80 hover:opacity-100 ease duration-150"
                      alt="Audio"
                    />
                  </button>
                )}
                <Tooltip
                  anchorSelect=".volumeButton"
                  place="top"
                  style={{
                    backgroundColor: "#181818",
                    color: "#A6A6A6",
                    padding: "5px",
                    fontSize: "0.8rem",
                  }}
                >
                  {volume === 0 ? <>Unmute (m)</> : <>Mute (m)</>}
                </Tooltip>
                {volumeHover && (
                  <motion.div
                    initial={{ x: -5, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="flex items-center justify-center"
                  >
                    <input
                      className="volumeSlider"
                      type="range"
                      min={0}
                      max={1}
                      step="any"
                      value={volume}
                      onChange={handleVolumeChange}
                      id="volume-slider"
                      style={{
                        background: `linear-gradient(to right, #d2d2d2 0%, #d2d2d2 ${
                          volume * 100
                        }%, #2b2b2b ${volume * 100}%, #2b2b2b 100%)`,
                      }}
                    />
                    <Tooltip
                      anchorSelect=".volumeSlider"
                      place="top"
                      style={{
                        backgroundColor: "#181818",
                        color: "#A6A6A6",
                        padding: "5px",
                        fontSize: "0.8rem",
                      }}
                    >
                      Volume
                    </Tooltip>
                  </motion.div>
                )}
              </div>
              <div>
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: volumeHover ? 0 : 1 }}
                  transition={{ duration: 0.1, ease: "easeInOut" }}
                >
                  <Time
                    duration={duration}
                    setDuration={setDuration}
                    time={time}
                    ref={ref}
                    setTime={setTime}
                  />
                </motion.div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-x-3 pr-1">
            <button
              onClick={handleReset}
              className="bg-gray-bg py-1.5 px-3 text-sm text-gray-text rounded-lg ease duration-150 hover:bg-red-main/80 hover:text-white"
            >
              ← Watch another video
            </button>
            <button onClick={handleFullscreen} className="fullScreenButton">
              <img
                src={fullscreen}
                className="w-6 opacity-80 hover:opacity-100 ease duration-150"
                alt="Fullscreen"
              />
            </button>
            <Tooltip
              anchorSelect=".fullScreenButton"
              place="top"
              style={{
                backgroundColor: "#181818",
                color: "#A6A6A6",
                padding: "5px",
                fontSize: "0.8rem",
              }}
            >
              Full screen (f)
            </Tooltip>
          </div>
        </div>
      </div>
    );
  }
);

export default Controls;

// <input
//   type="range"
//   min={0}
//   max={1}
//   step="any"
//   value={sliderTime}
//   onChange={handleSeek}
// />
