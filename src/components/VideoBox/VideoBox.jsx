import React, { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player/youtube";
import youtubeSymbol from "../../assets/youtube2.svg";
import Controls from "./Controls.jsx";
import socket from "../../utils/socket";
import { useParams } from "react-router-dom";

export default function VideoBox() {
  const [sliderTime, setSlider] = useState(0);
  const [play, setPlay] = useState(false);
  const [time, setTime] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [duration, setDuration] = useState(0);
  const { roomID } = useParams();
  const [url, setUrl] = useState("");
  const [videoID, setVideoID] = useState("");
  const [error, setError] = useState("");
  const videoContainerRef = useRef(null);
  const playerRef = useRef(null);
  const [dimensions, setDimensions] = useState({
    height: 0,
    width: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      if (videoContainerRef.current) {
        setDimensions(() => ({
          height: videoContainerRef.current.clientHeight * 0.85,
          width: videoContainerRef.current.clientWidth * 0.98,
        }));
      }
    };

    // Attach the resize event listener
    window.addEventListener("resize", handleResize);

    // Calculate the initial dimensions
    if (videoContainerRef.current) {
      setDimensions({
        height: videoContainerRef.current.clientHeight * 0.87,
        width: videoContainerRef.current.clientWidth * 0.98,
      });
    }
  }, [videoContainerRef]);

  useEffect(() => {
    function onReceiveVideoStateEvent(videoState) {
      console.log(videoState, "recieve");
      if (!videoState) throw new Error("no video State");

      if (videoState === "play") {
        setPlay(true);
      } else {
        setPlay(false);
      }
    }

    function onReceiveVideoLinkEvent(videoURL) {
      if (!videoURL) throw new Error("no video Link");
      setVideoID(validateUrl(videoURL));
      setUrl(videoURL);
    }

    function onResetPlayerEvent() {
      handleReset();
    }

    socket.on("receive_link", onReceiveVideoLinkEvent);
    socket.on("video_state", onReceiveVideoStateEvent);
    socket.on("video_link", onReceiveVideoLinkEvent);
    socket.on("reset_player", onResetPlayerEvent);
  }, [play, url]);

  const handleInput = (e) => {
    const videoURL = e.target.value;
    setUrl(videoURL);
  };

  const handleReset = () => {
    socket.emit("reset", roomID);
    setUrl("");
    setVideoID("");
    setError("");
  };

  const onStart = () => {
    //console.log("VIDEO STARTED");
  };

  const handleProgress = (data) => {
    const currentTime = data.playedSeconds;
    setTime(currentTime);
  };

  const handleSeek = (e) => {
    if (playerRef.current) {
      playerRef.current.seekTo(e.target.value * duration);
      setSlider(e.target.value);
    }
    setPlay(true);
  };

  const handleDuration = (sec) => {
    setDuration(sec);
  };

  const handleFullscreen = () => {
    if (playerRef.current) {
      if (playerRef.current.requestFullscreen) {
        playerRef.current.requestFullscreen();
      } else if (playerRef.current.mozRequestFullScreen) {
        playerRef.current.mozRequestFullScreen();
      } else if (playerRef.current.webkitRequestFullscreen) {
        playerRef.current.webkitRequestFullscreen();
      } else if (playerRef.current.msRequestFullscreen) {
        playerRef.current.msRequestFullscreen();
      }
    }
  }

  const onPlay = () => {
    console.log("VIDEO PLAY");
    setPlay(true)
    socket.emit("video_playback", { roomID, videoState: "play" });
  };

  const onPause = () => {
    console.log("VIDEO PAUSE");
    setPlay(false)
    socket.emit("video_playback", { roomID, videoState: "paused" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateUrl(url)) {
      setVideoID(validateUrl(url));
      socket.emit("set_video", { roomID, videoURL: url });
    } else {
      setError("Invalid Youtube URL");
    }
  };

  // validates the youtube link and returns the video id if the link is valid, else false
  function validateUrl(url) {
    let regex =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    let matches = url.match(regex);
    if (matches) {
      return matches[1];
    }
    return false;
  }

  return (
    <>
      <div
        className="h-full flex justify-center items-center flex-col rounded-xl bg-gray-comps"
        ref={videoContainerRef}
      >
        {videoID && url ? (
          <div className="flex flex-col items-center gap-y-2">
            <ReactPlayer
              ref={playerRef}
              playing={play}
              volume={volume}
              url={url}
              controls={false}
              width={dimensions.width}
              height={dimensions.height}
              onStart={onStart}
              onPause={onPause}
              onPlay={onPlay}
              onProgress={handleProgress}
              onDuration={handleDuration}
            />
            {/* <input
              type="range"
              min="0"
              max="1"
              step="any"
              value={sliderTime}
              onChange={handleSeek}
            /> */}
            <Controls playing={play} onPause={onPause} onPlay={onPlay} setVolume={setVolume} volume={volume} handleReset={handleReset} handleFullscreen={handleFullscreen}/>
          </div>
        ) : (
          <>
            <img src={youtubeSymbol} className="w-36 opacity-60"></img>
            <h1 className="text-gray-text text-lg mb-2.5">
              Paste a Youtube link to start watching now!
            </h1>
            <form onSubmit={handleSubmit}>
              {error ? (
                <>
                  <input
                    className="bg-gray-dark border border-red-main text-gray-text rounded-lg rounded-e-none border-r-0 transition-colors ease duration-150 focus:border-gray-bg w-[26rem] p-2.5 focus:outline-none"
                    placeholder="Link here..."
                    type="text"
                    value={url}
                    onChange={handleInput}
                  />
                  <button
                    type="submit"
                    className="bg-red-main py-2 px-3 border border-red-main text-white rounded-lg rounded-s-none ease duration-150 hover:bg-red-main/80 hover:border-red-main/80 text-lg"
                  >
                    →
                  </button>
                  <p className="text-red-main text-center mt-2">{error}</p>
                </>
              ) : (
                <>
                  <input
                    className="bg-gray-dark border border-gray-dark text-gray-text rounded-lg rounded-e-none border-r-0 transition-colors ease duration-150 focus:border-gray-bg w-[26rem] p-2.5 focus:outline-none"
                    placeholder="Link here..."
                    type="text"
                    value={url}
                    onChange={handleInput}
                  />
                  <button
                    type="submit"
                    className="bg-red-main py-2 px-3 border border-red-main text-white rounded-lg rounded-s-none ease duration-150 hover:bg-red-main/80 hover:border-red-main/80 text-lg"
                  >
                    →
                  </button>
                </>
              )}
            </form>
          </>
        )}
      </div>
    </>
  );
}
