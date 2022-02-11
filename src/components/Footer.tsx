export const Footer: React.FC = () => (
  <footer
    className="mt-24 text-white bg-center bg-cover"
    style={{
      backgroundImage: "url('/footer-background.svg')",
    }}
  >
    <div className="container px-6 py-32 mx-auto md:px-0">
      <ul className="grid gap-10 md:gap-16 md:grid-cols-5">
        <li className="p-8 space-y-4 rounded-md md:col-span-2 bg-white/10 backdrop-blur-xl">
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
        </li>

        <li className="p-8 space-y-4 rounded-md bg-white/10 backdrop-blur-sm">
          <Title>Follow Me</Title>

          <ul className="flex flex-col items-start opacity-50">
            <a
              rel="noreferrer"
              target="_blank"
              href="https://github.com/eggsy"
              className="hover:underline"
            >
              <li>GitHub</li>
            </a>

            <a
              rel="noreferrer"
              target="_blank"
              href="https://twitter.com/eggsydev"
              className="hover:underline"
            >
              <li>Twitter</li>
            </a>

            <a
              rel="noreferrer"
              className="hover:underline"
              target="_blank"
              href="https://eggsy.xyz"
            >
              <li>Website</li>
            </a>
          </ul>
        </li>
      </ul>
    </div>
  </footer>
);

const Title: React.FC = ({ children }) => (
  <span className="text-xl font-semibold">{children}</span>
);

export default Footer;
