import React from 'react'

export default function NavBar() {
  return (
    <>
      <div className="w-full bg-gray-comps flex justify-between items-center py-3 px-6 rounded-xl">
        <div>
          <h1 className="font-semibold text-white text-xl">📺 Streamify</h1>
        </div>

        <div className='flex items-center'>
          <input 
            className="bg-gray-dark text-sm border border-gray-bg text-gray-text rounded-lg rounded-e-none border-r-0 transition-colors ease duration-150 w-48 p-2 focus:outline-none"
            type="text"
            value='streamify.net/rOoMiD'
            readOnly
          />
          <button type="submit" className="bg-gray-bg p-1 border border-gray-bg rounded-lg rounded-s-none ease duration-150 hover:bg-gray-bg/80 hover:border-gray-bg/80">
            <img src='src/assets/copy.svg' className='w-7'></img>
          </button>
        </div>
      </div>
    </>
  )
}