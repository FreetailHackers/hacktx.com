/**
 * Schedule
 */

const SUNDAY_BUTTON = document.getElementById("sunday-button");
const SATURDAY_BUTTON = document.getElementById("saturday-button");
const SUNDAY_SCHEDULE = document.getElementById("sunday-schedule");
const SATURDAY_SCHEDULE = document.getElementById("saturday-schedule");

const makeSaturdayScheduleActive = () => {
  SUNDAY_BUTTON.classList.remove("active");
  SUNDAY_SCHEDULE.classList.remove("active");
  SATURDAY_BUTTON.classList.add("active");
  SATURDAY_SCHEDULE.classList.add("active");
};

const makeSundayScheduleActive = () => {
  SUNDAY_BUTTON.classList.add("active");
  SUNDAY_SCHEDULE.classList.add("active");
  SATURDAY_BUTTON.classList.remove("active");
  SATURDAY_SCHEDULE.classList.remove("active");
};

SUNDAY_BUTTON.onclick = makeSundayScheduleActive;
SATURDAY_BUTTON.onclick = makeSaturdayScheduleActive;

/**
 * Sun movement animation
 */

const sunRef = document.getElementById("Sun");
function getScrollPercent() {
  const documentScroll = document.documentElement.scrollTop;
  const documentHeight = document.documentElement.scrollHeight;
  const windowHeight = window.innerHeight;
  const maxScroll = documentHeight - windowHeight;

  return 100 * documentScroll / maxScroll;
}

window.addEventListener("scroll", () => {
  scrollPercent = getScrollPercent()
  const top = scrollPercent * 0.5;
  sunRef.style.top = top + "vh";
});
