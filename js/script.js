const SUNDAY_BUTTON = document.getElementById("sunday-button");
const SATURDAY_BUTTON = document.getElementById("saturday-button");
const SUNDAY_SCHEDULE = document.getElementById("sunday-schedule");
const SATURDAY_SCHEDULE = document.getElementById("saturday-schedule");

const makeSaturdayScheduleActive = () => {
  console.log("Making saturday active");
  SUNDAY_BUTTON.classList.remove("active");
  SUNDAY_SCHEDULE.classList.remove("active");
  SATURDAY_BUTTON.classList.add("active");
  SATURDAY_SCHEDULE.classList.add("active");
};

const makeSundayScheduleActive = () => {
  console.log("Making sunday active");
  SUNDAY_BUTTON.classList.add("active");
  SUNDAY_SCHEDULE.classList.add("active");
  SATURDAY_BUTTON.classList.remove("active");
  SATURDAY_SCHEDULE.classList.remove("active");
};

SUNDAY_BUTTON.onclick = makeSundayScheduleActive;
SATURDAY_BUTTON.onclick = makeSaturdayScheduleActive;

var sunRef = document.getElementById("Sun");
var scrollpercentOriginal = 0;
function getScrollPercent() {
  var h = document.documentElement,
    b = document.body,
    st = "scrollTop",
    sh = "scrollHeight";
  return ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
}

window.addEventListener("scroll", () => {
  scrollPercent = getScrollPercent();

  console.log(scrollPercent);
  scrollpercentOriginal = scrollPercent;

  if (window.innerWidth > 800) {
    if (scrollPercent < 10) {
      sunRef.style.top = scrollPercent * 3 + "vw";
    } else if (scrollPercent < 16) {
      sunRef.style.top = scrollPercent * 4 + "vw";
    } else if (scrollPercent < 20) {
      sunRef.style.top = scrollPercent * 5 + "vw";
    } else if (scrollPercent < 30) {
      sunRef.style.top = scrollPercent * 5 + "vw";
    } else {
      sunRef.style.top = scrollPercent * 4.3 + "vw";
    }
  } else {
    sunRef.style.left = "30vw";
    if (scrollPercent < 10) {
      sunRef.style.top = scrollPercent * 5 + "vw";
    } else if (scrollPercent < 16) {
      sunRef.style.top = scrollPercent * 6 + "vw";
    } else {
      sunRef.style.top = scrollPercent * 4.3 + "vw";
    }
  }
});
