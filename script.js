const btn = document.getElementById("themeSwitch");

btn.addEventListener("click", () => {
    document.body.classList.toggle("darkmode");

    if (document.body.classList.contains("darkmode")) {
        btn.textContent = "Switch to Light Mode";
        localStorage.setItem("theme", "dark");
    } else {
        btn.textContent = "Switch to Dark Mode";
        localStorage.setItem("theme", "light");
    }
});

window.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("darkmode");
        btn.textContent = "Switch to Light Mode";
    }
});