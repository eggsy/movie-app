import axios from "axios";

// Types
import { TmdbApiResponse } from "../types";

class TmdbHandler {
  apiKey = process.env.TMDB_API_KEY;

  async fetch<T>(url: string) {
    const urlConstruct = new URL("http://api.themoviedb.org/3" + url);
    urlConstruct.searchParams.append("api_key", this.apiKey);

    return axios.get<T>(urlConstruct.toString()).then((res) => res.data);
  }

  async getTrending() {
    const tv = await this.fetch<TmdbApiResponse>(`/trending/tv/week`);
    const movie = await this.fetch<TmdbApiResponse>(`/trending/movie/week`);
    const person = await this.fetch<TmdbApiResponse>(`/trending/person/week`);

    return {
      tv: tv.results,
      movie: movie.results,
      person: person.results,
    };
  }

  async getInfo(movieId: string, type: "movie" | "tv" = "movie") {
    return this.fetch(`/${type}/${movieId}`);
  }

  async getDiscovery() {
    return this.fetch<{ results: DiscoveryResult[] }>(`/discover/movie`).then(
      (res) => res.results
    );
  }
}

export default new TmdbHandler();
