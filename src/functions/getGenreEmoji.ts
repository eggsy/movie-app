/* π» github copilot */
export const getGenreEmoji = (genre: string): string => {
  switch (genre) {
    case "Action":
      return "π‘οΈ";
    case "Action & Adventure":
      return "π‘οΈ";

    case "Adventure":
      return "πΊοΈ";
    case "Animation":
      return "π­";

    case "Adult":
      return "π";

    case "Sci-Fi":
      return "π¬";
    case "Sci-Fi & Fantasy":
      return "π¬";

    case "Comedy":
      return "π€£";
    case "Drama":
      return "π¬";
    case "Fantasy":
      return "π§ββοΈ";
    case "Historical":
      return "ποΈ";
    case "Horror":
      return "π§ββοΈ";
    case "Mystery":
      return "π΅οΈββοΈ";
    case "Romance":
      return "π";
    case "Science Fiction":
      return "π§βπ¦―";
    case "Thriller":
      return "π§ββοΈ";
    case "Western":
      return "π‘οΈ";
    default:
      return "π€·ββοΈ";
  }
};

export default getGenreEmoji;
