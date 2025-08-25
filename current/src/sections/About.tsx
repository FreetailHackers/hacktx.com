import React from "react";
import LandingStars from "../components/LandingStars";

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-2 py-1 text-yellow ring-1 ring-yellow text-blue rounded-full text-sm font-semibold">
      {children}
    </span>
  );
}

export default function About() {
  return (
    <section className="relative w-screen">
      <LandingStars />

      <div className="mx-auto flex flex-row flex-wrap-reverse w-screen max-w-[1200px] justify-between">
        {/* Left Side */}
        <img
          src="/images/Splash.png"
          alt="HackTX 2025 Logo"
          className="select-none"
          draggable={false}
        />

        {/* Right Side */}
        <div className="mt-24 flex flex-col justify-center items-end">
          <div className="flex gap-5 justify-center mb-8">
            <Tag>Mid-October</Tag>
            <Tag>Austin, TX</Tag>
            <Tag>24 Hours</Tag>
          </div>

          <img
            src="/images/HackTX25_title.png"
            alt="HackTX 25"
            className="max-h-[263px] select-none"
            draggable={false}
          />

          <div className="text-right text-base text-white mt-0.5">
            <span className="text-2xl">Applications will open soon!</span>
            <br />
            Interested in sponsoring us?{" "}
            <a
              href="mailto:corporate@freetailhackers.com"
              className="underline"
            >
              Interest Form
            </a>
          </div>

          <a
            href="https://forms.gle/SahZJw8p7s1gb7yEA"
            target="_blank"
            className="group mt-6"
          >
            <img
              src="/vectors/Fancy Button.svg"
              alt="Apply Now"
              className="group-hover:drop-shadow-custom transition-all ease-out"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
