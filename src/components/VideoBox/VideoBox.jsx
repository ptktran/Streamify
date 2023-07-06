import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import ReactPlayer from 'react-player/youtube'
import YoutubeSearch from './YoutubeSearch'
import YoutubeLink from './YoutubeLink'

export default function VideoBox() {
  const inputOptions = [
    { value: "Link", label: "🔗 Link" },
    { value: "Search", label: "🔍 Search"}
  ]
  const [input, setInput] = useState('')
  const [option, setOption] = useState(inputOptions[0])
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')
  const videoContainerRef = useRef(null)
  const [dimensions, setDimensions] = useState({
    height: 0,
    width: 0
  })
  
  useEffect(() => {
    const handleResize = () => {
      if (videoContainerRef.current) {
        setDimensions(() => ({
          height: videoContainerRef.current.clientHeight * 0.9,
          width: videoContainerRef.current.clientWidth * 0.97,
        }));
      }
    };
  
    window.addEventListener('resize', handleResize);
    if (videoContainerRef.current) {
      setDimensions({
        height: videoContainerRef.current.clientHeight * 0.9,
        width: videoContainerRef.current.clientWidth * 0.97
      });
    }
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [videoContainerRef]);

  const handleInput = (e) => {
    setInput(e.target.value)
  }

  const handleReset = (e) => {
    setError('')
    setUrl('')
    if (option.value === 'Link') {
      setInput('')
    }
  }

  const handleOptionChange = (value) => {
    setOption(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateUrl(input)) {
      setUrl(input)
    } else {
      setError('Invalid Youtube URL')
    }
  }

  function handlePlayVideo (link) {
    setUrl(link)
  }

  // validates the youtube link and returns the video id if the link is valid, else false
  function validateUrl(url) {
    let regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    let matches = url.match(regex)
    if (matches) {
      return matches[1]
    }
    return false
  }

  // console.log(search)

  return (
    <div className={`h-full flex ${(option.value === "Search" && (!url)) ? "justify-start" : "justify-center"} items-center flex-wrap flex-col rounded-xl bg-gray-comps gap-y-1`} ref={videoContainerRef}>
      {/* If option is Search */}
      {(url) ? (
        <div id="player">
        <ReactPlayer
          url={url}
          controls
          width={dimensions.width}
          height={dimensions.height}
          />
        <button onClick={handleReset} className="bg-red-main py-1.5 px-3 mt-3 border text-sm border-red-main text-white rounded-lg ease duration-150 hover:bg-red-main/80 hover:border-red-main/80">← Watch another video</button>
        </div>
      ) : (
      <>
      {(option.value === "Search") && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <YoutubeSearch
            inputOptions={inputOptions}
            option={option}
            handleOptionChange={handleOptionChange}
            input={input}
            handleInput={handleInput}
            handlePlayVideo={handlePlayVideo}
            error={error}  
          />
        </motion.div>
      )}
        {(option.value === "Link") && (
          <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          >
            <YoutubeLink 
              inputOptions={inputOptions}
              option={option}
              handleOptionChange={handleOptionChange}
              input={input}
              handleInput={handleInput}
              handleSubmit={handleSubmit}
              error={error}
              setError={setError}   
              />
          </motion.div>
        )}
      </>
      )}
    </div>
  )
}