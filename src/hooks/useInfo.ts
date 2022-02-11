import axios from "axios";
import { useState } from "react";
import useSWR from "swr";

const host =
  process.env.NODE_ENV === "production" && process.env.HOST
    ? process.env.HOST
    : "http://localhost:3000";

// Fetcher
const fetcher = <T>(url: string) =>
  axios.get<T>(host + url).then((res) => res.data);

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
