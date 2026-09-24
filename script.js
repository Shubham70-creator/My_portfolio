// ============ CONFIG ============
const LINKEDIN_URL ="https://www.linkedin.com/in/shubham-singh-789880294/"; // TODO: replace with your real LinkedIn URL
document.getElementById('linkedinLink').href = LINKEDIN_URL;
document.getElementById('year').textContent = new Date().getFullYear();

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ============ MOBILE MENU ============
const menuBtn = document.getElementById('menuBtn');
const tabs = document.getElementById('tabs');

menuBtn.addEventListener('click', () => {
  const isOpen = tabs.classList.toggle('open');
  menuBtn.classList.toggle('open', isOpen);
  menuBtn.setAttribute('aria-expanded', isOpen);
});

tabs.querySelectorAll('.tab').forEach(link => {
  link.addEventListener('click', () => {
    tabs.classList.remove('open');
    menuBtn.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  });
});

// ============ TYPING EFFECT (hero role) ============
const roles = ["\"AI/ML Enthusiast\"", "\"Developer\"", "\"Problem Solver\"", "\"CS Undergraduate\""];
const typingEl = document.getElementById('typingRole');
let roleIndex = 0, charIndex = 0, deleting = false;

function typeLoop(){
  if (reduceMotion){
    typingEl.textContent = roles[0];
    return;
  }
  const current = roles[roleIndex];
  if (!deleting){
    charIndex++;
    typingEl.textContent = current.slice(0, charIndex);
    if (charIndex === current.length){
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    charIndex--;
    typingEl.textContent = current.slice(0, charIndex);
    if (charIndex === 0){
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeLoop, deleting ? 40 : 75);
}
typeLoop();

// ============ SCROLL SPY (active tab) ============
const sections = document.querySelectorAll('.section, .hero');
const tabLinks = document.querySelectorAll('.tab');

const spyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      const id = entry.target.id;
      tabLinks.forEach(t => t.classList.toggle('active', t.getAttribute('href') === `#${id}`));
    }
  });
}, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

sections.forEach(s => spyObserver.observe(s));

// ============ SCROLL REVEAL ============
const revealObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.classList.add('in-view');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.section').forEach(s => revealObserver.observe(s));

// ============ CONTACT FORM ============
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message){
    status.textContent = "// please fill in every field";
    status.style.color = "#f7768e";
    return;
  }

  // Opens the user's email client pre-filled with the message.
  // Swap this block for a real backend/Formspree endpoint if you want in-page submission.
  const subject = encodeURIComponent(`Portfolio contact from ${name}`);
  const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
  window.location.href = `mailto:thakurshubhamsingh0007@gmail.com?subject=${subject}&body=${body}`;

  status.textContent = "// opening your email client…";
  status.style.color = "#73daca";
  form.reset();
});