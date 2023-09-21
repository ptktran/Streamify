import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
// import data from '@emoji-mart/data'
// import Picker from '@emoji-mart/react'
// import emojisymbol from '../../assets/emoji.svg'

const Chatbox = ({ chat, sendMessage, sender }) => {
  return (
    <>
      <div className="h-full bg-gray-comps rounded-xl">
        <section className="h-[6%]">
          <div className="flex justify-between items-center p-4 bg-gray-dark rounded-t-xl">
            <h1 className="text-white font-semibold text-md">🎉 Your Party</h1>
            {/* <p className="text-gray-text text-xs">{name}</p> */}
          </div>
          {/* <div className="text-gray-text text-xs rounded-xl bg-gray-bg m-auto my-3 px-3 py-1 w-fit">
            <h1>👑 jackie has control over party actions</h1>
          </div> */}
        </section>

        <section className="h-[87%] overflow-y-auto scrollbar-thin scrollbar-track-gray-dark">
          <div className="text-sm text-gray-text p-5">
            {chat &&
              chat.map((value, index) => (
                <motion.div
                  initial={{ y: 5, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.15 }}
                >
                  <div key={index}>
                    {value.sender === sender ? (
                      <div className="w-full flex items-end flex-col text-left mb-3 gap-y-1">
                        <p className="text-gray-text font-semibold text-xs">
                          {value.sender}
                        </p>
                        {messageIsImage(value.message) ? (
                          <img
                            src={value.message}
                            className="w-3/4 rounded-lg"
                          />
                        ) : (
                          <div className="text-sm rounded-2xl rounded-tr-none bg-gray-bg text-white max-w-[80%] py-2 px-3 break-words">
                            {value.message}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="w-full flex items-start flex-col text-left mb-3 gap-y-1">
                        <p className="text-gray-text font-semibold text-xs">
                          {value.sender}
                        </p>
                        {messageIsImage(value.message) ? (
                          <img
                            src={value.message}
                            className="w-3/4 rounded-lg"
                          />
                        ) : (
                          <div className="text-sm rounded-2xl rounded-tl-none bg-gray-bg text-white max-w-[80%] py-2 px-3 break-words">
                            {value.message}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            {/* <div ref={scroller}></div> */}
          </div>
        </section>

        <section className="h-[7%] px-2.5 flex">
          <div className="flex items-center m-auto w-full justify-center">
            <form
              // onSubmit={handleSendMessage}
              className="w-full flex justify-between"
            >
              <input
                className="w-full bg-gray-dark border border-gray-dark text-white placeholder:text-gray-text text-sm rounded-lg rounded-e-none border-r-0 transition-colors ease duration-150 focus:border-gray-bg p-3 focus:outline-none"
                placeholder="Send a chat"
                type="text"
                //  value={message}
                // onChange={handleInput}
                onFocus={() => {
                  setInputFocused(true);
                  emojiClick && setEmojiClick(false);
                }}
                onBlur={() => setInputFocused(false)}
                // ref={inputRef}
              />
              <button
                type="button"
                onClick={() => {
                  setEmojiClick(!emojiClick);
                }}
                className={`bg-gray-dark px-1.5 py-2 border border-gray-dark ease duration-150 ${
                  false && "border-t-gray-bg border-b-gray-bg"
                } emojiButton`}
              >
                <img
                  src={""}
                  className={`w-[27px] opacity-50 ${false && "opacity-100"}`}
                />
              </button>
              {!false || message.trim().length === 0 ? (
                <button
                  disabled
                  type="submit"
                  className="bg-gray-bg px-2.5 py-2 text-lg border border-gray-bg text-gray-text rounded-lg rounded-s-none"
                >
                  →
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-red-main px-2.5 py-2 text-lg border border-red-main text-white rounded-lg rounded-s-none ease duration-150 hover:bg-red-main/80 hover:border-red-main/80"
                >
                  →
                </button>
              )}
            </form>
            {false && (
              <div className="absolute bottom-[5rem]">
                <Picker data={data} perLine={8} onEmojiSelect={onEmojiSelect} />
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Chatbox;
