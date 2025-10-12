import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Fallback data in case Supabase is unavailable
type PathItem = { role: string; description: string };

const pathData: PathItem[] = [
  {
    role: "The Mentor",
    description:
      "Mentors guide participants by sharing expertise, offering technical insights, and giving constructive feedback. They help refine ideas, resolve challenges, and keep teams focused within limited timeframes. Mentors also foster collaboration, encourage creative problem-solving, and promote critical thinking to enrich the overall learning experience.",
  },
  {
    role: "The Hacker",
    description:
      "Hackers are innovative problem-solvers who design, code, and prototype solutions under time pressure. They collaborate in teams, experiment with new technologies, and transform ideas into functional projects, showcasing creativity, technical skills, and adaptability in a fast-paced, competitive environment. ",
  },
  {
    role: "The Volunteer",
    description:
      "Volunteers support event operations by assisting with logistics such as  checkins, materials, scheduling, and participant guidance, helping ensure the event runs smoothly. They help to maintain an organized and welcoming environment for all attendees.",
  },
  {
    role: "The Sponsor",
    description:
      "Sponsors support the hackathon by providing financial, technical, or in-kind resources that enable the event’s success. They help foster innovation, gain visibility, and engage with participants through branding, mentorship, or product integration opportunities.",
  },
  {
    role: "The Organizer",
    description:
      "Organizers oversee the planning and execution of the hackathon by coordinating logistics, securing resources, and managing communications with participants, mentors, judges, and sponsors. They ensure the event runs efficiently while fostering an inclusive, collaborative, and innovative environment for all attendees.",
  },
];

const tarotImages: string[] = [
  "/images/Saturn_Tarot.png",
  "/images/Star_Tarot.png",
  "/images/Galaxy_Tarot.png",
  "/images/Sun_Tarot.png",
  "/images/Moon_Tarot.png",
];

function PathCard({ role, description, index }: { role: string; description: string; index: number }) {
  const [flipped, setFlipped] = useState<boolean>(false);

  const wrapperStyle: React.CSSProperties = {
    perspective: 2000, // gives depth for 3D flip
  };

  const cardStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    position: "relative",
    transformStyle: "preserve-3d",
    transition: "transform 500ms",
    transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
    cursor: "pointer",
  };

  const faceStyle: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    width: "90%",
    height: "66%",
    objectFit: "cover",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const backFaceStyle: React.CSSProperties = {
    ...faceStyle,
    transform: "translate(-50%, -50%) rotateY(180deg)", // Combine both transforms
  };

  const overlayStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start", // Changed from "center" to "flex-start"
    alignItems: "center",
    padding: 16,
    paddingTop: 32, // Add more padding at the top
    color: "white",
    textAlign: "center" as const,
    textShadow: "0 2px 6px rgba(0,0,0,0.8)",
  };

  return (
    <div
      style={wrapperStyle}
      className="w-[302px] h-[585px] transition-transform duration-300 hover:scale-[1.1] hover:-translate-y-6 hover:z-10 relative self-center"
    >
      <div style={cardStyle} onClick={() => setFlipped((s) => !s)}>
        <div
          style={{
            ...faceStyle,
            backgroundImage: `url(${tarotImages[index]})`,
          }}
        />
        <div
          style={{
            ...backFaceStyle,
            backgroundImage: `url(/images/Back_Tarot.png)`,
          }}
        >
          <div style={overlayStyle}>
            <div className="font-serif text-2xl mb-15 text-white drop-shadow-[0_1px_1px_rgba(0,0,0,1)] ">
              {role}
            </div>
            <div className="text-xs -mt-8 text-left ml-3 mb-6 ">{description}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Paths() {
  const settings = {
    dots: false,
    slidesToShow: 5,
    infinite: false,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3 } }, // large tablets / small desktops
      {
        breakpoint: 900,
        settings: { slidesToShow: 1 },
      }, // tablets
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      }, // phones
    ],
  };

  return (
    <>
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-center mb-4 text-white tracking-wider max-sm:text-center max-sm:text-xl">
        CHOOSE YOUR PATHS
      </h2>
      <div className="overflow-visible">
        <Slider {...settings}>
          {pathData.map((path, index) => (
            <div key={index} className="flex justify-center">
              <PathCard role={path.role} description={path.description} index={index}></PathCard>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
