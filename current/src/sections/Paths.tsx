import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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
    maxWidth: 271,
    height: "100%",
    maxHeight: 390,
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
    width: "100%",
    height: "100%",
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
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 16,
    paddingTop: 32,
    color: "white",
    textAlign: "center" as const,
    textShadow: "0 2px 6px rgba(0,0,0,0.8)",
  };

  return (
    <div
      style={wrapperStyle}
      className="w-full max-w-[330px] h-[585px] transition-transform duration-300 hover:scale-[1.1] hover:-translate-y-6 hover:z-10 relative mx-auto flex items-center justify-center"
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
            <div className="font-serif text-2xl mb-15 text-white drop-shadow-[0_1px_1px_rgba(0,0,0,1)]">
              {role}
            </div>
            <div className="text-xs -mt-8 text-left ml-3 mb-6">{description}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Paths() {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      partialVisibilityGutter: 60,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center" id="Paths">
      <div className="mx-auto w-full max-w-[1200px] px-4 ">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-center mb-4 text-white tracking-wider max-sm:text-center max-sm:text-xl">
          CHOOSE YOUR PATHS
        </h2>

        <Carousel
          swipeable={true}
          draggable={true}
          responsive={responsive}
          ssr
          showDots={false}
          infinite={false}
          arrows={false}
          partialVisbile={true}
          containerClass="carousel-container"
        >
          {pathData.map((path, index) => {
            return (
              <div key={index} className="px-2">
                <PathCard role={path.role} description={path.description} index={index} />
              </div>
            );
          })}
        </Carousel>
      </div>
    </section>
  );
}
