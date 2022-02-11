import axios from "axios";
import { useState } from "react";
import useSWR from "swr";

// Types
import type { Person, Result } from "../types/tmdb-api";

// Fetcher
const fetcher = <T>(url: string) => axios.get<T>(url).then((res) => res.data);

// Return Type
interface ITrendingResponse {
  loading: boolean;
  error: string | null;
  data: Data | null;
}

interface Data {
  tv: Result[];
  movie: Result[];
  person: Person[];
}

export const useTrending = (): ITrendingResponse => {
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState(null);

  useSWR<Data>("/api/getTrending", fetcher, {
    onSuccess: setData,
    onError: (err) => setError(err.message),
  });

  return {
    loading: !error && !data,
    error,
    data: {
      movie: data?.movie.slice(0, 6) || [],
      tv: data?.tv.slice(0, 6) || [],
      person: data?.person.slice(0, 6) || [],
    },
  };
};

export default useTrending;
