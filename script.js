const field = document.getElementById("field");
// const linksSvg = document.getElementById("links");
const modal = document.getElementById("modal");
const closeBtn = document.getElementById("closeBtn");
const nextBtn = document.getElementById("nextBtn");
const letterBody = document.getElementById("letterBody");
const letterTitle = document.getElementById("letterTitle");
const hint = document.getElementById("hint");

// 1) Put your letters here (each envelope = 1 letter)
const letters = [
  { title: "💗", body: "Hi Shy\n\nSomewhere in the vast ocean, I read that letters are one of the best way to express feelings to someone. This would be my first and I know I might be terrible with words but here I am. Stay with me.\nDisclaimer: could be cringe\n\n— Potpot",
     photo: "IMG_0091.JPG" },
  { title: "Letter #2", body: "Utot\n\nI dont think I have ever uttered enough how much I enjoyed this day. It will always be a night that I would always go back to. Now i really do understand how much a single person can make a day so special. I know it was your birthday and I hope it was special to you because I felt special that you chose to spend it with me.", photo: "IMG_7769.jpeg" },

  { title: "Letter #3", body: "BB\n\nU are loving to the very core. Even your dog knows it of course. I love how no matter tired you are you find the time and strength to make an effort to make the people around you feel loved. ", photo: "IMG_0036.jpeg" },
  { title: "Letter #4", body: "U\n\nTo the very first person who continously stay with an underserving person like me. You are the most genuine person I have ever met. You radiate wherever you go. And the fact that I get to see that everyday is a priveledge that I regret thinking of leaving. Im sorry that i make u feel otherwise and I hope you know how much I think about you", photo: "IMG_0343.jpeg" },
  { title: "Letter #5", body: "Sorry\n\n those are words that I feel like will show up no matter where we are in time. There will be times that i will fail to make you feel treated the way you deserve. and I am sorry. I make such avoidable mistakes if I just consider my actions better. I will continue to be better. I hope u continue to give me that chance", photo: "IMG_0012.jpeg" },
  { title: "Letter #6", body: "Gym Buddy\n\n Lets GYM!!!! LETS COOOK!! LETS DANCE!! LETS GO EAT!!! LETS MAKE TIKTOKS!!! LETS TRAVEL!!! LETS DO EVERYTHING!!!! as long as its with you I will do anything I swear I wont pussy out lol.", photo: "IMG_0653.jpeg" },
  { title: "Letter #7", body: "KEKEKEKEK\n\n One day i will get your angle perfect so I will be the first person you ask to take a pic.\nRAHHHHH", photo: "IMG_0304.jpeg" },
  { title: "Letter #8", body: "???\n\n I will always massage your feet and whatever. Just thought this was funny ✌", photo: "IMG_0455.jpeg" },
  { title: "Letter #9", body: "FOREVER😬😊\n\n Who would have thought that the person that I would want to spend my life with would be you. You have continued to reassure the thins that I am so uncertain about and I am so grateful for that. I know I have mentioned counteless times about the things that bothers me in my mind when it comes to our relationship. And I thank you for your understanding and your patience. One day I wanna look back at these time with you and just smile and laugh. ", photo: "IMG_7782.jpeg" },
  { title: "Letter #10", body: "Seeing you laugh\nHearing you laugh, it makes me so proud of myself when I know I had something to do with that. I want to see you smile and have a good time everyday. But i also do want to see every emotion of yours and go through them together. ", photo: "IMG_0171.jpeg" },
];

const finalLetter = {
  title: "Letter #10", body: "Shyra\n\n I have never done this before but I hope you like it.\n\n BE MY VALENTINE?\n\n POTPOT", photo: "IMG_0559.jpeg"
};

// Connected behavior:
// - Only the NEXT envelope is clickable (the chain).
// - When you read one, it unlocks the next.
// - When all are read, final envelope fades in.
const ENVELOPE_COUNT = letters.length;
let envEls = [];
let finalEnvEl = null;

let opened = new Set();
let currentOpenId = null;

function rand(min, max){ return Math.random() * (max - min) + min; }
function clamp(val, min, max){ return Math.max(min, Math.min(max, val)); }

function setHint(){
  const total = ENVELOPE_COUNT;
  hint.textContent = `Letters unlocked: ${opened.size}/${total}`;
}

function openLetter(letter, id){
  currentOpenId = id ?? null;
  letterTitle.textContent = letter.title;
  letterBody.textContent = letter.body;

  // Photo page
  if (letter.photo){
    letterPhoto.src = letter.photo;
    letterPhoto.style.display = "block";
    photoFallback.style.display = "none";
  } else {
    letterPhoto.removeAttribute("src");
    letterPhoto.style.display = "none";
    photoFallback.style.display = "flex";
  }

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");

  nextBtn.textContent = (id === "final") ? "Close" : "Continue";
}


function closeLetter(){
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
}

// function getCenter(el){
//   const r = el.getBoundingClientRect();
//   return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
// }

// function drawConnections(){
//   // Clear
//   linksSvg.innerHTML = "";

  // Build the chain order: env-0..env-(n-1), and final if revealed
//   const chain = envEls.filter(Boolean);
//   const points = chain.map(getCenter);

  // Draw lines between consecutive envelopes (always visible, but looks nicer once unlocked)
//   for (let i = 0; i < points.length - 1; i++){
//     const a = points[i], b = points[i+1];
//     const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
//     line.setAttribute("x1", a.x);
//     line.setAttribute("y1", a.y);
//     line.setAttribute("x2", b.x);
//     line.setAttribute("y2", b.y);
//     linksSvg.appendChild(line);
//   }

  // Draw dots at each envelope
//   points.forEach((p, i) => {
//     const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
//     c.setAttribute("cx", p.x);
//     c.setAttribute("cy", p.y);
//     c.setAttribute("r", 4);
//     // Dim dots for locked envelopes
//     const isUnlocked = opened.has(`env-${i}`) || i === opened.size; // current unlock
//     c.style.opacity = isUnlocked ? "1" : ".35";
//     linksSvg.appendChild(c);
//   });

  // If final is revealed, connect last normal to final
//   if (finalEnvEl && finalEnvEl.classList.contains("is-revealed")){
//     const last = getCenter(envEls[envEls.length - 1]);
//     const fin = getCenter(finalEnvEl);

//     const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
//     line.setAttribute("x1", last.x);
//     line.setAttribute("y1", last.y);
//     line.setAttribute("x2", fin.x);
//     line.setAttribute("y2", fin.y);
//     linksSvg.appendChild(line);

//     const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
//     c.setAttribute("cx", fin.x);
//     c.setAttribute("cy", fin.y);
//     c.setAttribute("r", 5);
//     linksSvg.appendChild(c);
//   }
// }

function lockStateUpdate(){
  const nextIndex = opened.size;
  envEls.forEach((el, i) => {
    el.classList.toggle("is-locked", i !== nextIndex);
  });

  opened.forEach(id => {
    const el = document.querySelector(`[data-id="${id}"]`);
    if (el) el.classList.add("is-read");
  });

  if (opened.size === ENVELOPE_COUNT && finalEnvEl){
    finalEnvEl.classList.add("is-revealed");
  }

  setHint();
}


//   setHint();
//   drawConnections();

function createEnvelope({ id, letter, isFinal=false }){
  const env = document.createElement("button");
  env.type = "button";
  env.className = "envelope";
  env.dataset.id = id;
  if (isFinal) env.classList.add("final");

  // random position
  const pad = 30, w = 110, h = 78;
  const x = clamp(rand(0, window.innerWidth - w), pad, window.innerWidth - w - pad);
  const y = clamp(rand(0, window.innerHeight - h), pad, window.innerHeight - h - pad);
  const rot = rand(-22, 22).toFixed(1) + "deg";

  env.style.left = `${x}px`;
  env.style.top = `${y}px`;
  env.style.setProperty("--rot", rot);
  env.style.transform = `rotate(${rot})`;
  env.style.zIndex = Math.floor(rand(1, 30));

  env.innerHTML = `
    <div class="envelope__body">
      <div class="envelope__flap"></div>
      <div class="envelope__bottom"></div>
      <div class="envelope__seal"></div>
    </div>
  `;

  env.addEventListener("click", () => {
    if (isFinal){
      openLetter(letter, "final");
      return;
    }

    // Only allow if it's the current unlocked one
    const nextIndex = opened.size;
    const expectedId = `env-${nextIndex}`;
    if (id !== expectedId) return;

    openLetter(letter, id);
  });

  return env;
}

function scatter(){
  field.querySelectorAll(".envelope").forEach(e => e.remove());
  opened = new Set();
  currentOpenId = null;

  envEls = [];
  for (let i=0; i<ENVELOPE_COUNT; i++){
    const id = `env-${i}`;
    const env = createEnvelope({ id, letter: letters[i], isFinal:false });
    envEls.push(env);
    field.appendChild(env);
  }

  finalEnvEl = createEnvelope({ id:"final", letter: finalLetter, isFinal:true });
  field.appendChild(finalEnvEl);

  lockStateUpdate();
}

// Close controls
closeBtn.addEventListener("click", closeLetter);
modal.addEventListener("click", (e) => {
  if (e.target.matches("[data-close]")) closeLetter();
});
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLetter();
});

// Continue button: marks the currently-open envelope as read and unlocks next
nextBtn.addEventListener("click", () => {
  if (currentOpenId && currentOpenId !== "final"){
    opened.add(currentOpenId);
    lockStateUpdate();
  }
  closeLetter();
});

// Keep lines accurate on resize/scroll
// window.addEventListener("resize", () => {
//   // keep progress, just redraw lines and keep positions (simple)
//   drawConnections();
// });
// window.addEventListener("scroll", drawConnections, { passive:true });

// Go
scatter();

const letterPhoto = document.getElementById("letterPhoto");

