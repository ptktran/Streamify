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
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-white text-lg mb-2.5">Paste a Youtube link to start watching now!</h1>
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
