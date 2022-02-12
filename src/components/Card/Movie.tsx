import Link from "next/link";
import { motion } from "framer-motion";

// Types
import { Result } from "../../types/tmdb-api";

export const MovieCard: React.FC<{
  movie: Result;
  type?: "movie" | "tv";
}> = ({ movie, type = "movie" }) => {
  const path = type === "movie" ? "movies" : "series";

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
    : "/no-image.svg";

  return (
    <Link href={`/${path}/${movie.id}`} passHref>
      <motion.a
        className="relative w-full bg-center bg-no-repeat bg-cover rounded-md h-80"
        style={{
          backgroundImage: `url('${imageUrl}')`,
        }}
        whileHover={{
          scale: 1.05,
        }}
      >
        <div className="absolute flex items-center px-2 py-1 space-x-2 text-xs text-white rounded-md bg-white/10 top-3 left-3 backdrop-blur-sm">
          <span>👍 {movie.vote_average}</span>
        </div>

        <motion.div
          initial={{
            opacity: 0,
          }}
          whileHover={{
            opacity: 1,
          }}
          className="absolute inset-0 flex items-center justify-center py-4 rounded-md select-none bg-black/70 to-transparent "
        >
          <motion.h3
            initial={{
              opacity: 0,
              y: "100%",
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="px-4 text-lg font-medium leading-tight text-center text-white text-shadow-md line-clamp-2"
          >
            {movie.title || movie.name}
          </motion.h3>
        </motion.div>
      </motion.a>
    </Link>
  );
};

export default MovieCard;
