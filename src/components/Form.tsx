import Link from "next/link";

// Icons
import { Search } from "./Icons";

export const Form: React.FC = () => (
  <section className="flex items-center space-x-8">
    <div className="flex flex-col w-full gap-2 md:w-1/4">
      <label htmlFor="genre" className="text-gray-400">
        Genre
      </label>

      <input id="genre" className="w-full input" placeholder="hello world" />
    </div>

    <div className="flex flex-col w-full gap-2 md:w-1/4">
      <label htmlFor="sort" className="text-gray-400">
        Sort
      </label>

      <select id="sort" className="w-full input">
        <option disabled selected>
          Select an option
        </option>

        <option>Name</option>
        <option>Popularity</option>
        <option>Rating</option>
      </select>
    </div>

    <div className="flex flex-col w-full gap-2 md:w-2/4">
      <label htmlFor="search" className="text-gray-400">
        Search
      </label>

      <div className="relative">
        <input
          id="search"
          className="flex-shrink-0 w-full input"
          placeholder="What are you searching for?"
        />

        <Link href={"/"}>
          <a className="absolute inset-y-0 right-0 flex items-center justify-center h-full px-4 bg-gray-200 rounded-r-md">
            <Search className="flex-shrink-0 w-6 h-6" />
          </a>
        </Link>
      </div>
    </div>
  </section>
);

export default Form;
