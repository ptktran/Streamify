import React from 'react'

export default function ChatBox() {
  return (
    <>
      <div className="h-full w-full bg-gray-comps rounded-xl">
        <section className="h-[10%]">
          <div className="flex justify-between items-center p-4 bg-gray-dark rounded-t-xl">
            <h1 className="text-white font-semibold text-md">🎉 Party Name</h1>
            <p className="text-gray-text text-xs">5 members</p>
          </div> 
          <div className="text-gray-text text-xs rounded-xl bg-gray-bg m-auto my-3 px-3 py-1 w-fit">
            <h1>👑 jackie has control over party actions</h1>
          </div>
        </section>

        <section className="h-[83%]">
          <div className="text-sm text-gray-text p-5">
            chat messages
          </div>
        </section>

        <section className="h-[7%] px-2.5 flex">
          <div className="flex items-center m-auto w-full">  
            <input 
              className="w-full bg-gray-dark border border-gray-dark text-gray-text text-sm rounded-lg rounded-e-none border-r-0 transition-colors ease duration-150 focus:border-gray-text p-3 focus:outline-none"
              placeholder="Your message"
              type="text"
            />
            <button type="submit" className="bg-red-main px-2.5 py-2 text-lg border border-red-main text-white rounded-lg rounded-s-none ease duration-150 hover:bg-red-main/80 hover:border-red-main/80">→</button> 
          </div>
        </section>
      </div>  
    </>
  )
}