import { useRouter } from "next/router";
import Head from "next/head";

// Types
import type { NextPage } from "next";

// Hooks
import { useInfo } from "../../hooks/useInfo";

// Functions
import getFormattedDate from "../../functions/getFormattedDate";
import getPrettyInfo from "../../functions/getPrettyInfo";

// Components
import PageLoader from "../../components/Page/Loader";
import PageItem from "../../components/Page/Item";
import PersonCard from "../../components/Card/Person";
import ReviewCard from "../../components/Card/Review";
import { Trailer, Genre, Homepage, Rating } from "../series/[id]";

const MoviePage: NextPage = () => {
  const { query } = useRouter();
  const {
    data: movie,
    loading,
    error,
  } = useInfo<MovieInfo>(query.id as string);

  if (loading || error) return <PageLoader error={error} />;
  else if (movie) {
    const { titleExtra, genres, posterUrl, backgroundUrl, calculator } =
      getPrettyInfo(movie);

    return (
      <>
        <Head>
          <title>{movie.title} - Movie App</title>
        </Head>

        <div className="absolute inset-0 h-72 -z-10 bg-black/70">
          <div
            className="inset-0 w-full h-full bg-cover h-90 w-90"
            style={{ backgroundImage: `url('${backgroundUrl}')` }}
          />
        </div>

        <div className="px-6 space-y-52 md:px-0">
          <div className="flex flex-col items-center gap-10">
            <div className="p-1 rounded-md bg-white/10 backdrop-blur-xl">
              <div
                className="relative flex-shrink-0 w-48 bg-center bg-no-repeat bg-cover rounded-md h-72"
                style={{
                  backgroundImage: `url('${posterUrl}')`,
                }}
              >
                {movie.trailer && (
                  <div className="absolute inset-x-0 z-50 flex justify-center -bottom-6">
                    <Trailer
                      poster={backgroundUrl}
                      videoId={movie.trailer.key}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col items-center gap-6 text-center">
              <div className="flex-col">
                <h1 className="text-4xl font-bold text-gray-800">
                  {movie.title} {titleExtra && `(${titleExtra})`}
                </h1>

                {movie.tagline && (
                  <p className="w-3/4 mx-auto opacity-50 md:w-full">
                    {movie.tagline}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap justify-center gap-2 mx-auto">
                  {genres.map((genre) => (
                    <Genre key={genre} genre={genre} />
                  ))}

                  <Rating rating={movie.vote_average} />
                  {movie.homepage && <Homepage link={movie.homepage} />}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-40">
            <PageItem title="Overview">
              <div className="text-gray-600">
                {movie.overview || "Wow... This is so empty."}
              </div>
            </PageItem>

            {movie.release_date && (
              <PageItem title="Release Date">
                <div className="text-gray-600">
                  <div className="text-gray-600">
                    {getFormattedDate(movie.release_date)}
                  </div>
                </div>
              </PageItem>
            )}

            <PageItem title="Budget/Revenue">
              <div className="text-gray-600">
                <RevenueAndBudget
                  budget={movie.budget}
                  revenue={movie.revenue}
                  calculator={calculator}
                />
              </div>
            </PageItem>
          </div>

          <PageItem title="Cast">
            <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3">
              {movie.cast.map((cast, index) => (
                <PersonCard
                  key={index}
                  person={cast}
                  personAs={cast.character}
                />
              ))}
            </div>
          </PageItem>

          <PageItem title="Reviews">
            <div className="grid w-full gap-4">
              {!movie.comments.length ? (
                <span className="opacity-50">No reviews, yet.</span>
              ) : (
                movie.comments.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))
              )}
            </div>
          </PageItem>
        </div>
      </>
    );
  } else return <div>Could not find that movie.</div>;
};

const RevenueAndBudget: React.FC<{
  budget: number;
  revenue: number;
  calculator: Intl.NumberFormat;
}> = ({ budget = 0, revenue = 0, calculator }) => {
  if (!budget && !revenue)
    return <span>Seems like we do not have information on that.</span>;

  return (
    <div className="text-gray-600">
      They had{" "}
      <span className="font-semibold text-red-700">
        {calculator.format(budget)}
      </span>{" "}
      on making this film, and they earned{" "}
      <span className="font-semibold text-green-700">
        {calculator.format(revenue)}
      </span>{" "}
      in total. That means they made profit around{" "}
      <span className="font-semibold text-green-700 underline">
        {calculator.format(revenue - budget)}
      </span>
      .
    </div>
  );
};

export default MoviePage;
