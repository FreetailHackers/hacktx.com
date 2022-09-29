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
    document.getElementById("layer4").style.marginTop = "-85vw";
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

tippy("#opening", {
  content:
    'Join us in GDC 2.216 as we kick off our event with some general information and resources to guide you throughout the weekend. <br/><br/><a target="_blank" href="https://utexas.zoom.us/my/adventure.room">Adventure Room</a>',
  placement: "top",
  allowHTML: true,
  interactive: true,
});
tippy("#breakfast", {
  content:
    "Join us for some breakfast if you are attending in person! We will be in GDC atrium",
  placement: "bottom",
  allowHTML: true,
  interactive: true,
});
