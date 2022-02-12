export const getPrettyInfo = <T>(data: MovieInfo | SeriesInfo) => {
  const title = (data as SeriesInfo).name || (data as MovieInfo).title;
  const originalTitle =
    (data as SeriesInfo).original_name || (data as MovieInfo).original_title;

  const titleExtra = title !== originalTitle && originalTitle;

  // Genres
  const genres = [...data.genres.map(({ name }) => name)];
  if (data.adult) genres.push("Adult");

  // Image
  const posterPath = data.poster_path;
  const backdropPath = data.backdrop_path;

  const posterUrl = posterPath
    ? `https://image.tmdb.org/t/p/w342${posterPath}`
    : "/no-image.svg";

  const backgroundUrl = backdropPath
    ? `https://image.tmdb.org/t/p/original${backdropPath}`
    : "/no-image.svg";

  // Currency calculator
  const calculator = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumSignificantDigits: 3,
  });

  return {
    titleExtra,
    genres,
    posterUrl,
    backgroundUrl,
    calculator,
  };
};

export default getPrettyInfo;
