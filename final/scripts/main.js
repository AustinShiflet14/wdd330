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