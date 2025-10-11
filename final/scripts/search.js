const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

// Allow Enter key
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") searchBtn.click();
});

searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (!query) return;

  // Redirect to meals.html with query in URL
  window.location.href = `meals.html?query=${encodeURIComponent(query)}`;
});