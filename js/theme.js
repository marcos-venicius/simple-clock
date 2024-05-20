const clock = document.getElementById("clock");
const [html] = document.getElementsByTagName("html");
const themeFromLocalStorage = localStorage.getItem("theme");

function toggle() {
  if (html.classList.contains("light")) {
    html.classList.remove("light");
    html.classList.add("dark");

    localStorage.setItem("theme", "dark");
  } else {
    html.classList.remove("dark");
    html.classList.add("light");

    localStorage.setItem("theme", "light");
  }
}

if (themeFromLocalStorage) {
  switch (themeFromLocalStorage) {
    case "dark":
      html.classList.remove("light");
      html.classList.add("dark");
      break;
    case "light":
      html.classList.remove("dark");
      html.classList.add("light");
      break;
    default:
      break;
  }
}

clock.addEventListener("click", toggle.bind(null, null), false);
