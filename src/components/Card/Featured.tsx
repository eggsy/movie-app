import Link from "next/link";

export const FeaturedCard: React.FC<{ movie: DiscoveryResult }> = ({
  movie,
}) => {
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
  const voteAverage = movie.vote_average;

  return (
    <Link href={`/movies/${movie.id}`}>
      <a
        className="w-full overflow-hidden transition-all transform bg-center bg-no-repeat bg-cover rounded-md md:hover:scale-105 group h-80"
        style={{
          backgroundImage: `url('${backdropUrl}')`,
        }}
      >
        <div className="absolute inset-0 bg-black/10 backdrop-filter backdrop-blur-sm" />

        <div className="absolute inset-x-0 bottom-0 px-6 py-4 text-white bg-gradient-to-t from-black to-transparent">
          <div className="flex items-end space-x-4">
            <div
              className="flex-shrink-0 w-24 bg-center bg-no-repeat bg-cover rounded-md h-36"
              style={{
                backgroundImage: `url('${posterUrl}')`,
              }}
            />

            <div className="flex flex-col items-start gap-4">
              <div className="flex flex-col items-start gap-2">
                <div className="text-lg font-medium leading-none line-clamp-2">
                  {movie.title}
                </div>

                <p className="leading-none opacity-75 line-clamp-2">
                  {movie.overview}
                </p>
              </div>

              <span className="px-2 py-1 space-x-1 text-sm rounded-lg bg-white/10 backdrop-blur-sm">
                👍 {voteAverage}/10
              </span>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default FeaturedCard;
