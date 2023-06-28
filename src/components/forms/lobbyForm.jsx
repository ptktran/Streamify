import { useState } from "react";
import { useSessionStore } from "../../utils/store";

export default function LobbyForm({ handleCreate, handleStart }) {
  const { SetName } = useSessionStore();
  const [username, setUsername] = useState("");
  const [avatarLink, setAvatarLink] = useState("");
  const [link, setLink] = useState("");
  const [error, setError] = useState("");
  // add toogle for action state
  const createRoom = () => {
    try {
      if (!username) throw new Error("No username");
      SetName(username);
      handleCreate();
    } catch (e) {
      setError(e.message);
    }
  };

  const startParty = () => {
    try {
      if (!username || !link) throw new Error("No link or username provided");
      SetName(username);
      handleStart(link);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="w-3/5 space-y-4">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className="bg-gray-dark py-1.5 w-full rounded-lg pl-2.5 outline-none placeholder:opacity-50 font-normal text-white ease duration-150 focus:border-gray-bg border border-gray-dark"
      />
      <input
        type="text"
        value={avatarLink}
        onChange={(e) => setAvatarLink(e.target.value)}
        placeholder="Avatar link (optional)"
        className="bg-gray-dark py-1.5 w-full rounded-lg pl-2.5 outline-none placeholder:opacity-50 font-normal text-white ease duration-150 focus:border-gray-bg border border-gray-dark"
      />
      <input
        type="text"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder="Party Link"
        className="bg-gray-dark py-1.5 w-full rounded-lg pl-2.5 outline-none placeholder:opacity-50 font-normal text-white ease duration-150 focus:border-gray-bg border border-gray-dark"
      />
      <div className="flex justify-center gap-2">
        <p className="text-gray-text font-light">
          Only I can control party actions
        </p>
        <input type="checkbox" />
      </div>
      <div className="flex justify-center items-center gap-x-5">
        {(link) ? (
          <button
            onClick={startParty}
            className="px-3 py-2 font-light bg-red-main ease duration-150 hover:bg-red-main/80 hover:border-red-main/80 rounded-lg text-white"
          >
            Join party
          </button>
        ) : (
          <button
            disabled
            className="px-3 py-2 font-light bg-gray-bg rounded-lg text-gray-text"
          >
            Join party
          </button>
        )}

        <p className="text-gray-text">or</p>

        <button
          onClick={createRoom}
          className="px-3 py-2 text-white font-light rounded-lg bg-red-main ease duration-150 hover:bg-red-main/80 hover:border-red-main/80"
        >
          Create room
        </button>
      </div>
      {error ? (
        <p className="text-red-main w-full text-center">{error}</p>
      ) : null}
    </div>
  );
}
