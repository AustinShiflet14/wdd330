// --- Hamburger Menu ---
  const navbutton = document.querySelector('#ham-btn');
  const navBar = document.querySelector('#nav-bar');
  const search = document.getElementById("searchInput");
  if (navbutton && navBar) {
    navbutton.addEventListener('click', () => {
      navbutton.classList.toggle('show');
      navBar.classList.toggle('show');
      search.classList.toggle("hidden");
    });
  }

// --- thank you page ---
const timestampElem = document.getElementById("timestamp");
    if (timestampElem) {
      const now = new Date();
      const formatted = now.toLocaleString();
      timestampElem.value = formatted;
    }

function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return Object.fromEntries(params.entries());
  }

  (function displayFormData() {
    const data = getQueryParams();
    for (const key in data) {
      const el = document.getElementById(key);
      if (el) {
        el.textContent = data[key];
      }
    }
  })();

// --- subscribe button ---
const form = document.getElementById("subscribeForm");
const message = document.getElementById("message");

if (form) {
  form.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();

    if (name && email) {
      localStorage.setItem("subscriberName", name);
      localStorage.setItem("subscriberEmail", email);

      message.textContent = `Thank you for subscribing, ${name}!`;
      message.style.color = "#2a7a44";
      message.style.fontWeight = "600";

      form.reset();
    } else {
      message.textContent = "Please enter both your name and email.";
      message.style.color = "red";
    }
  });
}
