import React, { useState } from "react"
import { motion } from "framer-motion"
import play from "../../assets/play.svg"
import pause from "../../assets/pause.svg"
import audio from "../../assets/audio.svg"
import muted from "../../assets/muted.svg"
import fullscreen from "../../assets/fullscreen.svg"

export default function Controls({playing, onPause, onPlay, volume, setVolume, handleReset, handleFullscreen}) {
  const [volumeHover, setVolumeHover] = useState(false);
  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value))
  }

  return(
    // <input
    //   type="range"
    //   min={0}
    //   max={1}
    //   step="any"
    //   value={sliderTime}
    //   onChange={handleSeek}
    // />
  <div className="w-full flex-col flex gap-y-2">
    <div className="h-2.5 flex items-center">
      <div className="h-1.5 w-full bg-gray-text/50 hover:bg-gray-text/80 hover:h-full hover:cursor-pointer ease duration-150"></div>
    </div>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-x-3">
        {playing ? (
          <button onClick={onPause}>
            <img src={pause} className="w-8 opacity-80 hover:opacity-100 ease duration-150" alt="Pause" />
          </button>
        ) : (
          <button onClick={onPlay}>
            <img src={play} className="w-8 opacity-80 hover:opacity-100 ease duration-150" alt="Play" />
          </button>
        )}
        <div onMouseEnter={() => setVolumeHover(true)} onMouseLeave={() => setVolumeHover(false)} className="flex items-center gap-x-2">
          {volume === 0 ? (
            <button onClick={() => setVolume(0.5)}>
              <img src={muted} className="w-6 opacity-80 hover:opacity-100 ease duration-150" alt="Muted" />
            </button>
          ) : (
            <button onClick={() => setVolume(0)}>
              <img src={audio} className="w-6 opacity-80 hover:opacity-100 ease duration-150" alt="Audio" />
            </button>
          )}
          {volumeHover && (
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -25, opacity: 0 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="flex items-center justify-center"
            >
              <input
                type="range"
                min={0}
                max={1}
                step="any"
                value={volume}
                onChange={handleVolumeChange}
                id="volume-slider"
                style={{
                  background: `linear-gradient(to right, #d2d2d2 0%, #d2d2d2 ${volume * 100}%, #2b2b2b ${volume * 100}%, #2b2b2b 100%)`,
                }}
                />
            </motion.div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-x-3">
        <button
          onClick={handleReset}
          className="bg-gray-bg py-1.5 px-3 text-sm text-gray-text rounded-lg ease duration-150 hover:bg-red-main/80 hover:text-white"
        >← Watch another video
        </button>
        <button onClick={handleFullscreen}>
          <img src={fullscreen} className="w-6 opacity-80 hover:opacity-100 ease duration-150" alt="Fullscreen" />
        </button>
      </div>
    </div>
  </div>
)}