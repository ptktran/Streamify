import React, { useState } from "react";
import { Link } from "react-router-dom";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import copy from "../../assets/copy.svg";
import copiedSymbol from "../../assets/copied.svg";

export default function NavBar() {
  const roomUrl = window.location.pathname.slice(6);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(roomUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <>
      <div className="w-full bg-gray-comps flex justify-between items-center py-3 px-6 rounded-xl">
        <div>
          <h1 className="text-white text-xl">📺 Streamify</h1>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <input
              className="bg-gray-dark text-sm border border-gray-bg text-gray-text rounded-lg rounded-e-none border-r-0 transition-colors ease duration-150 w-48 p-2 focus:outline-none"
              type="text"
              id="roomUrl"
              value={roomUrl}
              readOnly
            />
            <button
              type="submit"
              onClick={handleCopy}
              className="bg-gray-bg hover:bg-gray-bg/80 border border-gray-bg p-1 rounded-lg rounded-s-none ease duration-150 copyButton"
            >
              {copied ? (
                <>
                  <img src={copiedSymbol} className="w-7" alt="copied" />
                  <Tooltip
                    anchorSelect=".copyButton"
                    place="bottom"
                    style={{ backgroundColor: "#181818", color: "#A6A6A6" }}
                  >
                    room ID copied!
                  </Tooltip>
                </>
              ) : (
                <>
                  <img src={copy} className="w-7" alt="copy" />
                  <Tooltip
                    anchorSelect=".copyButton"
                    place="bottom"
                    style={{ backgroundColor: "#181818", color: "#A6A6A6" }}
                  >
                    copy room ID
                  </Tooltip>
                </>
              )}
            </button>
          </div>

          <div>
            <Link to="/Connect">
              <button
                type="submit"
                className="bg-red-main px-2.5 py-2 text-sm border border-red-main text-white rounded-lg duration-150 hover:bg-red-main/80 hover:border-red-main/80"
              >
                Leave room
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
