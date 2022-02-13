import Head from "next/head";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { Tooltip } from "react-tippy";

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
import { Link, Play } from "../../components/Icons";
import PageItem from "../../components/Page/Item";

const SeriesPage: NextPage = () => {
  const { query } = useRouter();
  const {
    data: series,
    loading,
    error,
  } = useInfo<SeriesInfo>(query.id as string, "tv");

  if (loading || error) return <PageLoader seasons={true} error={error} />;
  else if (series) {
    const { titleExtra, genres, posterUrl, backgroundUrl } =
      getPrettyInfo(series);

    return (
      <>
        <Head>
          <title>{series.name} - Movie App</title>
        </Head>

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
                {series.trailer && (
                  <div className="absolute inset-x-0 z-10 flex -bottom-6">
                    <Trailer
                      poster={backgroundUrl}
                      videoId={series.trailer.key}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col items-center gap-6 text-center">
              {series.next_episode_to_air && (
                <DaysTillNextEpisode
                  date={series.next_episode_to_air.air_date}
                  season={series.next_episode_to_air.season_number}
                  episode={series.next_episode_to_air.episode_number}
                />
              )}

              <div className="space-y-1">
                <h1 className="text-4xl font-bold text-gray-800">
                  {series.name} {titleExtra && `(${titleExtra})`}
                </h1>

                {series.tagline && (
                  <p className="w-3/4 mx-auto opacity-50 md:w-full">
                    {series.tagline}
                  </p>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap justify-center gap-2 mx-auto">
                  {genres.map((genre) => (
                    <Genre key={genre} genre={genre} />
                  ))}

                  <Rating rating={series.vote_average} />
                  {series.homepage && <Homepage link={series.homepage} />}
                </div>

                <div className="text-sm font-medium opacity-50 select-none">
                  👀 {series.number_of_episodes} Ep / {series.number_of_seasons}
                  S
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-40">
            <PageItem title="Overview">
              <div className="text-gray-600">
                {series.overview || "Wow... This is so empty."}
              </div>
            </PageItem>

            <PageItem title="First Released On">
              <div className="text-gray-600">
                {getFormattedDate(series.first_air_date)}
              </div>
            </PageItem>

            <PageItem title="Seasons">
              <div className="grid w-full grid-cols-2 gap-4 text-gray-600 md:grid-cols-3">
                {series.seasons?.map(({ id: seasonId, name, poster_path }) => (
                  <SeasonCard key={seasonId} name={name} poster={poster_path} />
                ))}
              </div>
            </PageItem>
          </div>

          <PageItem title="Cast">
            <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3">
              {series.cast.map((cast, index) => (
                <PersonCard
                  key={index}
                  person={cast}
                  personAs={cast.character}
                />
              ))}
            </div>
          </PageItem>
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

const SeasonCard: React.FC<{ poster: string; name: string }> = ({
  poster,
  name,
}) => {
  const posterUrl = poster
    ? `https://image.tmdb.org/t/p/w500${poster}`
    : "/no-image.svg";

  return (
    <div
      className="relative w-full bg-center bg-cover rounded-md shadow-sm h-80"
      style={{
        backgroundImage: `url('${posterUrl}')`,
      }}
    >
      <div className="absolute inset-x-0 bottom-0 p-4 text-white bg-gradient-to-t from-black/70 rounded-b-md">
        <div className="px-2 py-1 truncate rounded-md bg-white/10 backdrop-blur-sm">
          <span className="text-sm leading-none truncate">{name}</span>
        </div>
      </div>
    </div>
  );
};

/*
  THESE EXPORTED COMPONENTS ARE
  ALSO USED BY OTHER PAGES
*/

export const Trailer: React.FC<{ videoId: string; poster: string }> = ({
  videoId,
  poster,
}) => (
  <Tooltip
    title="Trailer"
    position="top"
    className="mx-auto rounded-full w-14 h-14"
  >
    <motion.a
      href={`https://youtube.com/watch?v=${videoId}`}
      target="_blank"
      rel="noreferrer"
      className="absolute inset-0 mx-auto bg-center bg-cover rounded-full h-14 w-14"
      style={{
        backgroundImage: `url('${poster}')`,
      }}
      whileHover={{
        scale: 1.1,
      }}
    >
      <div className="flex ring-4 ring-white items-center justify-center w-full h-full transition-colors rounded-full text-white/70 hover:text-white bg-black/10 backdrop-blur-[1px]">
        <Play className="w-6 h-6" />
      </div>
    </motion.a>
  </Tooltip>
);

export const Genre: React.FC<{ genre: string }> = ({ genre }) => (
  <Tooltip title={genre} position="bottom">
    <motion.div
      className="flex items-center justify-center w-12 h-12 text-2xl font-medium text-gray-700 rounded-full select-none bg-gray-200/40"
      whileHover={{
        scale: 1.1,
      }}
    >
      {getGenreEmoji(genre)}
    </motion.div>
  </Tooltip>
);

export const Rating: React.FC<{ rating: number }> = ({ rating }) => (
  <Tooltip title="Average Rating" position="bottom">
    <motion.span
      className={`flex select-none items-center text-white justify-center w-12 h-12 p-2 rounded-full ${
        rating > 5 ? "bg-green-600" : "bg-red-600"
      }`}
      whileHover={{
        scale: 1.1,
      }}
    >
      {rating}
    </motion.span>
  </Tooltip>
);

export const Homepage: React.FC<{ link: string }> = ({ link }) => (
  <Tooltip title="Homepage" position="bottom">
    <motion.a
      href={link}
      target="_blank"
      rel="noreferrer"
      className="flex items-center justify-center w-12 h-12 p-2 text-2xl text-white rounded-full bg-brand-dark-blue"
      title="Visit Website"
      whileHover={{
        scale: 1.1,
      }}
    >
      <Link className="w-6 h-6" />
    </motion.a>
  </Tooltip>
);

export default SeriesPage;
