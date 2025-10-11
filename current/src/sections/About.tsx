import React from "react";
import LandingStars from "../components/LandingStars";

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-2 py-1 text-white lg:text-yellow ring-1 ring-white lg:ring-yellow rounded-full max-sm:text-xs">
      {children}
    </span>
  );
}

export default function About() {
  return (
    <section className="relative w-full">
      <LandingStars />

      <div className="mx-auto flex flex-col-reverse lg:flex-row items-center w-full max-w-[1200px] lg:justify-between">
        {/* Left Side */}
        <img
          src="/images/Splash.png"
          alt="HackTX 2025 Logo"
          className="select-none"
          draggable={false}
        />

        {/* Right Side */}
        <div className="mt-24 mb-8 flex flex-col justify-center items-center lg:items-end text-center lg:text-right">
          <div className="flex gap-5 justify-center mb-8">
            <Tag>Oct 18-19</Tag>
            <Tag>Austin, TX</Tag>
            <Tag>24 Hours</Tag>
          </div>

          <img
            src="/images/HackTX25_title.png"
            alt="HackTX 25"
            className="max-h-[263px] select-none"
            draggable={false}
          />

          <div className="text-white mt-0.5">
            <span className="text-xl">
              Priority deadline finished on September 27
              <br />
              Submit applications soon for consideration
            </span>
            <br />
            Want to volunteer, judge, or mentor?{" "}
            <a
              href="https://rodeo.freetailhackers.com/"
              className="underline whitespace-nowrap"
            >
              Apply here
            </a>
            <br />
            Interested in sponsoring us?{" "}
            <a
              href="mailto:corporate@freetailhackers.com"
              className="underline whitespace-nowrap"
            >
              Learn more
            </a>
          </div>
          <a
            href="https://rodeo.freetailhackers.com/"
            target="_blank"
            rel="noopener noreferrer"
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

      <div className="relative">
        {/* HackTX 25 Info Section */}
        <div className="mx-auto w-full max-w-[1200px] mt-20 lg:mt-40">
          {/* Top Section - Logo and Intro Text */}
          <div className="flex flex-col lg:flex-row lg:justify-between gap-8 lg:gap-12 mb-10 lg:mb-14 items-center lg:items-start">
            {/* Left Side - HackTX Logo */}
            <img
              src="/images/HackTX25_title.png"
              alt="HackTX 25"
              className="max-h-[263px] select-none"
              draggable={false}
            />

            {/* Right Side - Intro Paragraphs */}
            <div className="flex flex-col text-white max-w-[600px] lg:mt-12">
              <p className="text-base mb-6">
                With the best and the brightest of hackers from across the
                country coming to Austin, teams work together to find new tech
                solutions to important issues.
              </p>
              <p className="text-base">
                Join us for HackTX 2025, and be part of an innovative tech
                tradition, where we've hosted over 5000+ participants and $100K+
                in prizes across over a decades worth of HackTXs, with much more
                to come this year!
              </p>
            </div>
          </div>

          {/* Bottom Section - Description and Offset Stats */}
          <div className="flex flex-col lg:flex-row lg:justify-between gap-8 lg:gap-12 items-center lg:items-start">
            {/* Left Side - Event Description */}
            <div className="text-white max-w-[450px] text-center lg:text-left">
              <p className="text-2xl">
                HackTX is a 36 hour event where tech enthusiasts can come
                together to create something amazing together!
              </p>
            </div>

            {/* Right Side - Offset Statistics */}
            <div className="relative w-full flex flex-col lg:mt-8 gap-8 lg:gap-0 items-center">
              <div className="text-center lg:self-end mb-0 lg:mb-12">
                <div className="font-serif text-5xl lg:text-6xl text-white">
                  5000+
                </div>
                <div className="text-base text-white">participants</div>
              </div>
              <div className="text-center lg:self-start">
                <div className="font-serif text-5xl lg:text-6xl text-white">
                  $100K+
                </div>
                <div className="text-base text-white">in prizes</div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 w-[1523px] h-[1051px] -z-10">
          <img
            src="/images/About Nebula.png"
            alt="Background"
            draggable={false}
          />
        </div>
      </div>

      {/* Freetail Hackers Section */}
      <div className="mx-auto flex flex-col items-center text-center w-full max-w-[1200px] mt-32 lg:mt-40">
        <p className="text-white text-lg mb-6 lg:mb-8 italic">
          "We do hackathons"
        </p>
        <h2 className="font-serif text-4xl lg:text-7xl text-white mb-6 lg:mb-8 tracking-wider">
          FREETAIL HACKERS
        </h2>
        <p className="text-white text-base max-w-[720px] text-center">
          For over a decade, Freetail Hackers has been hosting the premier UT
          Austin hackathon, HackTX. With a team of over 40 members organizing
          tirelessly across six teams, we always have exceptional events that
          foster creativity, innovation, and collaboration, while pushing the
          boundaries of tech and learning!
        </p>
      </div>
    </section>
  );
}
