import axios from "axios";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

export default function LobbyPage() {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: () => {
      return axios.post("http://localhost:3001/api/room/create");
    },
    onSuccess: (data) => {
      navigate(`/Room/${data.data.code}`);
    },
  });
  return (
    <div>
      <button onClick={() => mutation.mutate()}>Mutate</button>
    </div>
  );
}
