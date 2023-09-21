import React, { useEffect } from 'react'
import Select from 'react-select'
import { customStyles } from './styles/react-select-style'

export default function InputBar({
  inputOptions,
  option,
  handleOptionChange,
  input,
  handleInput,
  handleSubmit,
  error,
  setError,
  defaultValue,
  placeHolder,
  inputWidth,
  }) 
{
  useEffect(() => {
    if (option.value === 'Link') {
      if (!input) {
        setError('')
      }
    }
  }, [input])

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-3 items-center">
        <Select
          styles={customStyles}
          onChange={handleOptionChange}
          defaultValue={defaultValue}
          options={inputOptions}
          isSearchable={false}
        />
        <div className="flex flex-col">
          <div className="flex items-center justify-center">
            {option.value === 'Link' ? (
              <>
                {error ? (
                  <input
                    className="bg-gray-dark border border-red-main text-white placeholder:text-gray-text rounded-lg rounded-e-none border-r-0 transition-colors ease duration-150 focus:border-gray-bg p-2.5 focus:outline-none"
                    placeholder={placeHolder}
                    type="text"
                    value={input}
                    onChange={handleInput}
                    style={{ width: inputWidth }}
                  />
                ) : (
                  <input
                    className="bg-gray-dark border border-gray-dark text-white placeholder:text-gray-text rounded-lg rounded-e-none border-r-0 transition-colors ease duration-150 focus:border-gray-bg p-2.5 focus:outline-none"
                    placeholder={placeHolder}
                    type="text"
                    value={input}
                    onChange={handleInput}
                    style={{ width: inputWidth }}
                  />
                )}
                {input ? (
                  <button
                    type="submit"
                    className="bg-red-main py-2 px-3 border border-red-main text-white rounded-lg rounded-s-none ease duration-150 hover:bg-red-main/80 hover:border-red-main/80 text-lg"
                  ><span className="text-lg">→</span></button>
                  ) : (
                  <button
                    type="submit"
                    className="bg-gray-bg py-2 px-3 border border-gray-bg text-gray-text rounded-lg rounded-s-none ease duration-150 text-lg"
                    disabled
                  >→</button>
                )}                  
              </>
            ) : (
              <input
                className="bg-gray-dark border border-gray-dark text-white placeholder:text-gray-text rounded-lg transition-colors ease duration-150 focus:border-gray-bg p-2.5 focus:outline-none"
                placeholder={placeHolder}
                type="text"
                value={input}
                onChange={handleInput}
                style={{ width: inputWidth }}
              />
            )}
          </div>
        </div>
      </div>
    </form>
  );
}