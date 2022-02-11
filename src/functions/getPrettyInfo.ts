export const getPrettyInfo = <T>(data: MovieInfo | SeriesInfo) => {
  const title = (data as SeriesInfo).name || (data as MovieInfo).title;
  const originalTitle =
    (data as SeriesInfo).original_name || (data as MovieInfo).original_title;

  const titleExtra = title !== originalTitle && originalTitle;

  const genres = [...data.genres.map(({ name }) => name)];
  if (data.adult) genres.push("Adult");

  const sortedCompanies = [...data.production_companies].sort((a, b) => {
    if (a.logo_path && !b.logo_path) return -1;
    return 0;
  });

  const posterUrl = `https://image.tmdb.org/t/p/w342${data.poster_path}`;
  const backgroundUrl = `https://image.tmdb.org/t/p/original${data.backdrop_path}`;

  const goodRating = data.vote_average > 5;

  const calculator = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return {
    titleExtra,
    genres,
    posterUrl,
    backgroundUrl,
    sortedCompanies,
    goodRating,
    calculator,
  };
};

export default getPrettyInfo;
