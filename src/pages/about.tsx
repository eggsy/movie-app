// Types
import type { NextPage } from "next";

const AboutUs: NextPage = () => (
  <>
    <div className="absolute inset-0 shadow-md bg-gradient-to-r from-brand-dark-blue to-brand-blue h-60 -z-10" />

    <div className="space-y-24">
      <div className="py-6">
        <h1 className="text-4xl font-semibold text-center text-white md:text-left">
          About Us
        </h1>
      </div>

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
    </div>
  </>
);
export default AboutUs;
