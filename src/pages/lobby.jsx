import axios from "axios";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import LobbyForm from "../components/forms/lobbyForm";

export default function LobbyPage() {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: () => {
      return axios.post("http://localhost:3001/api/room/create");
    },
    onSuccess: (data) => {
      console.log("connected to backend");
      navigate(`/Room/${data.data.code}`);
    },
    onError: () => {
      console.log("failed to connect");
    },
  });

  const create = () => {
    mutation.mutate();
    console.log("create");
  };

  const start = (partyLink) => {
    // const partyCode = partyLink.split.pop();
    try {
      navigate(`/Room/${partyLink}`);
    } catch (e) {}
  };
  return (
    <section className="w-screen h-screen bg-gray-bg flex justify-center items-center">
      <main className="bg-gray-comps rounded">
        <nav className="w-full px-28 py-4 lg:px-56 lg:py-6 bg-gray-dark rounded-t text-center">
          <h1 className="text-white text-3xl">Streamify</h1>
          <p className="text-gray-text">
            watch Youtube videos together with friends!
          </p>
        </nav>
        <div className="flex mx-8 my-10 justify-center items-cente lg:mx-12 lg:my-16">
          <LobbyForm handleCreate={create} handleStart={start} />
        </div>
      </main>
    </section>
  );
}
