import VideoBox from "@/components/Video/Videobox/VideoBox";
import Chat from "@/components/Chatbox/Chatbox";
import NavBar from "@/components/Video/Navbar/Navbar";
const Page = () => {
  return (
    <>
      {/* Home */}
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
  );
};

export default Page;
