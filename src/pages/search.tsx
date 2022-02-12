import { useDebounce } from "use-debounce";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

// Types
import type { NextPage } from "next";
import type { Person, Result } from "../types/tmdb-api";

interface IResponseType {
  movies: Result[];
  series: Result[];
  people: Person[];
}

// Components
import Heading from "../components/Heading";
import MovieCard from "../components/Card/Movie";
import PersonCard from "../components/Card/Person";
import Loader from "../components/Card/Loader";
import Select from "../components/Select";

const SearchPage: NextPage = () => {
  const { query } = useRouter();

  const [alreadyDid, setDid] = useState(false);

  const [searchValue, setValue] = useState("");
  const [debouncedSearch] = useDebounce(searchValue, 500);

  const [sortValue, setSort] = useState("Popularity");

  const [data, setData] = useState<IResponseType>();
  const [loading, setLoading] = useState(false);

  // There has to be a better way for this, right?
  if (alreadyDid === false && query.q) {
    setValue(query.q as string);
    setDid(true);
  }

  useEffect(() => {
    if (!debouncedSearch) return;

    window.history.pushState("", "", `/search?q=${debouncedSearch}`);
    setLoading(true);

    fetch(`/api/search?query=${debouncedSearch}`)
      .then((res) => res.json())
      .then((res: IResponseType) => {
        setData(res);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [debouncedSearch]);

  const getSortedValues = useMemo(() => {
    if (!data)
      return {
        movies: [],
        series: [],
        people: [],
      };

    const { movies, series, people } = data;

    const sortContentFunc = (a: Result, b: Result) => {
      if (sortValue === "Name") {
        return a?.title?.localeCompare(b?.title || "") || 0;
      } else if (sortValue === "Rating") {
        return b?.vote_average - a?.vote_average || 0;
      } else if (sortValue === "Popularity") {
        return b?.popularity - a?.popularity || 0;
      }

      return 0;
    };

    const sortedMovies = [...movies].sort(sortContentFunc);
    const sortedSeries = [...series].sort(sortContentFunc);

    const sortPeopleFunc = (a: Person, b: Person) => {
      if (sortValue === "Name") {
        return a?.name?.localeCompare(b?.name || "") || 0;
      } else if (["Popularity", "Rating"].includes(sortValue)) {
        return b?.popularity - a?.popularity || 0;
      }

      return 0;
    };

    const sortedActors = [...people].sort(sortPeopleFunc);

    return {
      movies: sortedMovies,
      series: sortedSeries,
      people: sortedActors,
      noResults:
        !sortedMovies.length && !sortedSeries.length && !sortedActors.length,
    };
  }, [data, sortValue]);

  return (
    <div className="space-y-24">
      <div className="space-y-4">
        <h1 className="text-4xl font-semibold text-gray-800">Search</h1>

        <div className="grid w-full gap-14 md:grid-cols-2">
          <SearchInput value={searchValue} setValue={setValue} />

          <div className="flex items-center justify-end w-full space-x-2">
            <label htmlFor="sort" className="text-gray-400">
              Sort
            </label>

            <div className="w-2/6">
              <Select
                placeholder="Select an option"
                value={sortValue}
                options={["Popularity", "Name", "Rating"]}
                updateValue={setSort}
              />
            </div>
          </div>
        </div>
      </div>

      {!loading && getSortedValues.noResults && (
        <div>Nothing found with that query.</div>
      )}

      {loading ? (
        new Array(3).fill(0).map((_, i) => (
          <div key={i} className="space-y-6">
            <div className="w-1/6 h-8 bg-gray-200 rounded-md animate-pulse" />

            <div className="grid grid-cols-2 gap-4 md:grid-cols-6">
              <Loader count={6} />
            </div>
          </div>
        ))
      ) : (
        <div className="space-y-24">
          {!!getSortedValues.movies.length && (
            <Item title="Movies" length={getSortedValues.movies.length}>
              {getSortedValues.movies.map((item) => (
                <MovieCard key={item.id} movie={item} />
              ))}
            </Item>
          )}

          {!!getSortedValues.series.length && (
            <Item title="Series" length={getSortedValues.series.length}>
              {getSortedValues.series.map((item) => (
                <MovieCard key={item.id} movie={item} type="tv" />
              ))}
            </Item>
          )}

          {!!getSortedValues.people.length && (
            <Item title="Actors" length={getSortedValues.people.length}>
              {getSortedValues.people.map((item) => (
                <PersonCard key={item.id} person={item} />
              ))}
            </Item>
          )}
        </div>
      )}
    </div>
  );
};

export const SearchInput: React.FC<{
  value?: string;
  setValue?: (val: string) => void;
}> = ({ value, setValue }) => {
  const { push } = useRouter();

  const props = {
    placeholder: "Search for movies, series or actors...",
    className:
      "w-full px-6 py-2 transition-colors rounded-md outline-none appearance-none placeholder-current bg-gray-200/40 truncate focus:bg-gray-200/50 hover:bg-gray-200/40",
  };

  if (!setValue)
    return (
      <input
        onKeyDown={(e) => {
          const target = e.target as HTMLInputElement;

          if (e.key === "Enter") {
            push(`/search?q=${target.value}`);
          }
        }}
        {...props}
      />
    );

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      {...props}
    />
  );
};

const Item: React.FC<{ title: string; length: number }> = ({
  title,
  length,
  children,
}) => (
  <section className="space-y-6">
    <Heading>
      {title} <span className="text-sm opacity-50">({length})</span>
    </Heading>

    <div className="grid grid-cols-2 gap-4 md:grid-cols-6">{children}</div>
  </section>
);

export default SearchPage;
