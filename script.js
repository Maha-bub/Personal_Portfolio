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
  const name = document.getElementById("cf-name").value.trim();
  const email = document.getElementById("cf-email").value.trim();
  const subject = document.getElementById("cf-subject").value.trim();
  const message = document.getElementById("cf-message").value.trim();

  if (!name || !email || !message) {
    alert("Naam, Email, ar Message field gulo pura kore dao.");
    return;
  }

  const originalText = btn.innerHTML;
  btn.disabled = true;
  btn.textContent = "Sending...";

  emailjs.send("service_5egf47f", "template_dup3hln", {
    from_name: name,
    from_email: email,
    subject: subject,
    message: message,
    to_email: "mdmahabubulalam0511@gmail.com"
  }).then(() => {
    btn.textContent = "✓ Message Sent!";
    btn.style.background = "#22c55e";
    btn.style.boxShadow = "0 0 32px rgba(34,197,94,.4)";
    document.getElementById("cf-name").value = "";
    document.getElementById("cf-email").value = "";
    document.getElementById("cf-subject").value = "";
    document.getElementById("cf-message").value = "";
  }).catch((err) => {
    console.error("EmailJS error:", err);
    btn.textContent = "✗ Failed! Try Again";
    btn.style.background = "#ef4444";
  }).finally(() => {
    btn.disabled = false;
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = "";
      btn.style.boxShadow = "";
    }, 3000);
  });
}
