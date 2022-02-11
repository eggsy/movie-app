import axios from "axios";

// Types
import { TmdbApiResponse } from "../types";

interface ExtendedMovieInfo extends MovieInfo {
  media_type?: "movie" | "tv";
  credits?: {
    cast: ActorInfo[];
    crew: ActorInfo[];
  };
  videos: {
    results: Video[];
  };
}

interface ExtendedActorInfo extends ActorInfo {
  combined_credits: {
    cast: ExtendedMovieInfo[];
    crew: ExtendedMovieInfo[];
  };
}
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
    const { videos, credits, ...data } = await this.fetch<ExtendedMovieInfo>(
      `/${type}/${movieId}?append_to_response=videos,credits`
    );

    const latestTrailer = [...videos?.results]
      ?.filter((video) => video.type === "Trailer")
      ?.sort(
        (a: Video, b: Video) =>
          new Date(b.published_at).getTime() -
          new Date(a.published_at).getTime()
      )?.[0];

    const sortedCast = [...(credits?.cast || [])].sort(
      (a, b) => b.popularity - a.popularity
    );

    return {
      ...data,
      trailer: latestTrailer,
      cast: sortedCast.slice(0, 6),
    };
  }

  async getActor(actorId: string) {
    const { combined_credits, ...data } = await this.fetch<ExtendedActorInfo>(
      `/person/${actorId}?append_to_response=combined_credits`
    );

    const sortedCast = [...combined_credits?.cast]
      .filter((item) => item.media_type === "movie")
      .sort((a, b) => b.popularity - a.popularity);

    return {
      ...data,
      cast: sortedCast?.slice(0, 6) || [],
    };
  }

  async getDiscovery() {
    return this.fetch<{ results: DiscoveryResult[] }>(`/discover/movie`).then(
      (res) => res.results
    );
  }
}

export default new TmdbHandler();
