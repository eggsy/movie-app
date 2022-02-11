import Link from "next/link";

// Types
import { Result } from "../../types/tmdb-api";

export const MovieCard: React.FC<{
  movie: Result;
  type?: "movie" | "tv";
}> = ({ movie, type = "movie" }) => {
  const imageUrl = `https://image.tmdb.org/t/p/w342${movie.poster_path}`;
  const path = type === "movie" ? "movies" : "series";

  return (
    <Link href={`/${path}/${movie.id}`}>
      <a
        className="w-full overflow-hidden transition-all transform bg-center bg-no-repeat bg-cover rounded-md md:hover:scale-[102.5%] group h-80"
        style={{
          backgroundImage: `url('${imageUrl}')`,
        }}
      >
        <div className="absolute flex items-center px-2 py-1 space-x-2 text-xs text-white rounded-md bg-white/10 top-3 left-3 backdrop-blur-sm">
          <span>👍 {movie.vote_average}</span>
        </div>

        <div className="absolute inset-x-0 bottom-0 hidden py-4 overflow-hidden transition-all select-none group-hover:block bg-gradient-to-t from-black/75 via-black/50 to-transparent ">
          <h3 className="px-4 text-lg font-medium leading-none text-center text-white text-shadow-md line-clamp-2">
            {movie.title || movie.name}
          </h3>
        </div>
      </a>
    </Link>
  );
};

export default MovieCard;
