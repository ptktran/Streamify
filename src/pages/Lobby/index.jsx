import LobbyForm from "@/components/Forms/LobbyForm";

const Page = () => {
  const handle = () => {
    return;
  };
  return (
    <section className="w-screen h-screen bg-gray-bg flex justify-center items-center">
      <main className="bg-gray-comps rounded-lg">
        <nav className="w-full px-28 py-4 lg:px-56 lg:py-6 bg-gray-dark rounded-t-lg text-center">
          <h1 className="text-white text-3xl">Streamify</h1>
          <p className="text-gray-text">
            watch Youtube videos together with friends!
          </p>
        </nav>
        <div className="flex mx-8 my-10 justify-center items-cente lg:mx-12 lg:my-16">
          <LobbyForm handleCreate={handle} handleStart={handle} />
        </div>
      </main>
    </section>
  );
};

export default Page;
