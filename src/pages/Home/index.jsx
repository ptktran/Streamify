import { useRouter } from "next/router"
import Link from 'next/link';

const Page = () => {
  return (
    <>
    {/* Lobby */}
      <section className="w-screen h-screen bg-gray-bg flex justify-center items-center">
        <main className="bg-gray-comps rounded-lg">
          <nav className="w-full px-28 py-4 lg:px-56 lg:py-6 bg-gray-dark rounded-t-lg text-center">
            <h1 className="text-white text-3xl">Streamify</h1>
            <p className="text-gray-text">
              watch Youtube videos together with friends!
            </p>
          </nav>
          <div className="flex mx-8 my-10 justify-center items-cente lg:mx-12 lg:my-16">
            {/* <LobbyForm handleCreate={create} handleStart={start} /> */}
          </div>
        </main>
      </section>
    {/* Home */}
      <main className="bg-gray-bg grid grid-cols-5 h-screen">
        <div className="col-span-4 flex flex-col gap-y-2 p-2 pr-0">
            <div className="h-[7%]">
              {/* <NavBar /> */}
            </div>
            <div className="h-[93%]">
              {/* <VideoBox /> */}
            </div>
        </div>
        <div className="col-span-1 h-screen p-2">
          {/* <Chat /> */}
        </div>
      </main>
    </>
  )
}

export default Page