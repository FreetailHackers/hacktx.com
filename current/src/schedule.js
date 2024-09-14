// Returns HTML for a schedule Item
function createScheduleItem(time, event, location, notes, category, image) {
  return `
        <div class="schedule-item" data-category="${category}">
            <div class="item-info">
                <div class="time">${time}</div>
                <div class="chillax-normal-white-20px">${location}</div>
            </div>
            <div class="scheduleDivider"></div>
            <div class="event-info">
                <div class="event chillax-normal-white-large">${event}</div>
                <p class="event-description">${notes}</p>
            </div>
            <img src=${image} alt="star.img" class="event-image">
        </div>
    `;
}

// Populates the schedule with schedule items
function populateSchedule() {
  const saturdaySchedule = document.getElementById("saturday-events");
  const sundaySchedule = document.getElementById("sunday-events");

  // TODO: ADD EVENTS HERE //
  const saturdayEvents = [
    {
      time: "8:00 AM",
      event: "Check-In",
      location: "",
      notes: "",
      category: "required",
      image: "assets/img/ns_blue.png",
    },
    {
      time: "10:00 AM",
      event: "Opening Ceremony",
      location: "",
      notes: "",
      category: "required",
      image: "assets/img/ns_blue.png",
    },
    {
      time: "11:00 AM",
      event: "Hacking Starts",
      location: "",
      notes: "Start your engines!",
      category: "required",
      image: "assets/img/ns_blue.png",
    },
    {
      time: "11:00 AM",
      event: "Team Matching + Ideation Workshop",
      location: "",
      notes:
        "Meet new people, find a team, and start brainstorming projects at this workshop!",
      category: "event",
      image: "assets/img/ns_green.png",
    },
    // {
    //     time: "12:00 PM",
    //     event: "Workshop ???",
    //     location: "",
    //     notes: "TBD",
    //     category: "event",
    //     image: "assets/img/ns_green.png"
    // },
    // {
    //     time: "1:00 PM",
    //     event: "Workshop ???",
    //     location: "",
    //     notes: "TBD",
    //     category: "event",
    //     image: "assets/img/ns_green.png"
    // },
    {
      time: "2:00 PM",
      event: "Lunch",
      location: "",
      notes:
        "Wait until your group is called, and have your hacker ID out to scan!",
      category: "food",
      image: "assets/img/ns_yellow.png",
    },
    // {
    //     time: "3:00 PM",
    //     event: "Workshop ???",
    //     location: "",
    //     notes: "TBD",
    //     category: "event",
    //     image: "assets/img/ns_green.png"
    // },
    // {
    //     time: "4:00 PM",
    //     event: "Workshop ???",
    //     location: "",
    //     notes: "TBD",
    //     category: "event",
    //     image: "assets/img/ns_green.png"
    // },
    // {
    //     time: "5:00 PM",
    //     event: "Workshop ???",
    //     location: "",
    //     notes: "TBD",
    //     category: "event",
    //     image: "assets/img/ns_green.png"
    // },
    {
      time: "6:00 PM",
      event: "Dinner",
      location: "",
      notes:
        "Wait until your group is called, and have your hacker ID out to scan!",
      category: "food",
      image: "assets/img/ns_yellow.png",
    },
    // {
    //     time: "8:00 PM",
    //     event: "!!!",
    //     location: "",
    //     notes: "TBD",
    //     category: "fun",
    //     image: "assets/img/ns_pink.png"
    // },
    // {
    //     time: "9:00 PM",
    //     event: "!!!",
    //     location: "",
    //     notes: "TBD",
    //     category: "fun",
    //     image: "assets/img/ns_pink.png"
    // },
    {
      time: "10:00 PM",
      event: "Cup Stacking",
      location: "",
      notes:
        "A hackathon tradition! Find a team and stack the most cups for a prize!",
      category: "fun",
      image: "assets/img/ns_pink.png",
    },
    {
      time: "12:00 AM",
      event: "Midnight Snack",
      location: "",
      notes: "Enjoy a sweet treat to keep you recharged!",
      category: "food",
      image: "assets/img/ns_yellow.png",
    },
  ];

  const sundayEvents = [
    {
      time: "7:30 AM",
      event: "Sunrise",
      location: "",
      notes: "Watch the sun rise on the big day with us!",
      category: "fun",
      image: "assets/img/ns_pink.png",
    },
    {
      time: "8:00 AM",
      event: "Breakfast",
      location: "",
      notes:
        "Wait until your group is called, and have your hacker ID out to scan!",
      category: "food",
      image: "assets/img/ns_yellow.png",
    },
    {
      time: "11:00 AM",
      event: "Hacking Ends",
      location: "",
      notes: "Submit what you have, and keep an eye out for judging info",
      category: "required",
      image: "assets/img/ns_blue.png",
    },
    {
      time: "11:00 AM",
      event: "Lunch",
      location: "",
      notes:
        "Wait until your group is called, and have your hacker ID out to scan!",
      category: "food",
      image: "assets/img/ns_yellow.png",
    },
    {
      time: "12:00 PM",
      event: "Judging Begins",
      location: "",
      notes:
        "Show up early and set up your project before judges start going around!",
      category: "required",
      image: "assets/img/ns_blue.png",
    },
    {
      time: "3:00 PM",
      event: "Judging Ends",
      location: "",
      notes: "Make your way to pitching!",
      category: "required",
      image: "assets/img/ns_blue.png",
    },
    {
      time: "3:00 PM",
      event: "Pitching Begins",
      location: "",
      notes:
        "If you're pitching, be ready - this is a rapid fire round! 30 seconds to a minute per person",
      category: "event",
      image: "assets/img/ns_green.png",
    },
    {
      time: "4:00 PM",
      event: "Pitching Ends",
      location: "",
      notes: "",
      category: "event",
      image: "assets/img/ns_green.png",
    },
    {
      time: "4:30 PM",
      event: "Closing Ceremony",
      location: "",
      notes: "Awards and prizes!",
      category: "required",
      image: "assets/img/ns_blue.png",
    },
  ];

  saturdayEvents.forEach((event) => {
    saturdaySchedule.innerHTML += createScheduleItem(
      event.time,
      event.event,
      event.location,
      event.notes,
      event.category,
      event.image
    );
  });

  sundayEvents.forEach((event) => {
    sundaySchedule.innerHTML += createScheduleItem(
      event.time,
      event.event,
      event.location,
      event.notes,
      event.category,
      event.image
    );
  });
  setTimeout(function () {
    syncSizes();
  }, 1000);

  // add_glow()
}

function syncSizes() {
  const times = document.getElementsByClassName("item-info");
  let widest = 0;

  for (let e of times) {
    e.style.minWidth = "unset";
    widest = Math.max(widest, e.offsetWidth);
  }

  for (let e of times) {
    e.style.minWidth = [widest] + "px";
  }
}

function add_glow() {
  const allEvents = document.querySelectorAll(".schedule-item");
  allEvents.forEach((event) => {
    const category = event.dataset.category;
    const image = event.querySelector(".event-image");

    if (category === "required") {
      image.classList.add("shadow-blue");
    } else if (category === "event") {
      image.classList.add("shadow-green");
    } else if (category === "food") {
      image.classList.add("shadow-yellow");
    } else if (category === "fun") {
      image.classList.add("shadow-pink");
    }
  });
}

// Filters schedule items by their category
export function filterEvents(category) {
  add_glow();
  const allEvents = document.querySelectorAll(".schedule-item");
  allEvents.forEach((event) => {
    const image = event.querySelector(".event-image");
    if (category === "all" || event.dataset.category === category) {
      event.classList.remove("greyed-out");
    } else {
      image.classList.remove(
        "shadow-blue",
        "shadow-green",
        "shadow-yellow",
        "shadow-pink"
      );
      event.classList.add("greyed-out");
    }
  });

  // Started working on filter buttons changing state
  // prob need a case for each button
  const allFilters = document.querySelectorAll(".schedule-button");
  allFilters.forEach((filter) => {
    if (filter.id === category) {
      filter.style.color = getComputedStyle(document.body).getPropertyValue(
        "--white"
      );
      filter.classList.remove("schedule-button-hover");
      switch (category) {
        case "all":
          filter.style.background = getComputedStyle(
            document.body
          ).getPropertyValue("--white");
          filter.style.color = getComputedStyle(document.body).getPropertyValue(
            "--black"
          );
          break;
        case "required":
          filter.style.background = getComputedStyle(
            document.body
          ).getPropertyValue("--blue");
          break;
        case "event":
          filter.style.background = getComputedStyle(
            document.body
          ).getPropertyValue("--green");
          break;
        case "food":
          filter.style.background = getComputedStyle(
            document.body
          ).getPropertyValue("--yellow");
          break;
        case "fun":
          filter.style.background = getComputedStyle(
            document.body
          ).getPropertyValue("--pink");
          break;
      }
    } else {
      filter.classList.add("schedule-button-hover");
      filter.style.background = "unset";
      switch (filter.id) {
        case "all":
          filter.style.color = getComputedStyle(document.body).getPropertyValue(
            "--white"
          );
          break;
        case "required":
          filter.style.color = getComputedStyle(document.body).getPropertyValue(
            "--blue"
          );
          break;
        case "event":
          filter.style.color = getComputedStyle(document.body).getPropertyValue(
            "--green"
          );
          break;
        case "food":
          filter.style.color = getComputedStyle(document.body).getPropertyValue(
            "--yellow"
          );
          break;
        case "fun":
          filter.style.color = getComputedStyle(document.body).getPropertyValue(
            "--pink"
          );
          break;
      }
    }
  });
}

window.onload = populateSchedule();
window.onload = filterEvents("all");

let windowWidth;
let windowHeight;

onresize = (event) => {
  if (windowWidth == window.innerWidth) return;

  windowWidth = window.innerWidth;
  syncSizes();
};
