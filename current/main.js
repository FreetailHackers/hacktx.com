import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { RectAreaLightUniformsLib } from "three/addons/lights/RectAreaLightUniformsLib.js";
import { EffectComposer, RenderPass, ThreeMFLoader, UnrealBloomPass } from "three/examples/jsm/Addons.js";
import { estimateBytesUsed } from "three/examples/jsm/utils/BufferGeometryUtils.js";

const noParallax = false;

function lerp(x, y, a) {
  return (1 - a) * x + a * y;
}

function easeInOutSine(t) {
  return -0.5 * (Math.cos(Math.PI * t) - 1);
}

function scalePercent(start, end) {
  // console.log((scrollProgress - start) / (end - start));
  return (scrollProgress - start) / (end - start);
}

// Scene setup
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0b0c10);

const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
var initTanFOV = Math.tan(((Math.PI / 180) * camera.fov) / 2);
var initHeight = window.innerHeight;
let cameraInitPos = 15;
camera.position.setZ(cameraInitPos);

let composer = new EffectComposer(renderer);
let renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);
composer.addPass(new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.4, 0, .75));


let scrollProgress = (document.documentElement.scrollTop || document.body.scrollTop);

//scroll-image becoming transparent on scroll
window.addEventListener('scroll', ()=> {
  let scrollPosition = window.scrollY;
  let offset = scrollPosition-300>0? scrollPosition-300:0;
  let opacity = 1 - (offset /300);
  const element = document.querySelector('.scroll-image');
  element.style.opacity = opacity;

});


// Lights
RectAreaLightUniformsLib.init();
const light1 = new THREE.RectAreaLight(0x66aaff, 15, 4, 4);
const light2 = new THREE.RectAreaLight(0xffff44, 10, 0.5, 5);
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
light1.rotation.x = Math.PI / 2;
light1.position.set(0, -5, 0);
light2.rotation.x = -Math.PI / 2;
light2.position.set(5, 5, 0);
scene.add(light1, light2, ambientLight);

const textureLoader = new THREE.TextureLoader();
const north_star = new THREE.SpriteMaterial({ map: textureLoader.load("assets/img/north_star.png") });
const pointed_star = new THREE.SpriteMaterial({ map: textureLoader.load("assets/img/star.png") });
const stars = [];

for (let i = 0; i < 200; i++) {
  if (Math.random() < 0.5) stars.push(new THREE.Sprite(north_star.clone()));
  else stars.push(new THREE.Sprite(pointed_star.clone()));
  let star = stars[i];
  star.position.z = (Math.random() - 0.5) * 200 - 100;
  star.position.x = (Math.random() - 0.5) * 1.5 * (star.position.z - 18);
  star.position.y = (Math.random() - 0.5) * (star.position.z - 18);
  star.material.rotation = (Math.random()) * 0.5 * Math.PI;

  scene.add(star);
}


let cabinetLastQuat = new THREE.Quaternion();
let facingCameraQuat = new THREE.Quaternion();
facingCameraQuat.setFromAxisAngle(new THREE.Vector3(0, 1, 0), -Math.PI / 2);

const spin = new THREE.Quaternion(0, 1, 0, 0);
// Arcade Cabinet
const loader = new GLTFLoader();
let cabinet;
let hackTX23;
let freetailHackers;
let yearOfAI;

//Buttons
let ButtonHackTX23;
let ButtonFreetailHackers;
let ButtonYearOfAI;
const cabinetScreenObjects = [];
const cabinetButtons = [];

loader.load("assets/Cabinet V2.glb", (glb) => {
  cabinet = glb.scene;
  scene.add(cabinet);
  cabinet.position.y = 1.5;
  cabinet.rotation.z = 0.25;
  cabinet.getWorldQuaternion(cabinetLastQuat);


  if (document.body.offsetWidth > 910) {
    cabinet.position.x = 4;
  }

  loader.load("assets/HackTX-23.glb", (glb) => {
    hackTX23 = glb.scene;
    cabinet.add(hackTX23);
    cabinetScreenObjects.push(hackTX23);
  });
  
  loader.load("assets/Freetail-Hackers.glb", (glb) => {
    freetailHackers = glb.scene;
    cabinet.add(freetailHackers);
    cabinetScreenObjects.push(freetailHackers);
  });
  
  loader.load("assets/Year-of-AI.glb", (glb) => {
    yearOfAI = glb.scene;
    cabinet.add(yearOfAI);
    cabinetScreenObjects.push(yearOfAI);
  });

  loader.load("assets/Button-Hacktx23.glb", (glb) => {
    ButtonHackTX23 = glb.scene;
    // console.log(ButtonHackTX23.uuid);
    cabinet.add(ButtonHackTX23);
    // console.log(ButtonHackTX23.uuid);
    cabinetButtons.push(ButtonHackTX23);
    // console.log(ButtonHackTX23.uuid);
  });

  loader.load("assets/Button-Freetail-Hackers.glb", (glb) => {
    ButtonFreetailHackers = glb.scene;
    cabinet.add(ButtonFreetailHackers);
    cabinetButtons.push(ButtonFreetailHackers);
  });

  loader.load("assets/Button-Year-of-AI.glb", (glb) => {
    ButtonYearOfAI = glb.scene;
    cabinet.add(ButtonYearOfAI);
    cabinetButtons.push(ButtonYearOfAI);
  });

});

// let bigCabinet;
// loader.load("assets/bigCabinet.glb", (glb) => {
//   bigCabinet = glb.scene;
//   scene.add(bigCabinet);
//   bigCabinet.position.y = 10;
//   bigCabinet.rotation.z = 0.25;
//   bigCabinet.getWorldQuaternion(cabinetLastQuat);

//   if (document.body.offsetWidth > 910) {
//     bigCabinet.position.x = 3;
//   }

// });

//mouseraycastshit
const pointer = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

//littlefuck eyeball shit
// // let le = balls[0].getBoundingClientRect();
// // let re = balls[1].getBoundingClientRect();
// // let leX= le.left + le.width / 2;
// // let leY= le.top + le.height / 2;
// // let reX= re.left + re.width / 2;
// // let reY= re.top + re.height / 2;

let balls = document.getElementById("eyes");
let body = document.getElementById("body");
let rect = body.getBoundingClientRect();
let anchorX = rect.left + rect.width / 2;
let anchorY= rect.top + rect.height / 2 - scrollProgress;

function angle(cx, cy, ex, ey){
  const dy = ey - cy;
  const dx = ex - cx;
  const rad = Math.atan2(dy, dx);
  return rad;
}

let targetVely = 0.01;
let vely = targetVely;

var mouseDown = false,
  mouseX = 0,
  mouseY = 0,
  lastY = 0;

var canvas = renderer.domElement;



window.addEventListener("mousemove",
  function (evt) {
    
    const x = evt.clientX;
    const y = evt.clientY;


    const angleRad = angle(x, y, anchorX, anchorY);
    let nx = -Math.cos(angleRad) *5;//SUBJECT TO CHANGE
    
    let ny = -Math.sin(angleRad) *5;//SUBJECT TO CHANGE
    // balls.style.transform = "translateX(" + (nx) + "px) translateY(" + (ny) + "px)";


    

  }, false);

canvas.addEventListener(
  "mousemove",
  function (evt) {

    mouseX = evt.clientX;
    mouseY = evt.clientY;

    

    if (mouseDown) {
      // console.log("drag");
      evt.preventDefault();
      var deltaX = evt.clientX - mouseX,
        deltaY = evt.clientY - mouseY;
  
      vely = lerp(deltaX / 200, vely, 0.5);
  
    }
    

  },
  false,
);

canvas.addEventListener(
  "mousedown",
  function (evt) {
    evt.preventDefault();
    // console.log("mouse down");
    mouseDown = true;
    mouseX = evt.clientX;
    mouseY = evt.clientY;

  },
  false,
);

window.addEventListener(
  "mousedown",
  function (evt) {
    evt.preventDefault();
    mouseDown = true;
    mouseX = evt.clientX;
    mouseY = evt.clientY;

    //button interact shit
    pointer.x = (mouseX / window.innerWidth) * 2 -1;
    pointer.y = -(mouseY/ window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    let intersects = raycaster.intersectObjects(cabinetButtons);
    
    // console.log(cabinet.children);
    if(intersects.length>0){
      cabinetScreenObjects[0].visible =false;
      cabinetScreenObjects[1].visible =false;
      cabinetScreenObjects[2].visible =false;
      // console.log(cabinetButtons[0].uuid);

      for(let i = 0; i < intersects.length; i++){
        // console.log(intersects[i].object.uuid)
      }
      // console.log(intersects[0].object.parent.id + "  " + cabinetButtons[0].id + "  " + ButtonHackTX23.id);
      // console.log(intersects[0].object.parent.uid + "  " + cabinetButtons[0].uuid + "  " + ButtonHackTX23.uuid);
      if(intersects[0].object.parent === ButtonHackTX23){
        hackTX23.visible =true;
      }
      else if(intersects[0].object.parent === ButtonFreetailHackers){
        freetailHackers.visible = true;
      }
      else if(intersects[0].object.parent === ButtonYearOfAI){
        yearOfAI.visible = true;
      }
    }

  },
  false,
);


canvas.addEventListener(
  "mouseup",
  function (evt) {
    evt.preventDefault();
    mouseDown = false;
  },
  false,
);

const scrollScripts = [];

let landingHeight = document.getElementById("landing").offsetHeight;
let aboutHeight = document.getElementById('about').offsetHeight;
let arcadeContainerHeight = document.getElementById('arcade-container').offsetHeight;

scrollScripts.push(
  {
  start: 0,
  end: landingHeight + 100,
  func: function () {
    // console.log("zoom in");
    if (cabinet) {
      vely = lerp(vely, targetVely, 0.02);
      spin.setFromAxisAngle(new THREE.Vector3(0, 1, 0), vely);
      cabinet.applyQuaternion(spin);
      cabinet.getWorldQuaternion(cabinetLastQuat);
    }
    let oldCameraY = camera.position.y;
    camera.position.x = 0;
    camera.position.z = cameraInitPos;
    if (window.innerWidth > 910){
      camera.position.y = lerp(11, 1, scalePercent(this.start, this.end));
    } else {
      camera.position.y = lerp(8, 0, scalePercent(this.start, this.end));
    }
  },
});

let slerpQuat = new THREE.Quaternion();

scrollScripts.push({
  start: landingHeight + 100,
  end: landingHeight + aboutHeight,
  func: function () {
    // console.log("fullscreen");
    let percent = easeInOutSine(scalePercent(this.start, this.end));
    if (cabinet) {
      if(window.innerWidth > 910){
        camera.position.x = lerp(0, 4, percent);
        camera.position.y = lerp(1, 2.75, percent);
        camera.position.z = lerp(cameraInitPos, 3, percent);

        cabinet.position.x = 4;
        cabinet.position.y = 1.5;
        cabinet.position.z = 0;
      } else {
        camera.position.x = 0;
        camera.position.y = lerp(0, 2, percent);
        camera.position.z = lerp(cameraInitPos, 8, percent);

        cabinet.position.x = 0;
        cabinet.position.y = 1.5;
        cabinet.position.z = 0;
      }

      slerpQuat.slerpQuaternions(
        cabinetLastQuat,
        facingCameraQuat,
        scalePercent(this.start, this.end),
      );
      // console.log(scalePercent(this.start, this.end));
      cabinet.setRotationFromQuaternion(slerpQuat.normalize());
      vely = 0;
    }
  },
});

console.log("entier size: " + document.body.offsetHeight);

let exitQuat = new THREE.Quaternion();
const flipQuaternion = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI);

scrollScripts.push({
  start: landingHeight + aboutHeight + 2,
  end: landingHeight + aboutHeight + arcadeContainerHeight,
  func: function () {
    // console.log("zoom out");
    if (cabinet){
      exitQuat.copy(cabinetLastQuat);
      exitQuat.premultiply(flipQuaternion);
      let percent = easeInOutSine(scalePercent(this.start, this.end));
      let linPercent = scalePercent(this.start, this.end);
      if (cabinet) {
        slerpQuat.slerpQuaternions(
          facingCameraQuat,
          exitQuat,
          linPercent * 3,
        );
        cabinet.setRotationFromQuaternion(slerpQuat.normalize());
      }
      let oldCameraY = camera.position.y;

      if(window.innerWidth > 910){
        camera.position.x = lerp(4, 6, linPercent);
        camera.position.y = lerp(2.75, 4.5, linPercent);
        camera.position.z = lerp(3, cameraInitPos, linPercent);
        
        cabinet.position.x = lerp(4, -15, percent);
        cabinet.position.y = lerp(1.5, 20, percent);
        cabinet.position.z = lerp(0, -20, percent);
      }
      else{
        camera.position.x = lerp(0, 6, linPercent);
        camera.position.y = lerp(2, 4.5, linPercent);
        camera.position.z = lerp(8, cameraInitPos, linPercent);
        
        cabinet.position.x = 0;
        cabinet.position.y = lerp(1.5, 20, linPercent);
        cabinet.position.z = lerp(0, -20, percent);
      }
      
    }
  }
});

scrollScripts.push({
  start: landingHeight + aboutHeight + arcadeContainerHeight,
  end: document.body.offsetHeight * 2,
  func: function () {
    camera.position.y = lerp(4.5, -15, scalePercent(this.start, this.end));
    if (cabinet){
      if(window.innerWidth > 910){
        camera.position.x = 6;
        camera.position.z = cameraInitPos;
        
        cabinet.position.z = -20;
        cabinet.position.y = 20;
        cabinet.position.x = 15;
      }
      else{
        camera.position.x = 6;
        camera.position.z = cameraInitPos;
        
        cabinet.position.x = 0;
        cabinet.position.z = 20;
        cabinet.position.y = 20;
      }
    }
  }});


function playScrollAnimations() {
  scrollScripts.forEach((a) => {
    if (scrollProgress >= a.start && scrollProgress < a.end) {
      a.func();
    }
  });
}

//fadeOut == true means fade out, false == fade in
function fadeInOut(element, duration, fadeOut) {
  let opacity = fadeOut ? 1 : 0;

  const interval = 1;
  const gap = interval / duration;
  let fadeEffect;
  function increaseOpacity() {
    opacity += gap;
    element.opacity = opacity;

    if (opacity >= 1) {
      clearInterval(fadeEffect);
    }
  }
  function decreaseOpacity() {
    opacity -= gap;
    element.opacity = opacity;

    if (opacity < 0) {
      clearInterval(fadeEffect);
    }
  }
  if(fadeOut){
    fadeEffect = setInterval(decreaseOpacity, interval);
  }
  else{
    fadeEffect = setInterval(increaseOpacity, interval);
  }
}

function twinkle(i) {
  if (stars[i] && stars[i].isSprite) {
    let sprite = stars[i];
    fadeInOut(sprite.material, 100, true);
    setTimeout(function () {
      fadeInOut(sprite.material, 100, false);
    }, 200)
  }

  setTimeout(function () {
    twinkle(Math.floor(Math.random() * 100));
  }, 200);
}

function animate() {
  // renderer.render(scene, camera);
  composer.render();
  playScrollAnimations();
  requestAnimationFrame(animate);
}

document.body.onscroll = (event) => {
  
  scrollProgress =
    (document.documentElement.scrollTop || document.body.scrollTop);
    if (scrollProgress > landingHeight - 100 && scrollProgress < landingHeight + aboutHeight + arcadeContainerHeight - 100) {
      changeCSS("html", "scrollSnapType", "y mandatory");
      // console.log("MAKE IT SNPA");
    } else {
      changeCSS("html", "scrollSnapType", "none");
      // console.log("MAKE IT HOT SNAP");
    }

    anchorY= rect.top + rect.height / 2 - scrollProgress;
};
let scrollDelta;
onwheel = (event) => {
  scrollDelta = event.deltaY;
}

function changeCSS(typeAndClass, newRule, newValue)
{
    var thisCSS=document.styleSheets[0]
    var ruleSearch=thisCSS.cssRules? thisCSS.cssRules: thisCSS.rules
    for (let i=0; i<ruleSearch.length; i++)
    {
        if(ruleSearch[i].selectorText==typeAndClass)
        {
            var target=ruleSearch[i]
            break;
        }
    }
    target.style[newRule] = newValue;
    // console.log("FOUNDS");
  }

onscrollend = (event) => {

//   console
//   if (scrollDelta > 0) {
//     // Scrolling downwards
    
//     if (scrollProgress >= landingHeight && scrollProgress < landingHeight + aboutHeight / 2) {
//       document.getElementById('about').scrollIntoView({
//         behavior: 'smooth'
//       });
//       // document.getElementById('arcade-container').scrollIntoView();
//     }

//     if (scrollProgress >= landingHeight + aboutHeight / 2 && scrollProgress < landingHeight + aboutHeight + 100) {
//       document.getElementById('arcade-container').scrollIntoView({
//         behavior: 'smooth'
//       });
//     }
//   }
//   else {
//     // Scrolling downwards
//     if (scrollProgress >= landingHeight + aboutHeight / 2 && scrollProgress < landingHeight + aboutHeight) {
//       document.getElementById('about').scrollIntoView({
//         behavior: 'smooth'
//       });
//     } 
//   }
};

// const targetSection = document.querySelector('#arcade-container');
// let isInTargetSection = false;
// let lastScrollTop = 0;

// let isInAfterSection = false;

// // Intersection Observer to detect when the target section is in view
// const observer = new IntersectionObserver((entries) => {
//   entries.forEach(entry => {
//     isInTargetSection = entry.isIntersecting;
//     if (isInTargetSection&&!isInAfterSection) {
//       document.documentElement.style.scrollSnapType = 'y mandatory';
//     } else {
//       document.documentElement.style.scrollSnapType = 'none';
//     }
//   });
// }, { threshold: .1 }); // Adjust threshold as needed

// observer.observe(targetSection);

// const afterSection = document.querySelector('#faq');

// // Intersection Observer to detect when the target section is in view
// const afterObserver = new IntersectionObserver((entries) => {
//   entries.forEach(entry => {
//     isInAfterSection = entry.isIntersecting;
//     if(isInAfterSection){
//       document.documentElement.style.scrollSnapType = 'none';
//     }
//     console.log("after");
//   });
// }, { threshold: .1 }); // Adjust threshold as needed

// observer.observe(targetSection);
// afterObserver.observe(afterSection);

// // Scroll event listener
// window.addEventListener('scroll', () => {
//   const scrollTop = window.scrollY || document.documentElement.scrollTop;
//   const scrollingDown = scrollTop > lastScrollTop;

//   if (isInTargetSection) {
//     if (scrollingDown&&!isInAfterSection) {
//       // Snap to the bottom of the section when scrolling down
//       targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
//     }
//     else {
//       // Allow free scrolling when scrolling up
//       document.documentElement.style.scrollSnapType = 'none';
//     }
//   }

//   lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
// });



animate();

// Twinkle random stars
twinkle(Math.floor(Math.random() * 100));
twinkle(Math.floor(Math.random() * 100));
twinkle(Math.floor(Math.random() * 100));

window.addEventListener("resize", () => {
    anchorX = rect.left + rect.width / 2;
    anchorY= rect.top + rect.height / 2 + scrollProgress;

    //fix canvas and aspect Ratio on resize
    // camera.aspect = window.innerWidth / window.innerHeight;
    // camera.updateProjectionMatrix();
    // renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.render(scene, camera);



  // Change the animation breakpoints as the user resizes their window
  landingHeight = document.getElementById('landing').offsetHeight;
  aboutHeight = document.getElementById('about').offsetHeight;

    scrollScripts[0].start = 0;
    scrollScripts[0].end = landingHeight + 100;
    scrollScripts[1].start = scrollScripts[0].end;
    scrollScripts[1].end = landingHeight + aboutHeight;
    scrollScripts[2].start = scrollScripts[1].end + 2;
    scrollScripts[2].end = landingHeight + aboutHeight + arcadeContainerHeight;

  // Change the camera frustrum as the user resizes their window
  // Change FOV to keep the correct perspective
  if (document.body.offsetWidth > 910) {
    cabinet.position.x = 4;
  } else {
    cabinet.position.x = 0;
  }
  landingHeight = document.getElementById("landing").offsetHeight;
  // console.log(landingHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  renderer.setPixelRatio(2);//makes it not pixelated on resize
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);

  //this fucks shit up, so hopefully not important

  // camera.fov =
  //   (360 / Math.PI) * Math.atan(initTanFOV * (window.innerHeight / initHeight));

});
