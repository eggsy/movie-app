import Link from "next/link";
import { motion } from "framer-motion";

// Types
import type { Person } from "../../types/tmdb-api";

export const PersonCard: React.FC<{ person: Person; personAs?: string }> = ({
  person,
  personAs,
}) => {
  const profilePath = person.profile_path;
  const imageUrl = profilePath
    ? `https://image.tmdb.org/t/p/w342${person.profile_path}`
    : "/no-image-person.svg";

  return (
    <Link href={`/actors/${person.id}`}>
      <a
        className="w-full relative transition-transform transform bg-center bg-no-repeat bg-cover rounded-md md:hover:scale-[102%] h-80"
        style={{
          backgroundImage: `url('${imageUrl}')`,
        }}
      >
        <motion.div
          initial={{
            opacity: 0,
          }}
          whileHover={{
            opacity: 1,
          }}
          className="inset-0 flex items-center justify-center h-full rounded-md bg-black/60"
        >
          <h3
            className={`px-2 text-xl font-medium leading-tight text-center
            ${personAs ? "text-white/70" : "text-white"}`}
          >
            {person.name}
            {personAs && <span className="ml-1 text-white">as {personAs}</span>}
          </h3>
        </motion.div>
      </a>
    </Link>
  );
};

export default PersonCard;
