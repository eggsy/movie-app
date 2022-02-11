import { useRouter } from "next/router";

// Types
import type { NextPage } from "next";

// Hooks
import { useInfo } from "../../hooks/useInfo";

// Functions
import getFormattedDate from "../../functions/getFormattedDate";
import getPrettyInfo from "../../functions/getPrettyInfo";

// Components
import PageLoader from "../../components/Page/Loader";
import PersonCard from "../../components/Card/Person";
import { Trailer, Genre, Company } from "../series/[id]";

const MoviePage: NextPage = () => {
  const { query } = useRouter();
  const { data, loading, error } = useInfo<MovieInfo>(query.id as string);

  if (loading || error) return <PageLoader error={error} />;
  else if (data) {
    const {
      titleExtra,
      genres,
      posterUrl,
      backgroundUrl,
      sortedCompanies,
      goodRating,
      calculator,
    } = getPrettyInfo(data);

    return (
      <>
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
                {data.trailer && (
                  <div className="absolute inset-x-0 z-50 flex justify-center -bottom-6">
                    <Trailer
                      poster={backgroundUrl}
                      videoId={data.trailer.key}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col items-center gap-6 text-center">
              <div className="flex-col">
                <h1 className="text-4xl font-bold text-gray-800">
                  {data.title} {titleExtra && `(${titleExtra})`}
                </h1>

                {data.tagline && (
                  <p className="truncate opacity-50">{data.tagline}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap justify-center gap-2 mx-auto md:w-2/3">
                  {genres.map((genre) => (
                    <Genre key={genre} genre={genre} />
                  ))}

                  <span className="px-2 py-1 text-sm font-medium text-white bg-yellow-600 rounded-md select-none">
                    ⏱ {Math.floor(data.runtime / 60)}h {data.runtime % 60}m
                  </span>

                  <span
                    className={
                      (goodRating
                        ? "text-green-700 bg-green-300/50"
                        : "text-red-700 bg-red-300/50") +
                      " px-2 py-1 text-sm font-medium rounded-md select-none  "
                    }
                  >
                    {goodRating ? "👍" : "👎"} {data.vote_average}
                  </span>

                  {data.homepage && (
                    <a
                      href={data.homepage}
                      target="_blank"
                      rel="noreferrer"
                      className="px-2 py-1 text-sm font-medium text-white transition-colors rounded-md select-none bg-brand-dark-blue backdrop-blur-sm hover:bg-brand-dark-blue/90"
                    >
                      🔗 Homepage
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-40">
            <div className="flex flex-col items-center gap-4 mx-auto text-center md:w-1/2">
              <h1 className="text-4xl font-bold text-gray-800">Overview</h1>

              <div className="text-gray-600">
                {data.overview || "Wow... This is so empty."}
              </div>
            </div>

            {data.release_date && (
              <div className="flex flex-col items-center gap-4 mx-auto text-center md:w-1/2">
                <h1 className="text-4xl font-bold text-gray-800">
                  Release Date
                </h1>

                <div className="text-gray-600">
                  {getFormattedDate(data.release_date)}
                </div>
              </div>
            )}

            <div className="flex flex-col items-center gap-4 mx-auto text-center md:w-1/2">
              <h1 className="text-4xl font-bold text-gray-800">
                Budget/Revenue
              </h1>

              <div className="text-gray-600">
                They had{" "}
                <span className="font-semibold text-red-700">
                  {calculator.format(data.budget)}
                </span>{" "}
                on making this film, and they earned{" "}
                <span className="font-semibold text-green-700">
                  {calculator.format(data.revenue)}
                </span>{" "}
                in total. That means they earned around{" "}
                <span className="font-semibold text-green-600 underline">
                  {calculator.format(data.revenue - data.budget)}
                </span>
                .
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 mx-auto text-center md:w-1/2">
            <h1 className="text-4xl font-bold text-gray-800">Cast</h1>

            <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3">
              {data.cast.map((cast, index) => (
                <PersonCard
                  key={index}
                  person={cast}
                  personAs={cast.character}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 mx-auto text-center md:w-1/2">
            <h1 className="text-4xl font-bold text-gray-800">Studios</h1>

            <div className="space-y-6 text-gray-600 md:w-1/4">
              {sortedCompanies.map(({ name, logo_path }) => (
                <Company key={name} name={name} logo={logo_path} />
              ))}
            </div>
          </div>
        </div>
      </>
    );
  } else return <div>Could not find that movie.</div>;
};

export default MoviePage;
