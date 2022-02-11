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

export const useDiscovery = () => {
  const [data, setData] = useState<DiscoveryResult[]>();
  const [error, setError] = useState(null);

  useSWR<DiscoveryResult[]>(`/api/getDiscovery`, fetcher, {
    onSuccess: setData,
    onError: (err) => setError(err.message),
  });

  return {
    loading: !error && !data,
    error,
    data,
  };
};

export default useDiscovery;
