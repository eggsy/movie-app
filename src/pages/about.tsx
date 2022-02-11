// Types
import type { NextPage } from "next";

const AboutUs: NextPage = () => (
  <div className="space-y-6">
    <h1 className="text-4xl font-bold text-gray-700">We Are Not Real.</h1>
    <div>
      It is just an open-source website created by{" "}
      <a href="https://eggsy.xyz" target="_blank" rel="noreferrer">
        eggsy
      </a>{" "}
      on Twitch livestream.
    </div>
  </div>
);
export default AboutUs;
