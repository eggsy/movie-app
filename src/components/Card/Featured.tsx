import Link from "next/link";
import { motion } from "framer-motion";

export const FeaturedCard: React.FC<{ movie: DiscoveryResult }> = ({
  movie,
}) => {
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
  const voteAverage = movie.vote_average;

  return (
    <Link href={`/movies/${movie.id}`} passHref>
      <motion.a
        whileHover={{
          scale: 1.05,
        }}
        className="relative w-full overflow-hidden rounded-md h-80"
      >
        <div
          className="absolute inset-0 bg-center bg-cover rounded-md"
          style={{
            backgroundImage: `url('${backdropUrl}')`,
          }}
        />

        <div className="absolute inset-x-0 bottom-0 px-6 py-4 text-white bg-gradient-to-t from-black via-black to-transparent">
          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            <div
              className="flex-shrink-0 w-24 bg-center bg-cover rounded-md h-36"
              style={{
                backgroundImage: `url('${posterUrl}')`,
              }}
            />

            <div className="flex flex-col items-start gap-4">
              <div className="flex flex-col items-start gap-2 overflow-hidden">
                <div className="text-lg font-medium leading-tight line-clamp-2">
                  {movie.title}
                </div>

                <p className="leading-tight opacity-75 line-clamp-2">
                  {movie.overview}
                </p>
              </div>

              <span className="px-2 py-1 space-x-1 text-sm rounded-lg bg-white/10 backdrop-blur-sm">
                👍 {voteAverage}/10
              </span>
            </div>
          </div>
        </div>
      </motion.a>
    </Link>
  );
};

export default FeaturedCard;
