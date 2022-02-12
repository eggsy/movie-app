import axios from "axios";
import { useState } from "react";
import useSWR from "swr";

// Fetcher
const fetcher = <T>(url: string) => axios.get<T>(url).then((res) => res.data);

export const useActor = (actorId: string) => {
  const [data, setData] = useState<ActorInfo>();
  const [error, setError] = useState(null);

  useSWR<ActorInfo>(`/api/getActor?id=${actorId}`, fetcher, {
    onSuccess: setData,
    onError: (err) => setError(err.message),
  });

  return {
    loading: !error && !data,
    error,
    data,
  };
};

export default useActor;
