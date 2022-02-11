import { useRouter } from "next/router";

// Types
import type { NextPage } from "next";

// Hooks
import { useInfo } from "../../hooks/useInfo";

// Functions
import getGenreEmoji from "../../functions/getGenreEmoji";
import getDaysLeft from "../../functions/getDaysLeft";
import getFormattedDate from "../../functions/getFormattedDate";

const SeriesPage: NextPage = () => {
  const { query } = useRouter();
  const { data, loading, error } = useInfo<SeriesInfo>(
    query.id as string,
    "tv"
  );

  if (loading) return <p>Loading...</p>;
  else if (error) return <p>Error!</p>;
  else if (data) {
    const titleExtra = data.name !== data.original_name && data.original_name;

    const genres = [...data.genres.map(({ name }) => name)];
    if (data.adult) genres.push("Adult");

    const posterUrl = `https://image.tmdb.org/t/p/w342${data.poster_path}`;
    const backgroundUrl = `https://image.tmdb.org/t/p/original${data.backdrop_path}`;

    const sortedCompanies = [...data.production_companies].sort((a, b) => {
      if (a.logo_path && !b.logo_path) return -1;
      return 0;
    });

    const goodRating = data.vote_average > 5;

    return (
      <>
        <div className="absolute inset-0 shadow-lg h-72 -z-10 bg-black/70 backdrop-filter backdrop-blur-sm">
          <div
            className="inset-0 w-full h-full bg-cover h-90 w-90"
            style={{ backgroundImage: `url('${backgroundUrl}')` }}
          />
        </div>

        <div className="px-6 space-y-52 md:px-0">
          <div className="flex flex-col items-center gap-10">
            <div
              className="flex-shrink-0 w-48 overflow-hidden bg-center bg-no-repeat bg-cover rounded-md h-72"
              style={{
                backgroundImage: `url('${posterUrl}')`,
              }}
            />

            <div className="flex flex-col items-center gap-4 text-center">
              {data.next_episode_to_air && (
                <div className="px-2 py-1 mx-auto font-medium text-gray-700 rounded-md select-none w-max bg-gray-300/30 backdrop-blur-sm">
                  🔥{" "}
                  <span className="font-medium">
                    S{data.next_episode_to_air.season_number} E
                    {data.next_episode_to_air.episode_number} in{" "}
                    {getDaysLeft(data.next_episode_to_air.air_date)} days
                  </span>
                </div>
              )}

              <h1 className="text-4xl font-bold text-gray-800">
                {data.name} {titleExtra && `(${titleExtra})`}
              </h1>

              <div className="space-y-2">
                <div className="flex flex-wrap space-x-2">
                  {genres.map((genre) => (
                    <div
                      key={genre}
                      className="px-2 py-1 text-sm font-medium text-gray-700 rounded-md select-none bg-gray-300/40"
                    >
                      {getGenreEmoji(genre)} {genre}
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2">
                  <span className="px-2 py-1 text-sm font-medium text-gray-700 rounded-md select-none bg-gray-300/40 backdrop-blur-sm">
                    👀 {data.number_of_episodes} Ep / {data.number_of_seasons}S
                  </span>

                  <span
                    className={
                      (goodRating
                        ? "text-green-700 bg-green-300/50"
                        : "text-red-700 bg-red-300/50") +
                      " px-2 py-1 text-sm font-medium rounded-md backdrop-blur-sm select-none"
                    }
                  >
                    {goodRating ? "👍" : "👎"} {data.vote_average}
                  </span>
                </div>

                <div>
                  {data.homepage && (
                    <a
                      href={data.homepage}
                      target="_blank"
                      rel="noreferrer"
                      className="px-2 py-1 text-sm font-medium text-gray-700 rounded-md select-none bg-gray-300/40 backdrop-blur-sm hover:bg-gray-300/60"
                    >
                      🔗 Website
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

            <div className="flex flex-col items-center gap-4 mx-auto text-center md:w-1/2">
              <h1 className="text-4xl font-bold text-gray-800">
                First Released On
              </h1>

              <div className="text-gray-600">
                {getFormattedDate(data.first_air_date)}
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 mx-auto text-center md:w-1/2">
              <h1 className="text-4xl font-bold text-gray-800">Seasons</h1>

              <div className="grid grid-cols-2 gap-4 text-gray-600 md:grid-cols-3">
                {data.seasons.map(({ id: seasonId, name, poster_path }) => (
                  <div
                    key={seasonId}
                    className="relative w-40 bg-center bg-cover rounded-md shadow-sm h-60"
                    style={{
                      backgroundImage: `url('https://image.tmdb.org/t/p/w342${poster_path}')`,
                    }}
                  >
                    <div className="absolute inset-x-0 bottom-0 p-4 text-white bg-gradient-to-t from-black/70 rounded-b-md">
                      <div className="px-2 py-1 truncate rounded-md bg-white/10 backdrop-blur-sm">
                        <span className="text-sm leading-none truncate">
                          {name}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 mx-auto text-center md:w-1/2">
            <h1 className="text-4xl font-bold text-gray-800">Studios</h1>

            <div className="space-y-6 text-gray-600 md:w-1/4">
              {sortedCompanies.map(({ name, logo_path }) => (
                <div key={name}>
                  {logo_path && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      key={name}
                      src={`https://image.tmdb.org/t/p/w500${logo_path}`}
                      alt="company logo"
                    />
                  )}

                  <span>{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  } else return <div>Could not find that series.</div>;
};

export default SeriesPage;
