// Smooth scroll for in-page anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const targetId = anchor.getAttribute('href');
    if (!targetId || targetId === '#') return;
    const targetEl = document.querySelector(targetId);
    if (!targetEl) return;
    e.preventDefault();
    targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    closeMobileNav();
  });
});

// Mobile nav toggle
const navToggleBtn = document.querySelector('.nav-toggle');
const navEl = document.querySelector('[data-nav]');
function closeMobileNav() {
  if (!navEl) return;
  navEl.classList.remove('open');
  if (navToggleBtn) navToggleBtn.setAttribute('aria-expanded', 'false');
}
if (navToggleBtn && navEl) {
  navToggleBtn.addEventListener('click', () => {
    const isOpen = navEl.classList.toggle('open');
    navToggleBtn.setAttribute('aria-expanded', String(isOpen));
  });
}

// Active link highlighting on scroll
const sectionIds = ['#home', '#about', '#projects', '#skills', '#contact'];
const links = Array.from(document.querySelectorAll('.nav-link'));
const observers = [];

function setActive(href) {
  links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === href));
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setActive('#' + entry.target.id);
    }
  });
}, { root: null, threshold: 0.6 });

sectionIds.forEach(id => {
  const el = document.querySelector(id);
  if (el) observer.observe(el);
});

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// Simple contact form handler (demo only)
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const status = form.querySelector('.form-status');
    if (status) {
      status.textContent = 'Thanks! Your message has been sent (demo).';
      setTimeout(() => { status.textContent = ''; }, 3500);
    }
    form.reset();
  });
}


