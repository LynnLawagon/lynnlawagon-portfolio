const btn = document.getElementById("themeSwitch");

function setTheme(isDark) {
    document.body.classList.toggle("darkmode", isDark);
    btn.setAttribute("aria-pressed", String(isDark));
    btn.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
}

btn.addEventListener("click", () => {
    setTheme(!document.body.classList.contains("darkmode"));
});

window.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(savedTheme ? savedTheme === "dark" : prefersDark);
});

// Highlight the active nav link based on scroll position
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".navbar nav a[href^='#']");

function highlightNav() {
    let current = "";
    sections.forEach((section) => {
        const top = section.offsetTop - 120;
        if (window.scrollY >= top) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.style.color = "";
        if (link.getAttribute("href") === `#${current}`) {
            link.style.color = "var(--primary)";
        }
    });
}

window.addEventListener("scroll", highlightNav);
highlightNav();

// Contact form — submit via fetch so the person stays on the page
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const submitBtn = contactForm.querySelector("button[type='submit']");
        const originalLabel = submitBtn.innerHTML;

        submitBtn.disabled = true;
        submitBtn.innerHTML = "Sending…";
        formStatus.textContent = "";
        formStatus.className = "form-status";

        try {
            const response = await fetch(contactForm.action, {
                method: "POST",
                body: new FormData(contactForm),
                headers: { Accept: "application/json" },
            });

            if (response.ok) {
                formStatus.textContent = "Thanks for reaching out — your message has been sent.";
                formStatus.classList.add("form-status-success");
                contactForm.reset();
            } else {
                formStatus.textContent = "Something went wrong. Please try again or email me directly.";
                formStatus.classList.add("form-status-error");
            }
        } catch (err) {
            formStatus.textContent = "Something went wrong. Please try again or email me directly.";
            formStatus.classList.add("form-status-error");
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalLabel;
        }
    });
}