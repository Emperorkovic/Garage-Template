// ═══════════════════════════════════════════════════════
// PREMIER AUTO CENTRE — MAIN JS
// Intentional Group Ltd · intentionalgroup.com
// ═══════════════════════════════════════════════════════

// ── HEADER SCROLL ──
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
});

// ── HAMBURGER MENU ──
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileNav.classList.toggle('open');
});

// Close mobile nav on link click
document.querySelectorAll('.mobile-nav a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
  });
});

// ── CONTACT FORM WITH EMAILJS ──
// TO ACTIVATE: Replace YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, YOUR_PUBLIC_KEY
// Sign up free at emailjs.com and add your credentials below

const quickForm = document.getElementById('quickForm');
quickForm?.addEventListener('submit', async function(e) {
  e.preventDefault();
  const btn = this.querySelector('button[type="submit"]');
  const success = document.getElementById('formSuccess');
  const originalText = btn.textContent;

  btn.textContent = 'Sending...';
  btn.disabled = true;

  // ── OPTION 1: EmailJS (recommended — free autoresponder)
  // Uncomment and add your EmailJS credentials:
  /*
  try {
    await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
      from_name: this.querySelector('[name="name"]').value,
      from_phone: this.querySelector('[name="phone"]').value,
      vehicle: this.querySelector('[name="vehicle"]').value,
      service: this.querySelector('[name="service"]').value,
      message: this.querySelector('[name="message"]').value,
    }, 'YOUR_PUBLIC_KEY');
    success.style.display = 'block';
    this.reset();
    btn.textContent = 'Sent! ✓';
  } catch (err) {
    btn.textContent = originalText;
    btn.disabled = false;
    alert('Something went wrong. Please call us directly.');
  }
  */

  // ── OPTION 2: Formspree (backup — replace URL)
  try {
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      body: new FormData(this),
      headers: { 'Accept': 'application/json' }
    });
    if (response.ok) {
      success.style.display = 'block';
      this.reset();
      btn.textContent = 'Sent! ✓';
    } else {
      throw new Error('Failed');
    }
  } catch {
    btn.textContent = originalText;
    btn.disabled = false;
    alert('Something went wrong. Please call us directly.');
  }
});

// ── SCROLL ANIMATIONS ──
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Animate service cards, testimonials etc
document.querySelectorAll('.service-card, .testimonial-card, .why-item, .gallery-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// Add visible class styles via JS
const style = document.createElement('style');
style.textContent = `.visible { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(style);

// ── ACTIVE NAV LINK ──
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
  const linkPage = link.getAttribute('href');
  if (linkPage === currentPage) {
    link.classList.add('active');
  } else {
    link.classList.remove('active');
  }
});

// ── SMOOTH SCROLL FOR ANCHORS ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
