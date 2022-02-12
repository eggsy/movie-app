/* 😻 github copilot */
export const getGenreEmoji = (genre: string): string => {
  switch (genre) {
    case "Action":
      return "🗡️";
    case "Action & Adventure":
      return "🗡️";

    case "Adventure":
      return "🗺️";
    case "Animation":
      return "🎭";

    case "Adult":
      return "🔞";

    case "Sci-Fi":
      return "🔬";
    case "Sci-Fi & Fantasy":
      return "🔬";

    case "Comedy":
      return "🤣";
    case "Drama":
      return "🎬";
    case "Fantasy":
      return "🧙‍♂️";
    case "Historical":
      return "🏛️";
    case "Horror":
      return "🧙‍♀️";
    case "Mystery":
      return "🕵️‍♀️";
    case "Romance":
      return "💑";
    case "Science Fiction":
      return "🧑‍🦯";
    case "Thriller":
      return "🧙‍♂️";
    case "Western":
      return "🗡️";
    default:
      return "🤷‍♂️";
  }
};

export default getGenreEmoji;
