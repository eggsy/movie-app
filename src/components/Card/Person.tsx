// Types
import type { Person } from "../../types";

export const PersonCard: React.FC<{ person: Person }> = ({ person }) => {
  const imageUrl = `https://image.tmdb.org/t/p/w342${person.profile_path}`;

  return (
    <div
      className="w-full overflow-hidden bg-center bg-no-repeat bg-cover rounded-md h-80"
      style={{
        backgroundImage: `url('${imageUrl}')`,
      }}
    ></div>
  );
};

export default PersonCard;
