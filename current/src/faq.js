function createFAQItem(question, answer) {
  let sanitizedQuestion = question.replaceAll(" ", "-").replaceAll("'", "-");
  return `
    <div class="faq-item">
        <a onclick="togglefaq('${sanitizedQuestion}')" id="${
    sanitizedQuestion + "q"
  }"class="faq-question">
          <img id="${
            sanitizedQuestion + "i"
          }" class="faq-dot" src="assets/img/Dropdown_icon.svg">
          ${question}
        </a>
      <div id="${
        sanitizedQuestion + "a"
      }"class="faq-answer"style="max-height: 0px">${answer}</div>
    </div>
  `;
}

function populatefaq() {
  const faqColLeft = document.getElementById("faq-col-left");
  const faqColRight = document.getElementById("faq-col-right");

  const faqDataLeft = [
    {
      q: "What is HackTX?",
      a: "HackTX is the annual hackathon hosted by Freetail Hackers! HackTX 2024 aims to promote novel ideas, creations, and conversations centered around fast-paced innovation and artificial intelligence.<br><br>This hackathon serves to provide an electric environment where the creators of tomorrow can collaborate to learn, create change, and, above all, have fun creating something new! No prior experience is required and all majors are welcome!",
    },
    {
      q: "When is HackTX?",
      a: "HackTX 2024 starts on November 2nd, 2024 and ends on November 3rd, 2024.",
    },
    {
      q: "Where is HackTX 2024?",
      a: "HackTX 2024 will take place on the University of Texas at Austin campus! Hacking, judging, mini-events, and more will occur fully in-person!",
    },
    {
      q: "When is the application due?",
      a: "Applications will open on September 2nd and close on October 2nd at 11:59PM CDT. However, please apply early since we will be releasing decisions in waves!",
    },
    {
      q: "What's the schedule?",
      a: "We'll release a more detailed schedule in the coming weeks, but our event will start roughly around 9am on Saturday, November 2nd and end around 8pm on March 23rd.",
    },
    {
      q: "How do teams work?",
      a: "Teams can be up to 4 members. If you don't have a team, don't worry! Joining a team of new friends is the best part of a hackathon. We will have team matching available for everyone on the day of the event, but if you would like to create a team beforehand, that works too!",
    },
    {
      q: "Any rules?",
      a: "All work must be done at the event. You can't demo something you didn't build. Don't talk about Fight Club. All attendees (hackers, supporters, mentors, volunteers, etc.) must abide by the MLH Code of Conduct.",
    },
    {
      q: "How do I volunteer?",
      a: "We are always looking for mentors to answer student questions or workshop suggestions, as well as general volunteers to help run our event. If you want to help out at our event, apply at this link! If you are looking to help outside of volunteering and mentoring shoot us an email at hello@freetailhackers.com.",
    },
  ];

  const faqDataRight = [
    {
      q: "What can I do if I missed the application deadline or got rejected?",
      a: "We will have walk-in registration on Saturday, November 2nd. The specific closing time for walk-in registration will be announced on our website during the event week, so be on the lookout! This is first come, first serve until we hit capacity. Admission to the event is not guaranteed so we advise non-Austin attendees to not travel for walk-in registration.",
    },
    {
      q: "Will there be prizes?",
      a: "Yes! We will have prizes for our challenges as well as smaller activities and mini-events! Specific details will be revealed at the opening ceremony!",
    },
    {
      q: "How much money will this cost me?",
      a: "Zero. Zip. Zilch. Nada. Nothing. Gratis. It's free! Freetail Hackers provides students with Wi-Fi, meals, swag, workspace, and prizes for all of our events!",
    },
    {
      q: "Do y'all give travel reimbursements?",
      a: "Unfortunately, we will not be able to provide travel reimbursements this year. We encourage you to look at low-cost transportation methods if you are coming from Texas such as Amtrak, Flixbus, and Redcoach.",
    },
    {
      q: "What should I bring?",
      a: "Yourself, your valid university ID, a form of ID proving you are over 18 years old, a laptop, chargers, or anything else you might need within the 24 hours.<br><br>Firearms, weapons, alcohol, illegal drugs, and power tools are not allowed. Smiles and high-fives are welcome :)",
    },
  ];

  faqDataLeft.forEach((event) => {
    faqColLeft.innerHTML += createFAQItem(event.q, event.a);
  });
  faqDataRight.forEach((event) => {
    faqColRight.innerHTML += createFAQItem(event.q, event.a);
  });
}

export function togglefaq(q) {
  let dot = document.getElementById(q.replaceAll(" ", "-") + "i");

  if (dot.classList.contains("faq-dot-active"))
    dot.classList.remove("faq-dot-active");
  else dot.classList.add("faq-dot-active");

  let question = document.getElementById(q.replaceAll(" ", "-") + "q");

  if (question.classList.contains("faq-glow"))
    question.classList.remove("faq-glow");
  else question.classList.add("faq-glow");

  let answer = document.getElementById(q.replaceAll(" ", "-") + "a");

  if (answer.style.maxHeight == "0px")
    answer.style.maxHeight = answer.scrollHeight + "px";
  else answer.style.maxHeight = "0px";
}

populatefaq();
