const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const sidebar = document.querySelector('.sidebar');
const mobileToggle = document.getElementById('mobile-toggle');

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    sidebar.classList.remove('active');
  });
});

// Update active link on scroll
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').substring(1) === current) {
      link.classList.add('active');
    }
  });
});


mobileToggle.addEventListener('click', () => {
  sidebar.classList.toggle('active');
});

// Close sidebar when clicking outside
document.addEventListener('click', (e) => {
  if (!sidebar.contains(e.target) && !mobileToggle.contains(e.target)) {
    sidebar.classList.remove('active');
  }
});

// Email 
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function (e) {
  e.preventDefault();

  emailjs.sendForm(
    "YOUR_SERVICE_ID",     
    "YOUR_TEMPLATE_ID",    
    this
  ).then(() => {
      alert("✅ Message sent successfully! I will contact you soon.");
      contactForm.reset();
  }).catch((error) => {
      alert("❌ Message failed to send. Try again later.");
      console.error("EmailJS Error:", error);
  });
});


const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements
document.querySelectorAll(
  '.project-card, .skill-card, .stat-card, .info-card, .highlight-item'
).forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  observer.observe(el);
});
