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

function Divider() {
  return <div className="h-full w-[2px] bg-white mx-4" />;
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
        <div className="flex-basis-0">
          <div className="font-bold">{time}</div>
        </div>
        <Divider />
        <div className="flex flex-col">
          <div className="event chillax-normal-white-large">{name}</div>
          <div className="text-gray-400">{location}</div>
        </div>
        <img src="/vectors/star2.svg" alt="" className="ml-auto self-start" />
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

  const removeFilter = (category: string) => {
    setFilter((prev) => {
      const newSet = new Set(prev);
      newSet.delete(category);
      return newSet;
    });
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
      if (newSet.has(category)) 
        newSet.delete(category);
      else 
        newSet.add(category);
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
      setSchedule(data);
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
      className="w-full max-w-4xl mx-auto my-16 text-white"
      id="schedule"
    >
      <h2 className="text-5xl font-bold font-serif mb-8 text-center uppercase">
        What's your future like?
      </h2>
      <div className="flex gap-6 items-center justify-center my-4">
        {/* filter buttons */}
        {categories.map((category) => (
          <button
            key={category}
            className="px-4 py-2 border border-white rounded-full w-fit"
            onClick={() => toggleFilter(category)}
          >
            {category} {containsFilter(category) ? "✓" : ""}
          </button>
        ))}
      </div>

      <div className="flex gap-10">
        {Object.keys(days).map((day) => (
          <div className="flex flex-col" key={day}>
            <div className="font-serif text-2xl">{day}</div>
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
