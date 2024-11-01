function createPrizeCard(title, desc) {
  return `
      <div class="prize-card">
        <h2>${title}</h2>
        <p class="prize-description">${desc}</p>
      </div>
    `;
}

function populatePrizes() {
  const normalTrack = document.getElementById("normal-tracks");
  const AITrack = document.getElementById("AI-tracks");
  const sponsorTrack = document.getElementById("sponsor-tracks");

  const normalData = [
    {
      t: "BEST OVERALL",
      d: "The best all-round hack, this prize considers design, complexity, and impact to determine the best hackathon prize!",
    },
    {
      t: "BEST NOVICE",
      d: "New to hackathons? We’ve got the track for you! Compete against other first-timers to win a grand prize of your own. This prize also considers design, complexity, and impact.",
    },
    {
      t: "BEST DESIGN",
      d: "The end user experience is one of the most important parts of an app. This prize seeks clean assets, ease-of-use, and sensibly designed projects.",
    },
    {
      t: "BEST ARCADE-THEMED",
      d: "HackTX 2024 is arcade-themed, so this prize will go to those who embrace the aesthetic and the culture of old arcades! Whether you make the next Dance-Dance-Revolution or replicate the old Mortal Kombat, this prize goes to those who truly embody the arcade spirit.",
    },
  ];

  const AIData = [
    {
      t: "BEST LLM HACK",
      d: "We’ve all seen the likes of CoPilot and ChatGPT and their uses - but LLMs are versatile and can be applied to very interesting scenarios. Whether that be on GDB or right in Spotify, this hack commends the best use of an LLM in any application, so get creative!",
    },
    {
      t: "BEST AI HACK",
      d: "The best AI hack! This is an all-round consideration, taking into account the complexity of the model, the application, and the impact.",
    },
    {
      t: "BEST GROUND-UP MODEL",
      d: "We’ve all used pre-trained models and created a good use out of them, but what about actually training a model for your purpose? This award goes to the hackers that train a model from the ground-up that has a great use case and creative parameters.",
    }
  ];

  const sponsorData = [
    {
      t: "Best use of GenAI using InterSystems IRIS Vector Search",
      d: "This award celebrates the most innovative application of Generative AI utilizing InterSystems IRIS Vector Search. Judges will evaluate entries based on the effectiveness and creativity of GenAI integration, the complexity and precision of the vector search solution, and the real-world impact and potential for scaling this technology. For more information, check out <a href='https://developer.intersystems.com/intersystems-genai-challenge-hacktx-2024/'> here </a>!",
    },
    {
      t: "Best Use of Intel AI",
      d: "Unleash your creativity and build cutting-edge AI applications with Intel-optimized software on the latest Intel hardware including Intel Tiber Developer Cloud and AI PC Dev Kits.Tackle real-world challenges using Intel technology in your hackathon project for a chance to win awesome prizes. Join the Best Use of Intel AI track and demonstrate the future of AI innovation.",
    },
  ]

  normalData.forEach((item) => {
    normalTrack.innerHTML += createPrizeCard(item.t, item.d);
  });
  AIData.forEach((item) => {
    AITrack.innerHTML += createPrizeCard(item.t, item.d);
  });
  sponsorData.forEach((item) => {
    sponsorTrack.innerHTML += createPrizeCard(item.t, item.d);
  })
}

populatePrizes();
