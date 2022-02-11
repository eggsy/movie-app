import axios from "axios";
import { useState } from "react";
import useSWR from "swr";

// Fetcher
const fetcher = <T>(url: string) => axios.get<T>(url).then((res) => res.data);

export const useInfo = <T>(movieId: string, type: "movie" | "tv" = "movie") => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState(null);

  useSWR<T>(`/api/getInfo?type=${type}&id=${movieId}`, fetcher, {
    onSuccess: setData,
    onError: (err) => setError(err.message),
  });

  return {
    loading: !error && !data,
    error,
    data,
  };
};

export default useInfo;
