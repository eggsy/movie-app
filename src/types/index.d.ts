export interface TmdbApiResponse {
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}

export interface Result {
  video?: boolean;
  vote_average: number;
  overview: string;
  release_date?: string;
  vote_count: number;
  adult?: boolean;
  backdrop_path: string;
  title?: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title?: string;
  poster_path: string;
  popularity: number;
  media_type: "tv" | "movie" | "person";
  name?: string;
  original_name?: string;
  first_air_date?: string;
  origin_country?: string[];
}

export interface Person {
  adult: boolean;
  gender: number;
  name: string;
  id: number;
  known_for: Knownfor[];
  known_for_department: string;
  profile_path?: string;
  popularity: number;
  media_type: string;
  character: string;
}

export interface Knownfor {
  adult?: boolean;
  backdrop_path: string;
  genre_ids: (number | number)[];
  id: number;
  media_type: string;
  title?: string;
  original_language: string;
  original_title?: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date?: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
  original_name?: string;
  origin_country?: string[];
  name?: string;
  first_air_date?: string;
}
