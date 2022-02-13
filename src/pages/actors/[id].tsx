import Head from "next/head";
import { useRouter } from "next/router";
import { Tooltip } from "react-tippy";
import { motion } from "framer-motion";

// Types
import type { NextPage } from "next";

// Hooks
import { useActor } from "../../hooks/useActor";

// Functions
import getFormattedDate from "../../functions/getFormattedDate";

// Components
import PageLoader from "../../components/Page/Loader";
import MovieCard from "../../components/Card/Movie";
import { Homepage } from "../series/[id]";

const ActorPage: NextPage = () => {
  const { query } = useRouter();
  const { data: person, loading, error } = useActor(query.id as string);

  if (loading || error)
    return <PageLoader error={error} trailerButton={false} />;
  else if (person) {
    const { backgroundUrl, departmentAndPlace, gender, imageUrl } =
      getPrettyActorInfo(person);

    return (
      <>
        <Head>
          <title>{person.name} - Movie App</title>
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
                className="flex-shrink-0 w-48 bg-center bg-no-repeat bg-cover rounded-md h-72"
                style={{
                  backgroundImage: `url('${imageUrl}')`,
                }}
              />
            </div>

            <div className="flex flex-col items-center gap-6 text-center">
              <div className="flex-col">
                <h1 className="text-4xl font-bold text-gray-800">
                  {person.name}
                </h1>

                {departmentAndPlace.length > 0 && (
                  <p className="truncate opacity-50">
                    {departmentAndPlace.join(", ")}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap justify-center gap-2 mx-auto">
                  {person.birthday && (
                    <DetailIcon
                      icon="🐣"
                      title={getFormattedDate(person.birthday)}
                    />
                  )}

                  {person.deathday && (
                    <DetailIcon
                      icon="😢"
                      title={getFormattedDate(person.deathday)}
                    />
                  )}

                  {gender && (
                    <DetailIcon icon={gender.icon} title={gender.title} />
                  )}

                  {person.popularity && (
                    <DetailIcon icon="📈" title={person.popularity} />
                  )}

                  {person.homepage && <Homepage link={person.homepage} />}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-40">
            <div className="flex flex-col items-center gap-4 mx-auto text-center md:w-1/2">
              <h1 className="text-4xl font-bold text-gray-800">Biography</h1>

              <div className="text-gray-600">
                {person.biography ? (
                  person.biography
                ) : (
                  <span>Weird... They do not have a biography, yet.</span>
                )}
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 mx-auto text-center md:w-1/2">
              <h1 className="text-4xl font-bold text-gray-800">
                Also Known As
              </h1>

              <div className="text-gray-600 divide-gray-300">
                {!person.also_known_as?.length && <span>Well, nothing.</span>}
                {person.also_known_as?.map((name, index) => (
                  <span
                    key={name}
                    className={"px-3" + (index % 2 === 0 ? " opacity-50" : "")}
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 mx-auto text-center md:w-1/2">
              <h1 className="text-4xl font-bold text-gray-800">Known For</h1>

              {!person.cast?.length ? (
                <span>Seems like nothing.</span>
              ) : (
                <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3">
                  {person.cast?.map((cast, idx) => (
                    <MovieCard
                      key={idx}
                      movie={{
                        ...cast,
                        genre_ids: [],
                        media_type: "movie",
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  } else return <div>Could not find that movie.</div>;
};

const DetailIcon: React.FC<{
  title: string | number;
  icon: string;
}> = ({ title, icon }) => (
  <Tooltip title={String(title)} position="bottom">
    <motion.div
      className="flex items-center justify-center w-12 h-12 text-2xl font-medium text-gray-700 rounded-full select-none bg-gray-200/40"
      whileHover={{
        scale: 1.1,
      }}
    >
      {icon}
    </motion.div>
  </Tooltip>
);

const getPrettyActorInfo = (actor: ActorInfo) => {
  const profilePath = actor.profile_path;
  const backdropPath = actor.cast?.[0]?.backdrop_path;

  const imageUrl = profilePath
    ? `https://image.tmdb.org/t/p/w500${profilePath}`
    : "/no-image.svg";

  const backgroundUrl = backdropPath
    ? `https://image.tmdb.org/t/p/original${backdropPath}`
    : "/no-image.svg";

  const gender = actor.gender === 2 ? "Male" : "Female";

  const departmentAndPlace = [
    actor.known_for_department,
    actor.place_of_birth,
  ].filter((i) => i);

  return {
    imageUrl,
    backgroundUrl,
    gender: {
      title: gender,
      icon: gender === "Male" ? "👨" : "👩",
    },
    departmentAndPlace,
  };
};

export default ActorPage;
