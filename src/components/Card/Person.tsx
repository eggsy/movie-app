import Link from "next/link";

// Types
import type { Person } from "../../types";

export const PersonCard: React.FC<{ person: Person; personAs?: string }> = ({
  person,
  personAs,
}) => {
  const imageUrl = `https://image.tmdb.org/t/p/w342${person.profile_path}`;

  return (
    <Link href={`/actors/${person.id}`}>
      <a
        className="w-full group relative transition-all transform bg-center bg-no-repeat bg-cover rounded-md md:hover:scale-[102%] h-80"
        style={{
          backgroundImage: `url('${imageUrl}')`,
        }}
      >
        <div className="inset-0 items-center justify-center hidden h-full transition-all rounded-md group-hover:flex bg-black/60">
          <h3
            className={`px-2 text-xl font-medium leading-none text-center
            ${personAs ? "text-white/70" : "text-white"}`}
          >
            {person.name}
            {personAs && <span className="ml-1 text-white">as {personAs}</span>}
          </h3>
        </div>
      </a>
    </Link>
  );
};

export default PersonCard;
