const cls = document.body.classList;
const getSessionTheme = sessionStorage.getItem("theme");
if (getSessionTheme === "dark") {
    cls.toggle("dark-mode", true);
} else if (getSessionTheme === "light") {
    cls.toggle("dark-mode", false);
} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    cls.toggle("dark-mode", true);
}
