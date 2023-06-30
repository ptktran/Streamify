import React, { useState, useRef, useEffect } from 'react'

export default function ChatBox({ chat, sendMessage, sender }) {
  const [ message, setMessage ] = useState('')
  const scroller = useRef()
  const handleInput = (e) => {
    setMessage(e.target.value)
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    sendMessage(message)
    setMessage('')
  }

  // const messageIsLink = (message) => {
  //   if (message.slice(0, 5) === 'https') {
  //     return true
  //   } else {
  //     return false
  //   }
  // }

  useEffect(() => {
    scroller.current.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  return (
    <>
      <div className="h-full bg-gray-comps rounded-xl">
        <section className="h-[6%]">
          <div className="flex justify-between items-center p-4 bg-gray-dark rounded-t-xl">
            <h1 className="text-white font-semibold text-md">🎉 Your Party</h1>
            <p className="text-gray-text text-xs"></p>
          </div> 
          {/* <div className="text-gray-text text-xs rounded-xl bg-gray-bg m-auto my-3 px-3 py-1 w-fit">
            <h1>👑 jackie has control over party actions</h1>
          </div> */}
        </section>

        
        <section className="h-[87%] overflow-y-auto scrollbar-thin scrollbar-track-gray-dark">
          <div className="text-sm text-gray-text p-5">
            {chat &&
              chat.map((value, index) => (
                <div key={index}>
                  {value.sender === sender ? (
                    <div className="w-full flex items-end flex-col text-left mb-3 gap-y-1">
                      <p className="text-gray-text font-semibold text-xs">{value.sender}</p>
                      <div className="text-sm rounded-2xl rounded-tr-none bg-gray-bg text-white max-w-[80%] py-2 px-3 break-words">
                        {/* {messageIsLink(value.message) ? (
                          <img src={value.message}></img>
                        ) : (
                          <p>{value.message}</p>
                        )} */}
                        {value.message}
                      </div>
                    </div>
                  ) : (
                    <div className="w-full flex items-start flex-col text-left mb-3 gap-y-1">
                      <p className="text-gray-text font-semibold text-xs">{value.sender}</p>
                      <div className="text-sm rounded-2xl rounded-tl-none bg-gray-bg text-white max-w-[80%] py-2 px-3 break-words">
                        {value.message}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <div ref={scroller}></div>
          </div>
        </section>

        <section className="h-[7%] px-2.5 flex">
          <div className="flex items-center m-auto w-full">  
            <form onSubmit={handleSendMessage} className='w-full flex justify-between'>
              <input 
                className="w-full bg-gray-dark border border-gray-dark text-white text-sm rounded-lg rounded-e-none border-r-0 transition-colors ease duration-150 focus:border-gray-bg p-3 focus:outline-none"
                placeholder="Send a chat"
                type="text"
                value={message}
                onChange={handleInput}
              />
              {(!message || message.trim().length === 0) ? (
                <button disabled type="submit" className="bg-gray-bg px-2.5 py-2 text-lg border border-gray-bg text-gray-text rounded-lg rounded-s-none">→</button> 
              ) : (
                <button type="submit" className="bg-red-main px-2.5 py-2 text-lg border border-red-main text-white rounded-lg rounded-s-none ease duration-150 hover:bg-red-main/80 hover:border-red-main/80">→</button> 
              )}
            </form>
          </div>
        </section>
      </div>  
    </>
  )
}