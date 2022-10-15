let layer1opened = false;
let layer2opened = false;
let layer3opened = false;
let layer4opened = false;
let layer5opened = false;
//console.log(document.getElementById("layer5content").clientHeight);
function reset() {
  layer1opened = false;
  layer2opened = false;
  layer3opened = false;
  layer4opened = false;
  layer5opened = false;
  document.getElementById("layer2").style.marginTop = "";
  document.getElementById("layer3").style.marginTop = "";
  document.getElementById("layer4").style.marginTop = "";
  document.getElementById("layer5").style.marginTop = "";
  document.getElementById("layer6").style.marginTop = "";
}

function togglelayer1() {
  document.body.style.backgroundColor = "#C35200";
  if (layer1opened) {
    layer1opened = false;
    document.getElementById("layer2").style.marginTop = "";
  } else {
    layer1opened = true;
    document.getElementById("layer2").style.marginTop = "-120vw";
  }
}
console.log(document.getElementById("schedule").clientHeight);
function togglelayer2() {
  document.body.style.backgroundColor = "#C35200";
  if (layer2opened) {
    layer2opened = false;
    document.getElementById("layer3").style.marginTop = "";
  } else {
    layer2opened = true;
    document.getElementById("layer3").style.marginTop =
      document.getElementById("schedule").clientHeight + "px";
  }
}
function togglelayer3() {
  document.body.style.backgroundColor = "#972800";
  if (layer3opened) {
    layer3opened = false;
    document.getElementById("layer4").style.marginTop = "";
  } else {
    layer3opened = true;
    document.getElementById("layer4").style.marginTop = "-55vw";
  }
}
function togglelayer4() {
  document.body.style.backgroundColor = "#6F1C0A";
  if (layer4opened) {
    layer4opened = false;
    document.getElementById("layer5").style.marginTop = "";
  } else {
    layer4opened = true;
    document.getElementById("layer5").style.marginTop = "-70vw";
  }
}
function togglelayer5() {
  document.body.style.backgroundColor = "#4A1001";
  if (layer5opened) {
    layer5opened = false;
    document.getElementById("layer6").style.marginTop = "";
  } else {
    layer5opened = true;
    document.getElementById("layer6").style.marginTop =
      document.getElementById("layer5content").clientHeight + "px";
  }
}

function tooltip(id, content) {
  tippy(id, { content, placement: "top", allowHTML: true, interactive: true });
}

tooltip(
  "#checkIn",
  "Make sure to bring your ID, QR code found on the registration website, and your unused COVID test!"
);
tooltip(
  "#openingCeremony",
  "We’ll be introducing the team, challenges, prizes, and going over event logistics (like how to get free boba)."
);
tooltip("#hackingStarts", "Hackers, start your development environments!");
tooltip(
  "#introHackathons",
  "Are you new to hackathons and not sure where to start? MLH is hosting an Intro to Hackathons and Ideation workshop, no previous knowledge required! MLH will talk hackathon details, coming up with ideas, and how to have fun at HackTX!"
);
tooltip(
  "#introRobotics",
  "UT Student Organization Eclair is hosting a Robotics and AI workshop! Eclair will be discussing AI concepts such as Neural Networks and Reinforcement learning. This workshop requires some previous experience with AI/ML."
);
tooltip(
  "#saturdayLunch",
  "*collective roar of tummies rumbling* Lunch will be served in the GDC Courtyard — please come when your group is called, and have your HackTX 2022 app QR code ready to go!"
);
tooltip(
  "#introGit",
  "Qvest.US will be hosting an introductory Git workshop, no experience required! Qvest.US can tell you about Git’s importance in consulting, as well as in any other software work! Come learn the basics of version control to aid yourself and your team in keeping your code organized. Afterwards, Freetail Hackers will be hosting an Intro to Web Dev workshop, highlighting the basics of CSS, HTML, and Javascript! No prior knowledge is needed for this workshop."
);
tooltip(
  "#introReact",
  "Not your first web-dev rodeo? Come to our React.js workshop! React.js is a Javascript library which makes user-interfaces and front-end applications much easier. Some javascript experience is expected for this workshop."
);
tooltip(
  "#introML",
  "Come learn the basics of AI/ML with MLDS! MLDS will talk about Python programming basics, and then teach you how to use Python for Machine Learning with tools like pytorch and tensorflow. These tools make Neural Nets a breeze!"
);
tooltip(
  "#johnDeere",
  "John Deere is hosting a talk about their company! Come learn how technology is innovating the agricultural industry and how John Deere is driving change!"
);
tooltip(
  "#arriveLogistics",
  "Come to the talk by Arrive Logistics to discover how innovation can improve the delivery process, and expand the abilities of clientele!"
);
tooltip(
  "#sponsorExpo",
  "If you’re looking for an internship or a cool new technology to use this weekend, come meet our sponsors!"
);
tooltip(
  "#ctf",
  "If you’re feeling energetic, come join ISSS in a game of capture the flag!"
);
tooltip(
  "#dinner",
  "Come grab some dinner when your group is called, and make sure you have your QR code ready to show the servers!"
);
tooltip(
  "#mlhSnyk",
  "Don’t leave vulnerabilities in your code, learn Snyk with MLH! Snyk is a developer security platform offering features to secure your code."
);
tooltip(
  "#gameNight",
  "Take a break from the coding grind and play some games with the HackTX organizers!"
);
tooltip(
  "#googleCloud",
  "Google is hosting an introductory workshop to their Google Cloud platform! Google cloud can bring you higher computing power and storage security. This workshop is intended for beginner/intermediate level coders."
);
tooltip(
  "#meetGreet",
  "Interested in joining the HackTX organizing team next year, running a hackathon at your own school, or just want to say hi? Swing by GDC 6.302!"
);
tooltip(
  "#winnersPanel",
  "Learn what makes up a winning hackathon project from this panel of previous hackathon winners."
);
tooltip(
  "#funTBD",
  "Your eyes must be so tired from staring at that blue screen all day. Please, join us for a “fun activity”."
);
tooltip(
  "#organizerMeetup",
  "Organizers from across TX and the world, unite! If you run a hackathon or want to start one at your school, come find us in GDC 6.302."
);
tooltip(
  "#officeHours",
  "Draft submissions are due in an hour! But don’t panic, we’ll guide you through the process of making an account and a draft submission."
);
tooltip(
  "#submissionDeadline",
  "Submit your draft projects! This can be a rick roll video and an empty description — you can edit everything up until the final deadline at 11am on Sunday. We’ll use this for our judging logistics."
);
tooltip(
  "#quietHours",
  "Ssshhhhh some of us are sleeping, it’s time to put away the MX Blue switches and subs. Shray (our corporate director) will be singing a lullaby at the help desk for those interested."
);
tooltip(
  "#midnightSnack",
  "You deserve a reward for submitting your draft project on time (yes, we will be checking)."
);
tooltip(
  "#sunriseParty",
  "Sense of impending doom with judging coming so soon? Relax to a gentle sunrise (before the sun turns into the classic TX death ray in a couple hours)"
);
tooltip(
  "#breakfast",
  "You know the drill by now, come when your group is called and have your QR code ready to show the servers. If you’re even awake."
);
tooltip(
  "#introPitching",
  "So you have a project idea. What’s next? Learn how to pitch your project or idea in Convergent’s “How to Pitch” workshop! This workshop requires no prior experience."
);
tooltip(
  "#hackingEnds",
  "The checkered flag falls and the crowd goes wild! Hands off your keyboard, hacking is done — it’s time to eat lunch, work on your pitch, and celebrate how much you learned."
);
tooltip(
  "#sundayLunch",
  "Lunch will be provided before judging in the GDC Courtyard — come when your group is called, and have your app QR code ready to go. This is a great opportunity to meet other hackers and ask them about what they built!"
);
tooltip(
  "#judging",
  "We’ll be moving from the GDC to the WCP — follow the signs, organizers, and crowd! You’ll present to a handful of judges science-fair style."
);
tooltip(
  "#closingCeremony",
  "To close off the weekend, we’ll be celebrating everyone’s achievement, giving out prizes, and having a special guest speaker."
);
