import React, { useEffect, useState } from 'react'
import { debounce } from 'lodash'
import InputBar from './InputBar'


export default function YoutubeSearch({
  inputOptions,
  option,
  handleOptionChange,
  handlePlayVideo,
  input,
  handleInput,
  error,
}) 
{
  function parseUrl (videoID) {
    return ("https://www.youtube.com/watch?v=" + videoID)
  }
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(null, args);
      }, delay);
    };
  };
  
  const [searchResults, setSearchResults] = useState([])
  const debouncedSearch = debounce(async (input) => {
    if (input.trim() === '') {
      setSearchResults([]) 
      return 
    }
    try {
      const response = await fetch(
        `http://localhost:3001/api/search?query=${input}`,
      )
      if (response.ok) {
        const data = await response.json()
        setSearchResults(data)
      } else {
        throw new Error('Request failed with status ' + response.status)
      }
    } catch (error) {
      console.error('Something went wrong...')
      setSearchResults([])
    }
  }, 500)

  useEffect(() => {
    debouncedSearch(input)
  }, [input])

  console.log(searchResults)
  return (
    <div className="py-7">
      <InputBar 
        inputOptions={inputOptions}
        option={option}
        handleOptionChange={handleOptionChange}
        input={input}
        defaultValue={inputOptions[1]}
        handleInput={handleInput}
        error={error}
        placeHolder="Search"
        inputWidth="40rem"
      />
      {searchResults.items && searchResults.items.length > 0 && (
        <div className="flex flex-col m-auto w-[50rem] pt-5 gap-y-3">
          {searchResults.items.map((result) => (
            <div key={result.id.videoId} className="flex items-center justify-between bg-gray-dark rounded-2xl p-2.5 border border-gray-dark hover:border-gray-bg hover:shadow-md ease duration-150">
              <div className="flex items-center gap-x-3">
                <div className="w-[200px] h-[110px] overflow-hidden flex items-center rounded-xl justify-center">
                  <img src={result.snippet.thumbnails.high.url} alt="Thumbnail" className="h-[10rem]" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">
                    {result.snippet.title.length > 60
                      ? result.snippet.title.substring(0, 60) + '...'
                      : result.snippet.title}
                  </h3>
                  <a href={`https://www.youtube.com/channel/${result.snippet.channelId}`} className="text-gray-text hover:text-gray-text/80 ease duration-150">
                    {result.snippet.channelTitle}
                  </a>
                </div>
              </div>
              
              <div className="pr-2">
                <button 
                  onClick={() => handlePlayVideo(parseUrl(result.id.videoId))} 
                  className="bg-red-main px-2.5 py-2 text-sm border border-red-main text-white rounded-lg duration-150 hover:bg-red-main/80 hover:border-red-main/80">▶ Play</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
