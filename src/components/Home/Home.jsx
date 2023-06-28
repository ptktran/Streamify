import React from 'react' 
import VideoBox from '../VideoBox/VideoBox'
import NavBar from '../NavBar/NavBar'
import Chat from '../../pages/Socket'

export default function Home() {
  return (
    <>
      <main className="bg-gray-bg grid grid-cols-5 h-screen">
        <div className="col-span-4 flex flex-col gap-y-2 p-2 pr-0">
            <div className="h-[7%]">
              <NavBar />
            </div>
            <div className="h-[93%]">
              <VideoBox />
            </div>
        </div>
        <div className="col-span-1 h-screen p-2">
          <Chat />
        </div>
      </main>
    </>
  )  
}