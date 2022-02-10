import { useRouter } from "next/router";

// Types
import type { NextPage } from "next";

// Hooks
import { useInfo } from "../../hooks/useInfo";

const MoviePage: NextPage = () => {
  const { query } = useRouter();
  const id = query.id as string;

  const { data, loading, error } = useInfo<MovieInfo>(id);

  if (loading) return <p>Loading...</p>;
  else if (error) return <p>Error!</p>;
  else if (data) {
    const imageUrl = `https://image.tmdb.org/t/p/w342${data.poster_path}`;
    const titleExtra =
      data.title !== data.original_title && data.original_title;

    const genres = data.genres.map(({ name }) => name);

    return (
      <div className="flex flex-col gap-14 md:flex-row md:items-center">
        <div
          className="flex-shrink-0 w-1/6 overflow-hidden transition-all transform bg-center bg-no-repeat bg-cover rounded-md hover:scale-110 group h-80"
          style={{
            backgroundImage: `url('${imageUrl}')`,
          }}
        />

        <div className="items-start justify-between flex-grow flex-shrink-0 w-4/6 gap-10 md:flex">
          <div className="space-y-4 ">
            <div className="flex flex-col items-start gap-2">
              <h1 className="text-2xl font-bold">
                {data.title} {titleExtra && `(${titleExtra})`}
              </h1>

              <div className="flex flex-wrap space-x-2">
                {genres.map((genre) => (
                  <div
                    key={genre}
                    className="px-2 py-1 text-xs text-gray-700 bg-gray-200 rounded-md"
                  >
                    {genre}
                  </div>
                ))}
              </div>
            </div>

            {data.overview && (
              <div className="text-gray-700 md:w-2/3">{data.overview}</div>
            )}
          </div>

          <div className="flex-shrink-0 space-y-6">
            <div className="flex flex-col space-y-2 text-right text-gray-500">
              <div className="ml-auto font-bold border-b-2 border-gray-200 w-max">
                Release Date
              </div>

              <span className="text-gray-600">
                {new Date(data.release_date).toLocaleDateString()}
              </span>
            </div>

            <div className="flex flex-col space-y-2 text-right text-gray-500">
              <div className="ml-auto font-bold border-b-2 border-gray-200 w-max">
                Revenue/Budget
              </div>

              <span className="text-gray-600">
                {data.revenue}/{data.budget}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  } else return <div>Could not find that movie.</div>;
};

export default MoviePage;
