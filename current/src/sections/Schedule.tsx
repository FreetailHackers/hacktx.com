import React, { useState, useEffect } from "react";
import { supabase, type Event } from "../lib/supabase";

const fallbackSchedule: Event[] = [
  {
    start: "2024-10-18T09:00:00",
    end: "2024-10-18T10:00:00",
    name: "Check-in & Breakfast",
    description: "Start your day with a hearty breakfast and check-in.",
    location: "Main Hall",
    type: "General",
  },
  {
    start: "2024-10-17T09:00:00",
    end: "2024-10-17T10:00:00",
    name: "Check-in & Breakfast",
    description: "Start your day with a hearty breakfast and check-in.",
    location: "Main Hall",
    type: "General",
  },
];

const categoryNameMap: Record<string, string> = {
  "Key-Event": "Required",
  Workshop: "Event",
  "Regular-Event": "Food",
  "Fun-Event": "Fun!",
};

function getDisplayName(category: string) {
  return categoryNameMap[category] ?? category;
}

const categoryStarMap: Record<string, string> = {
  "Key-Event": "/images/Star 1.png",
  Workshop: "/images/Star 2.png",
  "Regular-Event": "/images/Star 3.png",
  "Fun-Event": "/images/Star 4.png",
};

function getStarForCategory(category: string) {
  return categoryStarMap[category] ?? "/vectors/star-default.svg";
}

function Divider() {
  return <div className="h-full min-h-[50px] w-[2px] bg-white mx-4" />;
}

function ScheduleItem({
  start,
  end,
  name,
  description,
  location,
  category,
  active,
}: {
  start: string;
  end: string;
  name: string;
  description: string;
  location: string;
  category: string;
  active: boolean;
}) {
  const time = new Date(start).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <div
      className={`${active ? "opacity-100" : "opacity-50"}`}
      data-category="${category}"
    >
      <img src="/vectors/event-header.svg" alt="" className="" />
      <div className="flex w-full h-fit px-2">
        <div className="flex-basis-0 min-w-[100px]">
          <div className="font-bold">{time}</div>
        </div>
        <Divider />
        <div className="flex flex-col">
          <div className="event chillax-normal-white-large">{name}</div>
          <div className="text-gray-400">{location}</div>
        </div>
        <img
          src={getStarForCategory(category)}
          alt=""
          className="select-none h-4 ml-auto self-start"
          draggable={false}
        />
      </div>
    </div>
  );
}

export default function Schedule() {
  const [schedule, setSchedule] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  // list of strings
  const [filter, setFilter] = useState<Set<string>>(new Set());

  const addFilter = (category: string) => {
    setFilter((prev) => new Set(prev).add(category));
  };

  const containsFilter = (category: string) => filter.has(category);

  const categories = React.useMemo(() => {
    const cats = new Set<string>();
    schedule.forEach((item) => {
      cats.add(item.type);
    });
    for (const cat of cats) {
      addFilter(cat);
    }
    return Array.from(cats);
  }, [schedule]);

  const toggleFilter = (category: string) => {
    setFilter((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(category)) newSet.delete(category);
      else newSet.add(category);
      return newSet;
    });
  };

  // Group events by weekday name (e.g., "Monday", "Tuesday")
  const days = React.useMemo(() => {
    const grouped: { [key: string]: Event[] } = {};
    schedule.forEach((item) => {
      const weekday = new Date(item.start).toLocaleDateString("en-US", {
        weekday: "long",
      });
      if (!grouped[weekday]) {
        grouped[weekday] = [];
      }
      grouped[weekday].push(item);
    });
    // Sort each weekday's events by start time
    Object.keys(grouped).forEach((weekday) => {
      grouped[weekday].sort(
        (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
      );
    });
    return grouped;
  }, [schedule]);

  const fetchSchedule = async () => {
    const { data, error } = await supabase
      .from("Event  ")
      .select("*")
      .order("start", { ascending: true });

    if (error) {
      console.error("Error fetching schedule:", error);
      setSchedule(fallbackSchedule);
    } else if (data) {
      const formattedData = data.map((event: any) => ({
        ...event,
        start: new Date(event.start).toLocaleDateString("en-US", {
          timeZone: "Etc/GMT+10",
          hour: "2-digit",
          minute: "2-digit",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }),
        end: new Date(event.end).toISOString(),
      }));
      setSchedule(formattedData);
    } else {
      setSchedule(fallbackSchedule);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  if (loading) {
    return <div>Loading schedule...</div>;
  }
  return (
    <section
      className="w-full max-w-4xl mx-auto my-16 text-white overflow-y-visible relative"
      id="schedule"
    >
      <div className="w-[1523px] -z-10 h-[1462px] absolute left-1/2 -translate-x-1/2">
        <img src="/images/Schedule Nebula.png" alt="Schedule Nebula" className="absolute top-0 w-[1523px] h-[1462px] object-cover overflow-visible" />
        <img src="/images/Schedule Stars.png" alt="Schedule Nebula" className="absolute top-0 w-[1354] h-[1838] object-cover overflow-visible left-1/2 -translate-x-1/2" />
      </div>
      <h2 className="text-5xl max-sm:text-3xl font-bold font-serif pt-4 mb-8 text-center uppercase">
        What's in your future?
      </h2>
      <div className="flex flex-wrap md:gap-6 items-center justify-center my-4">
        {/* filter buttons */}
        {categories.map((category) => (
          <button
            key={category}
            id={category}
            className={
              "px-4 py-2 w-fit cursor-pointer text-yellow" +
              (containsFilter(category)
                ? " drop-shadow-[0_0_4px_rgba(232,216,161,1)]"
                : "")
            }
            onClick={() => toggleFilter(category)}
          >
            <img
              src={getStarForCategory(category)}
              alt=""
              className="select-none h-6 ml-auto self-start inline"
              draggable={false}
            />{" "}
            {getDisplayName(category)}
          </button>
        ))}
      </div>

      <div className="flex gap-10 max-md:flex-col">
        {Object.keys(days).map((day) => (
            <div className="flex flex-col gap-4 items-center" key={day}>
            <div className="font-serif text-2xl w-full">{day}</div>
              {days[day].map((item, index) => (
                <ScheduleItem
                  key={index}
                  start={item.start}
                  end={item.end}
                  name={item.name}
                  description={item.description}
                  location={item.location}
                  category={item.type}
                  active={containsFilter(item.type)}
                />
              ))}
            </div>
        ))}
      </div>
    </section>
  );
}
