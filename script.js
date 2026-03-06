// ================= MOBILE MENU =================

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// ================= SKILL BAR ANIMATION =================

const skillLevels = document.querySelectorAll(".skill-level");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const level = entry.target.getAttribute("data-level");
            entry.target.style.width = level;
        }
    });
}, { threshold: 0.5 });

skillLevels.forEach(skill => {
    observer.observe(skill);
});

// CONTACT FORM - FormSubmit AJAX Version

// const form = document.getElementById("contactForm");

// form.addEventListener("submit", async function (e) {
//     e.preventDefault();

//     const formData = new FormData(form);

//     try {
//         const response = await fetch(form.action, {
//             method: "POST",
//             body: formData,
//             headers: {
//                 'Accept': 'application/json'
//             }
//         });

//         if (response.ok) {
//             alert("✅ Message sent successfully!");
//             form.reset();
//         } else {
//             alert("❗ Something went wrong. Please try again.");
//         }

//     } catch (error) {
//         alert("❗ Network error. Try again later.");
//     }
// });
const form = document.getElementById("contactForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch("http://localhost:5000/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {
            alert("✅ Message sent successfully!");
            form.reset();
        } else {
            alert("❗ Failed to send message.");
        }

    } catch (err) {
        alert("❗ Server error.");
    }
});




const textElement = document.getElementById("typing-text");
const professions = ["Cloud Engineer.", "DevOps Specialist.", "Problem Solver.", "Web Developer."];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const currentWord = professions[wordIndex];
  
  if (isDeleting) {
    textElement.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    textElement.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 50 : 150;

  if (!isDeleting && charIndex === currentWord.length) {
    isDeleting = true;
    typeSpeed = 2000; // Pause at the end of the word
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % professions.length;
    typeSpeed = 500;
  }

  setTimeout(type, typeSpeed);
}

// Start the typing effect
document.addEventListener("DOMContentLoaded", type);
