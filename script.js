document.getElementById('year').textContent = new Date().getFullYear();

//Mobile menu 
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

menuBtn.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuBtn.classList.toggle('open', open);
  menuBtn.setAttribute('aria-expanded', open);
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuBtn.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  });
});

//Contact form (opens email app with message filled in)
// ---------- Contact form (Formspree) ----------
(function () {
  const form = document.getElementById('contactForm');
  const statusEl = document.getElementById('formStatus');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const endpoint = form.dataset.endpoint;
    const btn = form.querySelector('button[type="submit"]');

    if (!endpoint || endpoint.includes('YOUR_FORM_ID')) {
      statusEl.textContent = 'Form is not set up yet.';
      statusEl.className = 'form-status error';
      return;
    }

    btn.disabled = true;
    const originalText = btn.textContent;
    btn.textContent = 'Sending...';
    statusEl.textContent = '';
    statusEl.className = 'form-status';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        statusEl.textContent = 'Thanks! Your message has been sent. I will reply soon.';
        statusEl.className = 'form-status success';
        form.reset();
      } else {
        throw new Error('Request failed');
      }
    } catch (err) {
      statusEl.textContent = 'Something went wrong. Please email me directly at thakurshubhamsingh0007@gmail.com';
      statusEl.className = 'form-status error';
    } finally {
      btn.disabled = false;
      btn.textContent = originalText;
    }
  });
})();
//Avatar zoom
const avatar = document.querySelector('.avatar');
if (avatar) {
  avatar.addEventListener('click', () => avatar.classList.toggle('zoomed'));
}
// ---------- Scroll fade-in ----------
const revealTargets = document.querySelectorAll(
  '.section-title, .about-text, .facts, .card, .skill-box, .contact-info, .contact-form'
);

if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealTargets.forEach(el => {
    el.classList.add('reveal');
    // ek row ke cards thoda-thoda ruk ke aayein
    const index = Array.from(el.parentElement.children).indexOf(el);
    el.style.animationDelay = (index % 3) * 0.12 + 's';
    io.observe(el);
  });
}

// ---------- Navbar shadow on scroll ----------
const navBar = document.querySelector('.nav');
const onScroll = () => navBar && navBar.classList.toggle('scrolled', window.scrollY > 10);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();
// ---------- Dark mode toggle + back-to-top + progress bar ----------
(function () {
  const root = document.documentElement;
  const navInner = document.querySelector('.nav-inner');

  // Dark mode button
  if (navInner) {
    const moon = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
    const sun = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';

    const themeBtn = document.createElement('button');
    themeBtn.className = 'theme-btn';
    themeBtn.setAttribute('aria-label', 'Toggle dark mode');

    const refreshIcon = () => {
      const dark = root.getAttribute('data-theme') === 'dark';
      themeBtn.innerHTML = dark ? sun : moon;
    };

    themeBtn.addEventListener('click', () => {
      const dark = root.getAttribute('data-theme') === 'dark';
      if (dark) root.removeAttribute('data-theme');
      else root.setAttribute('data-theme', 'dark');
      try { localStorage.setItem('theme', dark ? 'light' : 'dark'); } catch (e) {}
      refreshIcon();
    });

    navInner.appendChild(themeBtn);
    refreshIcon();
  }

  // Progress bar
  const bar = document.createElement('div');
  bar.className = 'progress-bar';
  document.body.appendChild(bar);

  // Back to top button
  const toTop = document.createElement('button');
  toTop.className = 'to-top';
  toTop.setAttribute('aria-label', 'Back to top');
  toTop.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
  document.body.appendChild(toTop);
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  const update = () => {
    const max = root.scrollHeight - root.clientHeight;
    bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
    toTop.classList.toggle('show', window.scrollY > 400);
  };
  window.addEventListener('scroll', update, { passive: true });
  update();
})();