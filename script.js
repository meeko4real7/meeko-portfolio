/*=======toggle icon navbar========*/
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");

  // 🔥 Trigger bounce animation
  menuIcon.style.animation = "bounce 0.5s";

  // Reset animation so it can trigger again next time
  setTimeout(() => {
    menuIcon.style.animation = "none";
  }, 500);

  // Existing fade animation for links
  const navLinks = document.querySelectorAll(".navbar a");
  if (navbar.classList.contains("active")) {
    navLinks.forEach((link, i) => {
      link.style.animation = `fadeInSlide 0.4s ease forwards`;
      link.style.animationDelay = `${i * 0.1 + 0.2}s`;
    });
  } else {
    navLinks.forEach(link => {
      link.style.animation = "none";
    });
  }
};


/*======scroll sections active link============*/
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let currentSectionId = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (scrollY >= sectionTop - 60) {
      currentSectionId = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSectionId}`) {
      link.classList.add("active");
    }
  });
  /*================sticky navbar=============*/
  let header = document.querySelector("header");

  header.classList.toggle("sticky", window.scrollY > 100);

  /*================remove toggle icon and nvabar when click navbar link (scroll)=============*/
  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");

});

// scroll review //
ScrollReveal({ 
  reset: true,
  distance: "80px",
  duration: 2000,
  delay: 200 
});

ScrollReveal().reveal(".home-content, .heading", { origin: "top" });
ScrollReveal().reveal(".home-img, .services-container, .skills-list, .portfolio-box, .contact form", { origin: "bottom" });
ScrollReveal().reveal(".home-content h1, .about-img", { origin: "left" });
ScrollReveal().reveal(".home-content p, .about-content", { origin: "right" });

/*================typed js=============*/
const typed = new Typed(".multiple-text", {
  strings: ["Full-Stack Web Developer", "UI|UX Designer", "Creative Problem Solver", "lifelong gamer", "Content Creator", "Graphics Designer"],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true
});

/*================contact form=============*/
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const submitBtn = form.querySelector(".btn");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Disable button + show spinner
    submitBtn.disabled = true;
    submitBtn.innerHTML = `Sending <div class="spinner"></div>`;

    const formData = {
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      subject: form.subject.value,
      message: form.message.value,
    };

    try {
      const response = await fetch("https://contact-backend-y0vp.onrender.com/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
      showToast(result.message || "✅ Message Sent Successfully!");
      form.reset();
    } catch (err) {
      console.error(err);
      showToast("❌ Error sending message. Try again.");
    } finally {
      // Re-enable button after request finishes
      submitBtn.disabled = false;
      submitBtn.innerHTML = `Send Message`;
    }

    function showToast(message) {
      const toast = document.getElementById("toast");
      toast.textContent = message;
      toast.style.opacity = 1;
      toast.style.transform = "translateY(0)";
      toast.style.pointerEvents = "auto";
    
      setTimeout(() => {
        toast.style.opacity = 0;
        toast.style.transform = "translateY(20px)";
        toast.style.pointerEvents = "none";
      }, 3000); // Hide after 3s
    }    
  });
});
