// Icons
import { Github, Twitter, Link } from "../components/Icons";

export const Footer: React.FC = () => (
  <footer className="px-6 mt-24 text-gray-900 bg-center bg-cover shadow-md md:px-0 bg-gray-200/40">
    <div className="mx-auto text-center py-14 md:w-3/12 md:px-0">
      <div className="flex flex-col space-y-8">
        <div className="space-y-4">
          <Title>Movie App</Title>

          <p className="opacity-50">
            All rights are not reserved. This is an open-source project, the
            source is available on GitHub. All content and images belong to{" "}
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              TMDb
            </a>
            .
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            rel="noreferrer"
            target="_blank"
            href="https://github.com/eggsy"
            className="hover:underline"
          >
            <Github className="w-8 h-8 transition-opacity hover:opacity-75" />
          </a>

          <a
            rel="noreferrer"
            target="_blank"
            href="https://twitter.com/eggsydev"
            className="hover:underline"
          >
            <Twitter className="w-8 h-8 transition-opacity hover:opacity-75" />
          </a>

          <a
            rel="noreferrer"
            className="hover:underline"
            target="_blank"
            href="https://eggsy.xyz"
          >
            <Link className="w-8 h-8 transition-opacity hover:opacity-75" />
          </a>
        </div>
      </div>
    </div>
  </footer>
);

const Title: React.FC = ({ children }) => (
  <span className="text-xl font-semibold">{children}</span>
);

export default Footer;
