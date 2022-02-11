import { useRouter } from "next/router";

// Types
import type { NextPage } from "next";

// Hooks
import useInfo from "../../hooks/useInfo";

// Functions
import getGenreEmoji from "../../functions/getGenreEmoji";
import getDaysLeft from "../../functions/getDaysLeft";
import getFormattedDate from "../../functions/getFormattedDate";
import getPrettyInfo from "../../functions/getPrettyInfo";

// Components
import PageLoader from "../../components/Page/Loader";
import PersonCard from "../../components/Card/Person";

// Icons
import { Play } from "../../components/Icons";

const SeriesPage: NextPage = () => {
  const { query } = useRouter();
  const { data, loading, error } = useInfo<SeriesInfo>(
    query.id as string,
    "tv"
  );

  if (loading || error) return <PageLoader seasons={true} error={error} />;
  else if (data) {
    const {
      titleExtra,
      genres,
      posterUrl,
      backgroundUrl,
      sortedCompanies,
      goodRating,
    } = getPrettyInfo(data);

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
              {data.next_episode_to_air && (
                <DaysTillNextEpisode
                  date={data.next_episode_to_air.air_date}
                  season={data.next_episode_to_air.season_number}
                  episode={data.next_episode_to_air.episode_number}
                />
              )}

              <div className="flex-col">
                <h1 className="text-4xl font-bold text-gray-800">
                  {data.name} {titleExtra && `(${titleExtra})`}
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
                  <Season key={seasonId} name={name} poster={poster_path} />
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 mx-auto text-center md:w-1/2">
            <h1 className="text-4xl font-bold text-gray-800">Cast</h1>

            <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3">
              {data.cast.map((cast, index) => (
                <PersonCard key={index} person={cast} personAs={cast.as} />
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
  } else return <div>Could not find that series.</div>;
};

const DaysTillNextEpisode: React.FC<{
  season: number;
  episode: number;
  date: string;
}> = ({ season, episode, date }) => {
  const daysUntilNextEpisode = getDaysLeft(date);

  return (
    <div className="px-2 py-1 mx-auto font-medium text-gray-700 rounded-md select-none w-max bg-gray-300/30 backdrop-blur-sm">
      🔥{" "}
      <span className="font-medium">
        S{season} E{episode} in{" "}
        {daysUntilNextEpisode === 0 ? "Today" : `${daysUntilNextEpisode} days`}
      </span>
    </div>
  );
};

const Season: React.FC<{ poster: string; name: string }> = ({
  poster,
  name,
}) => (
  <div
    className="relative w-40 bg-center bg-cover rounded-md shadow-sm h-60"
    style={{
      backgroundImage: `url('https://image.tmdb.org/t/p/w342${poster}')`,
    }}
  >
    <div className="absolute inset-x-0 bottom-0 p-4 text-white bg-gradient-to-t from-black/70 rounded-b-md">
      <div className="px-2 py-1 truncate rounded-md bg-white/10 backdrop-blur-sm">
        <span className="text-sm leading-none truncate">{name}</span>
      </div>
    </div>
  </div>
);

/*
  THESE EXPORTED COMPONENTS ARE
  ALSO USED BY OTHER PAGES
*/

export const Trailer: React.FC<{ videoId: string; poster: string }> = ({
  videoId,
  poster,
}) => (
  <a
    href={`https://youtube.com/watch?v=${videoId}`}
    target="_blank"
    rel="noreferrer"
    className="bg-center bg-cover rounded-full w-14 h-14"
    title="Play Trailer"
    style={{
      backgroundImage: `url('${poster}')`,
    }}
  >
    <div className="flex items-center justify-center w-full h-full transition-colors rounded-full text-white/70 hover:text-white bg-black/10 backdrop-blur-[2px]">
      <Play className="w-6 h-6" />
    </div>
  </a>
);

export const Genre: React.FC<{ genre: string }> = ({ genre }) => (
  <div className="px-2 py-1 text-sm font-medium text-gray-700 rounded-md select-none bg-gray-300/40">
    {getGenreEmoji(genre)} {genre}
  </div>
);

export const Company: React.FC<{ logo?: string; name: string }> = ({
  logo,
  name,
}) => (
  <div>
    {logo && (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img
        key={name}
        src={`https://image.tmdb.org/t/p/w500${logo}`}
        alt="company logo"
      />
    )}

    <span>{name}</span>
  </div>
);

export default SeriesPage;
