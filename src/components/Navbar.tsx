import Image from "next/image";
import Link from "next/link";

// Hooks
import { useRouter } from "next/router";

// Icons
import { Play } from "./Icons";

const links = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/about",
    label: "About Us",
  },
  {
    href: "/search",
    label: "Search",
  },
];

export const Navbar: React.FC = () => {
  const { route } = useRouter();

  return (
    <nav className="space-x-6 bg-white shadow-sm">
      <div className="container flex items-center justify-center mx-auto space-x-6 md:justify-between">
        <div className="flex items-center md:space-x-14">
          <Link href="/">
            <a className="flex items-center py-5 space-x-2 md:py-0 text-brand-dark-blue">
              <div>
                <Play className="w-6 h-6" />
              </div>

              <span className="text-lg font-semibold">Movie App</span>
            </a>
          </Link>

          <ul className="items-center hidden md:flex">
            {links.map((link) => (
              <Link href={link.href} key={link.label}>
                <a>
                  <li
                    className={`h-full p-6 font-medium text-brand-dark-blue transition-colors hover:bg-gray-200 ${
                      route === link.href && "bg-gray-200"
                    }`}
                  >
                    {link.label}
                  </li>
                </a>
              </Link>
            ))}
          </ul>
        </div>

        <ul className="items-center hidden space-x-2 md:flex">
          <li className="flex items-center space-x-4 ">
            <span className="font-medium text-gray-700">Eggsy</span>

            <div className="flex items-center space-x-2">
              <Image
                src="https://github.com/eggsy.png"
                width={32}
                height={32}
                className="rounded-full"
                alt="user avatar"
              />

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="#000000"
                viewBox="0 0 256 256"
              >
                <rect width="256" height="256" fill="none"></rect>
                <polyline
                  points="208 96 128 176 48 96"
                  fill="none"
                  stroke="#000000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="24"
                ></polyline>
              </svg>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
