class Cache {
  constructor(key) {
    this.cache = {};
    this.key = key;
  }

  get() {
    if (this.key in this.cache) return this.cache[this.key];

    return null;
  }

  set(value) {
    this.cache[this.key] = value;
  }
}

const caches = {
  h1: new Cache("h1"),
  h2: new Cache("h2"),
  m1: new Cache("m1"),
  m2: new Cache("m2"),
  s1: new Cache("s1"),
  s2: new Cache("s1"),
};

function next(id, next) {
  const display = document.getElementById(id);
  const center = display.querySelector("#center");
  const bottom = display.querySelector("#bottom");

  bottom.textContent = next;
  bottom.style.visibility = "visible";

  center.style.marginTop = "calc(var(--font-size) * 1.2 * -1)";
  bottom.style.marginBottom = "calc(var(--font-size) * 1.2 * -1)";

  setTimeout(() => {
    center.remove();

    bottom.style = "";
    bottom.id = "center";

    const newBottom = document.createElement("strong");

    newBottom.id = "bottom";
    newBottom.classList.add("number");
    newBottom.textContent = next + 1;
    newBottom.style = "visibility: hidden;";

    display.appendChild(newBottom);
  }, 300);
}

function setTitle(hour, minute) {
  const clock = [];

  if (hour < 10) clock.push("0");

  clock.push(String(hour));

  clock.push(":");

  if (minute < 10) clock.push("0");

  clock.push(String(minute));

  const time = clock.join("");

  document.title = time;
}

function middleware(key, value) {
  if (!(key in caches)) return next(key, value);

  const currentValue = caches[key].get(key);

  if (currentValue !== value) {
    caches[key].set(value);

    return next(key, value);
  }
}

function set(e1, e2, value) {
  if (value < 10) {
    middleware(e1, 0);
    middleware(e2, Number(value));
  } else {
    const [a, b] = String(value).split("");

    middleware(e1, Number(a));
    middleware(e2, Number(b));
  }
}

async function run() {
  while (true) {
    const date = new Date();

    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    const milli = date.getMilliseconds();

    setTitle(hour, minute);

    set("h1", "h2", hour);
    set("m1", "m2", minute);
    set("s1", "s2", second);

    const diff = 1000 - milli;

    await new Promise((r) => setTimeout(r, diff));
  }
}

run();
