// MOBILE MENU TOGGLE
function toggleMobileMenu() {
  const m = document.getElementById("mobileMenu");
  m.style.display = m.style.display === "block" ? "none" : "block";
}


console.log('js file connected')



// SCROLL PROGRESS
const pgbar = document.getElementById("pgbar");
window.addEventListener("scroll", () => {
  const h = document.documentElement;
  pgbar.style.width = (window.scrollY / (h.scrollHeight - h.clientHeight)) * 100 + "%";
}, { passive: true });

// REVEAL ON SCROLL
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal,.reveal-left,.reveal-right").forEach(el => io.observe(el));

// PARALLAX
const parallaxData = [
  { bg: "heroBg", speed: 0.25 }, { bg: "whatBg", speed: 0.2 },
  { bg: "galleryBg", speed: 0.2 }, { bg: "eduBg", speed: 0.2 }, { bg: "contactBg", speed: 0.2 }
];
window.addEventListener("scroll", () => {
  parallaxData.forEach(({ bg, speed }) => {
    const el = document.getElementById(bg);
    if (!el) return;
    const rect = el.closest(".parallax-section").getBoundingClientRect();
    el.style.transform = `translateY(${(rect.top + rect.height / 2 - window.innerHeight / 2) * speed}px)`;
  });
}, { passive: true });

// ACTIVE NAV LINK
const secObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      document.querySelectorAll(".nav-links a").forEach(a => a.classList.remove("active"));
      const a = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
      if (a) a.classList.add("active");
    }
  });
}, { rootMargin: "-40% 0px -40% 0px" });
document.querySelectorAll("section[id]").forEach(s => secObs.observe(s));

// MOBILE MENU TOGGLE
// function toggleMobileMenu() {
//   const m = document.getElementById("mobileMenu");
//   m.style.display = m.style.display === "block" ? "none" : "block";
// }

// CONTACT FORM FEEDBACK
function handleFormSubmit(btn) {
  btn.textContent = "✓ Message Sent!";
  btn.style.background = "#22c55e";
  btn.style.boxShadow = "0 0 32px rgba(34,197,94,.4)";
  setTimeout(() => {
    btn.innerHTML = 'Send Message <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4z"/></svg>';
    btn.style.background = "";
    btn.style.boxShadow = "";
  }, 3000);
}
