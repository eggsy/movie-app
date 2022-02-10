export const Loader: React.FC<{ count?: number }> = ({ count = 1 }) => {
  if (count === 1) return <Card />;

  return (
    <>
      {Array(count)
        .fill(null)
        .map((_, idx) => (
          <Card key={idx} />
        ))}
    </>
  );
};

const Card: React.FC = () => (
  <div className="w-full bg-gray-200 rounded-md animate-pulse h-80" />
);

export default Loader;
