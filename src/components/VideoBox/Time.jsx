import React from "react"

export default function Time({duration, setDuration, time, setTime, playerRef}) {
  const pad = (value) => {
    return value.toString().padStart(2, '0')
  }

  const formatTime = (timeInSecs) => {
    let hours = Math.floor(timeInSecs / 3600)
    let minutes = Math.floor((timeInSecs % 3600) / 60)
    let seconds = Math.floor(timeInSecs % 60)
    if (hours === 0) {
      return `${minutes}:${pad(seconds)}`
    } else {
      return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
    }
  }

  return (
    <div>
      <div className="text-white/80 text-sm flex items-center gap-x-1">
        <div>{formatTime(time)}</div> 
        <div>/</div>
        <div>{formatTime(duration)}</div>
      </div>
    </div>
  )
}