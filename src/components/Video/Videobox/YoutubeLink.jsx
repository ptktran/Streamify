import React, { useState, useEffect } from 'react'
import InputBar from './InputBar'

export default function YoutubeLink({
  inputOptions,
  option,
  handleOptionChange,
  input,
  handleInput,
  handleSubmit,
  error,
  setError
})
{
  return (
    <div>
      <h1 className="text-white text-lg mb-2.5 text-center">Paste a Youtube link to start watching ▶️</h1>
      <InputBar 
        inputOptions={inputOptions}
        option={option}
        handleOptionChange={handleOptionChange}
        input={input}
        defaultValue={inputOptions[0]}
        handleInput={handleInput}
        handleSubmit={handleSubmit}
        error={error}
        setError={setError}
        placeHolder="Youtube URL"
        inputWidth="32rem"
      />
    </div>
  )
}
