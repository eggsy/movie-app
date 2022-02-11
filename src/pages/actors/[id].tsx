import { useRouter } from "next/router";

// Types
import type { NextPage } from "next";

// Hooks
import { useActor } from "../../hooks/useActor";

// Functions
import getFormattedDate from "../../functions/getFormattedDate";

// Components
import PageLoader from "../../components/Page/Loader";
import MovieCard from "../../components/Card/Movie";

const ActorPage: NextPage = () => {
  const { query } = useRouter();
  const { data, loading, error } = useActor<ActorInfo>(query.id as string);

  if (loading || error) return <PageLoader error={error} />;
  else if (data) {
    const imageUrl = `https://image.tmdb.org/t/p/w500${data.profile_path}`;
    const backgroundUrl = `https://image.tmdb.org/t/p/original${data.cast?.[0]?.backdrop_path}`;
    const gender = data.gender === 2 ? "Male" : "Female";

    const departmentAndPlace = [
      data.known_for_department,
      data.place_of_birth,
    ].filter((i) => i);

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
                className="flex-shrink-0 w-48 bg-center bg-no-repeat bg-cover rounded-md h-72"
                style={{
                  backgroundImage: `url('${imageUrl}')`,
                }}
              />
            </div>

            <div className="flex flex-col items-center gap-6 text-center">
              <div className="flex-col">
                <h1 className="text-4xl font-bold text-gray-800">
                  {data.name}
                </h1>

                {departmentAndPlace.length > 0 && (
                  <p className="truncate opacity-50">
                    {departmentAndPlace.join(", ")}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap justify-center gap-2 mx-auto md:w-2/3">
                  <span className="px-2 py-1 text-sm font-medium text-gray-700 rounded-md select-none bg-gray-300/40">
                    🐣 {getFormattedDate(data.birthday)}
                  </span>

                  {data.deathday && (
                    <span className="px-2 py-1 text-sm font-medium text-gray-700 rounded-md select-none bg-gray-300/40">
                      😢 {getFormattedDate(data.deathday)}
                    </span>
                  )}

                  <span className="px-2 py-1 text-sm font-medium text-gray-700 rounded-md select-none bg-gray-300/40">
                    👩‍❤️‍👨 {gender}
                  </span>

                  <span className="px-2 py-1 text-sm font-medium text-white bg-yellow-600 rounded-md select-none">
                    📈 {data.popularity}
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
              <h1 className="text-4xl font-bold text-gray-800">Biography</h1>

              <div className="text-gray-600">{data.biography}</div>
            </div>

            <div className="flex flex-col items-center gap-4 mx-auto text-center md:w-1/2">
              <h1 className="text-4xl font-bold text-gray-800">
                Also Known As
              </h1>

              <div className="text-gray-600 divide-gray-300">
                {data.also_known_as?.map((name, index) => (
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

              <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3">
                {data.cast?.map((cast, idx) => (
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
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 mx-auto text-center md:w-1/2">
            <h1 className="text-4xl font-bold text-gray-800">Studios</h1>

            <div className="space-y-6 text-gray-600 md:w-1/4"></div>
          </div>
        </div>
      </>
    );
  } else return <div>Could not find that movie.</div>;
};

export default ActorPage;
