import { useState } from "react";

export default function LobbyForm({ handleCreate, handleStart }) {
  const [username, setUsername] = useState("");
  const [avatarLink, setAvatarLink] = useState("");
  const [link, setLink] = useState("");
  const [error, setError] = useState("");
  // add toogle for action state
  const createRoom = () => {
    try {
      if (!username) throw new Error("No username");
      handleCreate();
    } catch (e) {
      setError(e.message);
    }
  };

  const startParty = () => {
    try {
      console.log(!username || !link);
      if (!username || !link) throw new Error("No link or username provided");
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
        className="bg-gray-dark py-1 w-full rounded pl-2 outline-none placeholder:opacity-50 font-normal text-white"
      />
      <input
        type="text"
        value={avatarLink}
        onChange={(e) => setAvatarLink(e.target.value)}
        placeholder="Avatar link (optional)"
        className="bg-gray-dark py-1 w-full rounded pl-2 outline-none placeholder:opacity-50 font-normal text-white"
      />
      <div className="grid grid-cols-8 gap-3">
        <input
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Party Link"
          className="col-span-5 bg-gray-dark py-1 w-full rounded pl-2 outline-none placeholder:opacity-50 font-normal text-white"
        />
        <p className="col-span-1 text-gray-text text-center py-1">or</p>
        <button
          onClick={createRoom}
          className="col-span-2 text-white bg-red-main rounded text-sm font-light"
        >
          Create room
        </button>
      </div>
      <div className="flex justify-center gap-2">
        <p className="text-sm text-gray-text font-light">
          Only I can control party actions
        </p>
        <input type="checkbox" />
      </div>
      <div className="flex justify-center space-y-3">
        <button
          onClick={startParty}
          className="bg-red-main rounded text-white py-2 px-3 font-light text-sm"
        >
          Start the Party
        </button>
      </div>
      {error ? (
        <p className="text-red-main w-full text-center">{error}</p>
      ) : null}
    </div>
  );
}
