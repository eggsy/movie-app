interface ActorInfo {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday?: any;
  gender: number;
  homepage?: any;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
  cast: Cast[];
}

interface Cast extends MovieInfo {
  character: string;
  credit_id: string;
}
