import { useState } from "react";

export default function LobbyForm({ handleCreate, handleStart }) {
  const [username, setUsername] = useState("");
  const [avatarLink, setAvatarLink] = useState("");
  const [link, setLink] = useState("");
  // add toogle for action state
  const createRoom = () => {
    handleCreate();
  };

  const startParty = () => {
    handleStart();
  };
  return (
    <>
      <form className="w-3/5 space-y-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="bg-gray-dark py-1 w-full rounded pl-2 outline-none placeholder:opacity-50 font-normal"
        />
        <input
          type="text"
          value={avatarLink}
          onChange={(e) => setAvatarLink(e.target.value)}
          placeholder="Avatar link (optional)"
          className="bg-gray-dark py-1 w-full rounded pl-2 outline-none placeholder:opacity-50 font-normal"
        />
        <div className="grid grid-cols-8 gap-3">
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Party Link"
            className="col-span-5 bg-gray-dark py-1 w-full rounded pl-2 outline-none placeholder:opacity-50 font-normal"
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
        <div className="flex justify-center">
          <button
            onClick={startParty}
            className="bg-red-main rounded text-white py-2 px-3 font-light text-sm"
          >
            Start the Party
          </button>
        </div>
      </form>
    </>
  );
}
