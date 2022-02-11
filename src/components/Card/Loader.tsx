export const Loader: React.FC<{
  count?: number;
  type?: "card" | "card-large";
}> = ({ count = 1, type = "card" }) => {
  const SelectedCard = type === "card-large" ? CardLarge : Card;

  if (count === 1) return <SelectedCard />;
  return (
    <>
      {Array(count)
        .fill(null)
        .map((_, idx) => (
          <SelectedCard key={idx} />
        ))}
    </>
  );
};

export const Card: React.FC = () => (
  <div className="w-full bg-gray-200 rounded-md animate-pulse h-80" />
);

export const CardLarge: React.FC = () => (
  <div className="w-full bg-gray-200 rounded-md animate-pulse h-80" />
);

export default Loader;
