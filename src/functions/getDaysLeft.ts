export const getDaysLeft = (date: string) => {
  const today = new Date();
  const nextEpisodeDate = new Date(date);

  return Math.ceil(
    (nextEpisodeDate.getTime() - today.getTime()) / (1000 * 3600 * 24)
  );
};

export default getDaysLeft;
